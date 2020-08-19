import axios from 'axios';

// constant types

export const URL = 'https://rickandmortyapi.com/graphql';
export const SEARCH = 'SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export const ADD_SEARCH_ERROR = 'ADD_SEARCH_ERROR';
export const ADD_SEARCH_SUCCESS = 'ADD_SEARCH_SUCCESS';

export const CLEAR = 'CLEAR';

// reducer

interface character {
  id: number;
  name: string;
  type?: string;
  gender?: string;
  image: string;
}

interface CharsState {
  info?: {
    pages: number;
    next: number;
    prev: number;
  };
  results?: character[];
  fetching?: Boolean;
  error?: string;
  term: string;
}

const initialState = {
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

type Action = { type: string; payload?: CharsState };

const charsReducer = (state: CharsState = initialState, action: Action) => {
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
    default:
      return state;
  }
};

export default charsReducer;

// Actions

export const getCharacters = (name: string) => async (dispatch: any) => {
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
    dispatch({ type: SEARCH_ERROR, payload: { error: error.message } });
  }
};

export const clearCharacters = () => {
  return { type: CLEAR };
};

export const addCharacters = (characters: CharsState) => {
  if (characters.error) {
    return { type: ADD_SEARCH_ERROR, payload: { ...characters } };
  } else {
    return {
      type: ADD_SEARCH_SUCCESS,
      payload: { ...characters },
    };
  }
};
