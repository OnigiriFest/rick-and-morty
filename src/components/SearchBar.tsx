import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import CharacterResults from '../types/CharacterResults';
import LocationResults from '../types/LocationResults';
import EpisodeResults from '../types/EpisodeResults';
import Filter from '../types/Filter';
import { getCharacters, clearCharacters } from '../redux/charsDuck';
import { getLocations, clearLocations } from '../redux/locationDuck';
import { getEpisodes, clearEpisodes } from '../redux/episodeDuck';
import { AppState } from '../redux/store';
import { AppActions } from '../types/actions';
import usePrevious from '../hooks/usePrevious';
import { CHARACTERS, LOCATIONS, EPISODES } from '../utils/constants';

type Props = LinkStateToProps & LinkDispatchToProps;

const SearchBar = ({
  getCharacters,
  getLocations,
  getEpisodes,
  clearCharacters,
  clearLocations,
  clearEpisodes,
  chars,
  locations,
  episodes,
  filter,
}: Props) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [error, setError] = useState(false);
  const prevDebouncedInput = usePrevious(input);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  useEffect(() => {
    if (prevDebouncedInput !== debouncedInput) {
      clearCharacters();
      clearLocations();
      clearEpisodes();
    }
  }, [
    clearEpisodes,
    clearLocations,
    clearCharacters,
    prevDebouncedInput,
    debouncedInput,
  ]);

  useEffect(() => {
    let searchTerm = debouncedInput.trim();

    let validationString = searchTerm.replace(/[A-Za-z 0-9]/g, '');

    setError(validationString === '' ? false : true);

    if (searchTerm.length < 3) {
      clearCharacters();
      clearLocations();
      clearEpisodes();
      return;
    }

    switch (filter.name) {
      case CHARACTERS:
        getCharacters(searchTerm);
        break;
      case LOCATIONS:
        getLocations(searchTerm);
        break;
      case EPISODES:
        getEpisodes(searchTerm);
        break;
      default:
        break;
    }
  }, [
    debouncedInput,
    filter,
    getCharacters,
    getLocations,
    getEpisodes,
    clearCharacters,
    clearLocations,
    clearEpisodes,
    setError,
  ]);

  const resetInput = () => {
    setInput('');

    setError(false);
    clearCharacters();
    clearLocations();
    clearEpisodes();
  };

  const noRenderButton = () =>
    input === '' &&
    chars &&
    locations &&
    episodes &&
    chars.results &&
    locations.results &&
    episodes.results &&
    chars.results.length === 0 &&
    locations.results.length === 0 &&
    episodes.results.length === 0
      ? true
      : false;

  return (
    <>
      <div className="w-full">
        <div className="flex w-full">
          <div
            className={`self-center h-10 rounded-l-full bg-gray-900 flex ${
              error ? 'bg-red-500' : ''
            }`}>
            <svg
              className="self-center text-gray-400 ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={`h-10 self-center w-full px-2 min-w-0 bg-gray-900 text-white ${
              error ? 'bg-red-500' : ''
            } ${noRenderButton() ? 'rounded-r-full' : ''}`}
          />
          {noRenderButton() ? null : (
            <button
              onClick={resetInput}
              className={`self-center h-10 rounded-r-full bg-gray-900 flex ${
                error ? 'bg-red-500' : ''
              }`}>
              <svg
                className="mr-2 self-center text-gray-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="text-red-500" style={{ minHeight: 0.25 + 'rem' }}>
          {error ? 'escribir solo palabras o numeros' : ' '}
        </div>
      </div>
    </>
  );
};

interface LinkStateToProps {
  chars: CharacterResults;
  locations: LocationResults;
  episodes: EpisodeResults;
  filter: Filter;
}

interface LinkDispatchToProps {
  getCharacters: (name: string) => void;
  getLocations: (name: string) => void;
  getEpisodes: (name: string) => void;
  clearCharacters: () => AppActions;
  clearLocations: () => AppActions;
  clearEpisodes: () => AppActions;
}

const mapStateToProps = (state: AppState): LinkStateToProps => ({
  chars: state.characters,
  locations: state.location,
  episodes: state.episodes,
  filter: state.filter,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  getCharacters: bindActionCreators(getCharacters, dispatch),
  getLocations: bindActionCreators(getLocations, dispatch),
  getEpisodes: bindActionCreators(getEpisodes, dispatch),
  clearCharacters: bindActionCreators(clearCharacters, dispatch),
  clearLocations: bindActionCreators(clearLocations, dispatch),
  clearEpisodes: bindActionCreators(clearEpisodes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
