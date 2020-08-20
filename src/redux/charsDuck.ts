import axios from 'axios';
import { Dispatch } from 'redux';

import CharacterResults from '../types/CharacterResults';
import { AppActions, CharacterActionTypes } from '../types/actions';
import { AppState } from './store';

// constant types

export const URL = 'https://rickandmortyapi.com/graphql';
export const SEARCH = 'SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export const ADD_SEARCH_ERROR = 'ADD_SEARCH_ERROR';
export const ADD_SEARCH_SUCCESS = 'ADD_SEARCH_SUCCESS';

export const FETCH_CHARACTER = 'FETCH_CHARACTER';
export const FETCH_CHARACTER_SUCCESS = 'FETCH_CHARACTER_SUCCESS';
export const FETCH_CHARACTER_ERROR = 'FETCH_CHARACTER_ERROR';

export const CLEAR = 'CLEAR';

// reducer

const initialState: CharacterResults = {
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

const charsReducer = (
  state = initialState,
  action: CharacterActionTypes
): CharacterResults => {
  switch (action.type) {
    case SEARCH_ERROR:
      if (action.payload && action.payload.error) {
        return {
          ...state,
          fetching: false,
          error: action.payload.error,
          results: [],
        };
      }
      return state;
    case SEARCH_SUCCESS:
      if (action.payload) {
        return { ...action.payload, fetching: false };
      }
      return state;
    case SEARCH:
      return { ...state, fetching: true };
    case CLEAR:
      return { ...initialState };
    case ADD_SEARCH_ERROR:
      if (action.payload && action.payload.error) {
        return { ...state, fetching: false, error: action.payload.error };
      }
      return { ...state };
    case ADD_SEARCH_SUCCESS:
      if (state.results && action.payload && action.payload.results) {
        return {
          ...state,
          ...action.payload,
          fetching: false,
          results: [...state.results, ...action.payload.results],
        };
      }
      return { ...state };
    case FETCH_CHARACTER:
      return { ...state, fetching: true };
    case FETCH_CHARACTER_ERROR:
      if (action.payload) {
        return { ...state, fetching: false, error: action.payload.error };
      }
      return { ...state };
    case FETCH_CHARACTER_SUCCESS:
      if (action.payload) {
        return { ...state, fetching: false, ...action.payload };
      }
      return { ...state };
    default:
      return state;
  }
};

export default charsReducer;

// Actions

export const getCharacters = (name: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  const query = `
  query {
    characters(page: 1, filter: { name: "${name}" }) {
      info {count pages next prev}
      results { id name image }
    }
  }
  `;

  try {
    dispatch({ type: SEARCH });

    const response = await axios.post(URL, { query });

    dispatch({
      type: SEARCH_SUCCESS,
      payload: { ...response.data.data.characters, term: name },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { error: error.message, term: name },
    });
  }
};

export const clearCharacters = (): AppActions => {
  return { type: CLEAR };
};

export const addCharacters = (characters: CharacterResults): AppActions => {
  if (characters.error) {
    return { type: ADD_SEARCH_ERROR, payload: { ...characters } };
  } else {
    return {
      type: ADD_SEARCH_SUCCESS,
      payload: characters,
    };
  }
};

export const fetchCharacter = (index: number) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch({ type: FETCH_CHARACTER });

  let characters = { ...getState().characters };

  const query = `
    query {
      character(id: ${
        characters.results![index].id
      }) { id name type gender species image }
    }
  `;

  try {
    const response = await axios.post(URL, { query });

    if (characters.results) {
      characters.results[index] = response.data.data.character;
    }

    dispatch({ type: FETCH_CHARACTER_SUCCESS, payload: { ...characters } });
  } catch (error) {
    dispatch({
      type: FETCH_CHARACTER_ERROR,
      payload: { error: error.message },
    });
  }
};
