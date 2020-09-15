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
import { CHARACTERS, LOCATIONS, EPISODES } from '../utils/constants';

type Props = LinkDispatchProps & LinkStateProps;

const Results = (props: Props) => {
  const renderResults = () => {
    switch (props.filter.name) {
      case CHARACTERS:
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
      case LOCATIONS:
        if (!props.locations.results || props.locations.results.length === 0) {
          return false;
        }
        return props.locations.results.map((location, index) => (
          <Card
            key={location.id}
            type={props.filter.name}
            index={index}
            name={location.name}
            dimension={location.dimension}
          />
        ));
      case EPISODES:
        if (!props.episodes.results || props.episodes.results.length === 0) {
          return false;
        }
        return props.episodes.results.map((episode, index) => (
          <Card
            key={episode.id}
            index={index}
            type={props.filter.name}
            name={episode.name}
            episode={episode.episode}
          />
        ));
      default:
        return null;
    }
  };

  const handleInfiniteScroll = async (page: number) => {
    if (props.filter.name === CHARACTERS) {
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

    if (props.filter.name === LOCATIONS) {
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

    if (props.filter.name === EPISODES) {
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

  const loading = () => (
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

  const hasMore = () => {
    switch (props.filter.name) {
      case CHARACTERS:
        return props.chars && props.chars.info && props.chars.info.next !== null
          ? true
          : false;
      case LOCATIONS:
        return props.locations &&
          props.locations.info &&
          props.locations.info.next !== null
          ? true
          : false;
      case EPISODES:
        return props.episodes &&
          props.episodes.info &&
          props.episodes.info.next !== null
          ? true
          : false;
      default:
        return false;
    }
  };

  const getMessage = () => {
    let message;

    switch (props.filter.name) {
      case EPISODES:
        if (props.episodes && props.episodes.term !== '') {
          message = props.episodes.term;
        }
        break;
      case CHARACTERS:
        if (props.chars && props.chars.term !== '') {
          message = props.chars.term;
        }
        break;
      case LOCATIONS:
        if (props.locations && props.locations.term !== '') {
          message = props.locations.term;
        }
        break;
      default:
        break;
    }

    if (message) {
      return `No se encontraron resultados para el termino de búsqueda ${message}.`;
    }

    return 'Bienvenido realiza una búsqueda';
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
          <div className="sm:flex flex-wrap">{renderResults()}</div>
        </InfiniteScroller>
      ) : (
        <div className="text-white mt-4 text-2xl text-center">
          {(props.chars && props.chars.fetching) ||
          (props.locations && props.locations.fetching) ||
          (props.episodes && props.episodes.fetching)
            ? loading()
            : getMessage()}
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
