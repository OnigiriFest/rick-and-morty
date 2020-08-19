import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroller from 'react-infinite-scroller';
import axios from 'axios';

import Navbar from './Navbar';
import Card from './Card';
import { addCharacters, URL } from '../redux/charsDuck';

const App = (props: any) => {
  const renderCharacters = () => {
    if (!props.chars.results || props.chars.results.length === 0) {
      return false;
    }
    return props.chars.results.map((char: any) => {
      return <Card key={char.id} name={char.name} image={char.image} />;
    });
  };

  const handleInfiniteScroll = async (page: number) => {
    console.log(page);
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
    <>
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container m-auto pb-8 px-5">
          {characters && !characters.fetching ? (
            <InfiniteScroller
              pageStart={1}
              initialLoad={false}
              loader={loading()}
              loadMore={handleInfiniteScroll}
              hasMore={props.chars.info.next !== null ? true : false}>
              <div>{renderCharacters()}</div>
            </InfiniteScroller>
          ) : (
            <div className="text-white mt-4 text-2xl text-center">
              No se encontraron resultados para este termino de búsqueda.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chars: state.characters,
  };
};

export default connect(mapStateToProps, { addCharacters })(App);
