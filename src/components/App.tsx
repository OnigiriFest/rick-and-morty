import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import InfiniteScroller from 'react-infinite-scroller';
import axios from 'axios';

import Navbar from './Navbar';
import Card from './Card';
import { addCharacters, URL } from '../redux/charsDuck';
import CharacterResults from '../types/CharacterResults';
import { AppState } from '../redux/store';
import { AppActions } from '../types/actions';

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const App = (props: Props) => {
  const renderCharacters = () => {
    if (!props.chars.results || props.chars.results.length === 0) {
      return false;
    }
    return props.chars.results.map((char) => {
      return <Card key={char.id} name={char.name} image={char.image} />;
    });
  };

  const handleInfiniteScroll = async (page: number) => {
    const query = `
      query {
        characters(page: ${page}, filter: { name: "${props.chars.term}" }) {
          info {count pages next prev}
          results { id name image }
        }
      }
    `;

    console.log('entre');

    try {
      const response = await axios.post(URL, { query });

      console.log('entre');

      props.addCharacters(response.data.data.characters);
    } catch (error) {
      addCharacters({
        error: error.message,
        term: props.chars.term,
      });
    }
  };

  const loading = () => {
    return (
      <div key="0" className="w-full flex justify-center my-4">
        <div className={'lds-spinner'}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  let characters = renderCharacters();

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container m-auto pb-8 px-5">
          {characters ? (
            <InfiniteScroller
              pageStart={1}
              initialLoad={false}
              loader={loading()}
              loadMore={handleInfiniteScroll}
              hasMore={
                props.chars.info && props.chars.info.next !== null
                  ? true
                  : false
              }>
              <div>{renderCharacters()}</div>
            </InfiniteScroller>
          ) : (
            <div className="text-white mt-4 text-2xl text-center">
              {props.chars.term === ''
                ? `Bienvenido realiza una búsqueda`
                : `No se encontraron resultados para el termino de búsqueda "${props.chars.term}".`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface LinkStateProps {
  chars: CharacterResults;
}

interface LinkDispatchProps {
  addCharacters: (characters: CharacterResults) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    chars: state.characters,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  addCharacters: bindActionCreators(addCharacters, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
