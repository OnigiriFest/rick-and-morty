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
import LocationResults from '../types/LocationResults';
import Filter from '../types/Filter';
import { addLocations } from '../redux/locationDuck';

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const Results = (props: Props) => {
  const renderResults = () => {
    switch (props.filter.name) {
      case 'characters':
        if (!props.chars.results || props.chars.results.length === 0) {
          return false;
        }
        return props.chars.results.map((char) => {
          return (
            <Card
              type={props.filter.name}
              key={char.id}
              name={char.name}
              image={char.image}
            />
          );
        });
      case 'locations':
        if (!props.locations.results || props.locations.results.length === 0) {
          return false;
        }
        return props.locations.results.map((location) => {
          return (
            <Card
              key={location.id}
              type={props.filter.name}
              name={location.name}
              dimension={location.dimension}
            />
          );
        });
      default:
        break;
    }
  };

  const handleInfiniteScroll = async (page: number) => {
    if (props.filter.name === 'characters') {
      const query = `
      query {
        ${props.filter.name}(page: ${page}, filter: { name: "${props.chars.term}" }) {
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

      return;
    }

    if (props.filter.name === 'locations') {
      const query = `
      query {
        ${props.filter.name}(page: ${page}, filter: { name: "${props.chars.term}" }) {
          info {count pages next prev}
          results { id name dimension }
        }
      }
    `;
      try {
        const response = await axios.post(URL, { query });

        props.addLocations(response.data.data.locations);
      } catch (error) {
        addLocations({
          error: error.message,
          term: props.chars.term,
        });
      }

      return;
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

  const hasMore = () => {
    switch (props.filter.name) {
      case 'characters':
        return props.chars.info && props.chars.info.next !== null
          ? true
          : false;
      case 'locations':
        return props.locations.info && props.locations.info.next !== null
          ? true
          : false;
      default:
        return false;
    }
  };

  let characters = renderResults();

  return (
    <div className="container m-auto pb-8 px-5">
      {characters ? (
        <InfiniteScroller
          pageStart={1}
          initialLoad={false}
          loader={loading()}
          loadMore={handleInfiniteScroll}
          hasMore={hasMore()}>
          <div>{renderResults()}</div>
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
  locations: LocationResults;
  filter: Filter;
}

interface LinkDispatchProps {
  addCharacters: (characters: CharacterResults) => void;
  addLocations: (locations: LocationResults) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    chars: state.characters,
    locations: state.location,
    filter: state.filter,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  addCharacters: bindActionCreators(addCharacters, dispatch),
  addLocations: bindActionCreators(addLocations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
