import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { AppActions } from '../types/actions';
import { addCharacters, URL } from '../redux/charsDuck';
import { AppState } from '../redux/store';
import CharacterResults from '../types/CharacterResults';
import Card from './Card';

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const Results = (props: Props) => {
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

    try {
      const response = await axios.post(URL, { query });

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
    <div className="container m-auto pb-8 px-5">
      {characters ? (
        <InfiniteScroller
          pageStart={1}
          initialLoad={false}
          loader={loading()}
          loadMore={handleInfiniteScroll}
          hasMore={
            props.chars.info && props.chars.info.next !== null ? true : false
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
