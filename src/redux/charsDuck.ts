import axios from 'axios';

// constant types

export const URL = 'https://rickandmortyapi.com/graphql';
export const SEARCH = 'SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

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
        return { ...action.payload, fetching: true };
      }
      return state;
    case SEARCH:
      return { ...state, fetching: true };
    case CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

export default charsReducer;

// Actions

export const getCharacters = (name: string, page = 1) => async (
  dispatch: any
) => {
  const query = `
  query {
    characters(page: ${page}, filter: { name: "${name}" }) {
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
      payload: { ...response.data.data.characters },
    });
  } catch (error) {
    dispatch({ type: SEARCH_ERROR, payload: { error: error.message } });
  }
};

export const clearCharacters = () => {
  return { type: CLEAR };
};
