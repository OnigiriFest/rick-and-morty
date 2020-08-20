import axios from 'axios';

import { URL } from './charsDuck';
import EpisodeResults from '../types/EpisodeResults';
import { EpisodeActionType, AppActions } from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from './store';

// Constants

export const SEARCH_EPISODE = 'SEARCH_EPISODE';
export const SEARCH_EPISODE_ERROR = 'SEARCH_EPISODE_ERROR';
export const SEARCH_EPISODE_SUCCESS = 'SEARCH_EPISODE_SUCCESS';

export const ADD_EPISODE_ERROR = 'ADD_EPISODE_ERROR';
export const ADD_EPISODE_SUCCESS = 'ADD_EPISODE_SUCCESS';
export const CLEAR_EPISODE = 'CLEAR_EPISODE';

export const FETCH_EPISODE = 'FETCH_EPISODE';
export const FETCH_EPISODE_SUCCESS = 'FETCH_EPISODE_SUCCESS';
export const FETCH_EPISODE_ERROR = 'FETCH_EPISODE_ERROR';

// Reducer

const initialState: EpisodeResults = {
  info: {
    pages: 0,
    next: 0,
    prev: 0,
  },
  results: [],
  fetching: false,
  error: '',
  term: '',
};

const episodeReducer = (
  state = initialState,
  action: EpisodeActionType
): EpisodeResults => {
  switch (action.type) {
    case SEARCH_EPISODE_ERROR:
      if (action.payload && action.payload.error) {
        return {
          ...state,
          fetching: false,
          error: action.payload.error,
          results: [],
        };
      }
      return state;
    case SEARCH_EPISODE_SUCCESS:
      if (action.payload) {
        return { ...action.payload, fetching: false };
      }
      return state;
    case SEARCH_EPISODE:
      return { ...state, fetching: true };
    case ADD_EPISODE_ERROR:
      if (action.payload && action.payload.error) {
        return { ...state, fetching: false, error: action.payload.error };
      }
      return { ...state };
    case ADD_EPISODE_SUCCESS:
      if (state.results && action.payload && action.payload.results) {
        return {
          ...state,
          ...action.payload,
          fetching: false,
          results: [...state.results, ...action.payload.results],
        };
      }
      return { ...state };
    case CLEAR_EPISODE:
      return { ...initialState };
    case FETCH_EPISODE:
      return { ...state, fetching: true };
    case FETCH_EPISODE_ERROR:
      if (action.payload) {
        return { ...state, fetching: false, error: action.payload.error };
      }
      return { ...state };
    case FETCH_EPISODE_SUCCESS:
      if (action.payload) {
        return { ...state, fetching: false, ...action.payload };
      }
      return { ...state };
    default:
      return state;
  }
};

export default episodeReducer;

// Actions

export const getEpisodes = (name: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  const query = `
  query {
    episodes(page: 1, filter: { name: "${name}" }) {
      info {count pages next prev}
      results { id name episode }
    }
  }
  `;

  try {
    dispatch({ type: SEARCH_EPISODE });

    const response = await axios.post(URL, { query });

    dispatch({
      type: SEARCH_EPISODE_SUCCESS,
      payload: { ...response.data.data.episodes, term: name },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_EPISODE_ERROR,
      payload: { error: error.message, term: name },
    });
  }
};

export const clearEpisodes = (): AppActions => {
  return { type: CLEAR_EPISODE };
};

export const addEpisodes = (episodes: EpisodeResults): AppActions => {
  if (episodes.error) {
    return { type: ADD_EPISODE_ERROR, payload: { ...episodes } };
  } else {
    return {
      type: ADD_EPISODE_SUCCESS,
      payload: episodes,
    };
  }
};

export const fetchEpisode = (index: number) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: FETCH_EPISODE });

  let episodes = { ...getState().episodes };

  const query = `
    query {
      episode(id: ${
        episodes.results![index].id
      }) { id name air_date episode characters {name} }
    }
  `;

  try {
    const response = await axios.post(URL, { query });

    if (episodes.results) {
      episodes.results[index] = response.data.data.episode;
      if (episodes.results[index].characters) {
        episodes.results[index].characters?.splice(
          5,
          episodes.results[index].characters!.length - 1
        );
      }
    }

    dispatch({ type: FETCH_EPISODE_SUCCESS, payload: { ...episodes } });
  } catch (error) {
    dispatch({
      type: FETCH_EPISODE_ERROR,
      payload: { error: error.message },
    });
  }
};
