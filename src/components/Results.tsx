import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Card from './Card';
import { AppActions } from '../types/actions';
import CharacterResults from '../types/CharacterResults';
import LocationResults from '../types/LocationResults';
import EpisodeResults from '../types/EpisodeResults';
import Filter from '../types/Filter';
import { AppState } from '../redux/store';
import { addCharacters, URL } from '../redux/charsDuck';
import { addLocations } from '../redux/locationDuck';
import { addEpisodes } from '../redux/episodeDuck';

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const Results = (props: Props) => {
  const renderResults = () => {
    switch (props.filter.name) {
      case 'characters':
        if (!props.chars.results || props.chars.results.length === 0) {
          return false;
        }
        return props.chars.results.map((char, index) => {
          return (
            <Card
              type={props.filter.name}
              key={char.id}
              index={index}
              name={char.name}
              image={char.image}
            />
          );
        });
      case 'locations':
        if (!props.locations.results || props.locations.results.length === 0) {
          return false;
        }
        return props.locations.results.map((location, index) => {
          return (
            <Card
              key={location.id}
              type={props.filter.name}
              index={index}
              name={location.name}
              dimension={location.dimension}
            />
          );
        });
      case 'episodes':
        if (!props.episodes.results || props.episodes.results.length === 0) {
          return false;
        }
        return props.episodes.results.map((episode, index) => {
          return (
            <Card
              key={episode.id}
              index={index}
              type={props.filter.name}
              name={episode.name}
              episode={episode.episode}
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
        props.addCharacters({
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
        props.addLocations({
          error: error.message,
          term: props.locations.term,
        });
      }

      return;
    }

    if (props.filter.name === 'episodes') {
      const query = `
      query {
        ${props.filter.name}(page: ${page}, filter: { name: "${props.episodes.term}" }) {
          info {count pages next prev}
          results { id name episode }
        }
      }
    `;
      try {
        const response = await axios.post(URL, { query });

        props.addEpisodes(response.data.data.episodes);
      } catch (error) {
        props.addEpisodes({
          error: error.message,
          term: props.episodes.term,
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
      case 'episodes':
        return props.episodes.info && props.episodes.info.next !== null
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
          {props.chars.fetching ||
          props.locations.fetching ||
          props.episodes.fetching
            ? loading()
            : props.chars.term === ''
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
  episodes: EpisodeResults;
  filter: Filter;
}

interface LinkDispatchProps {
  addCharacters: (characters: CharacterResults) => void;
  addLocations: (locations: LocationResults) => void;
  addEpisodes: (locations: EpisodeResults) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    chars: state.characters,
    locations: state.location,
    episodes: state.episodes,
    filter: state.filter,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  addCharacters: bindActionCreators(addCharacters, dispatch),
  addLocations: bindActionCreators(addLocations, dispatch),
  addEpisodes: bindActionCreators(addEpisodes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
