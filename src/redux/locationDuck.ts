import axios from 'axios';
import { URL } from './charsDuck';

import LocationResults from '../types/LocationResults';
import { LocationActionTypes, AppActions } from '../types/actions';
import { Dispatch } from 'redux';

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const SEARCH_LOCATION_ERROR = 'SEARCH_LOCATION_ERROR';
export const SEARCH_LOCATION_SUCCESS = 'SEARCH_LOCATION_SUCCESS';

export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';

export const CLEAR_LOCATION = 'CLEAR_LOCATION';

const initialState: LocationResults = {
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

// Reducer

const locationReducer = (state = initialState, action: LocationActionTypes) => {
  switch (action.type) {
    case SEARCH_LOCATION_ERROR:
      if (action.payload && action.payload.error) {
        return {
          ...state,
          fetching: false,
          error: action.payload.error,
          results: [],
        };
      }
      return state;
    case SEARCH_LOCATION_SUCCESS:
      if (action.payload) {
        return { ...action.payload, fetching: false };
      }
      return state;
    case SEARCH_LOCATION:
      return { ...state, fetching: true };
    default:
      return state;
  }
};

// Actions

export const getLocations = (name: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  const query = `
  query {
    location(page: 1, filter: { name: "${name}" }) {
      info {count pages next prev}
      results { id name dimension }
    }
  }
  `;

  try {
    dispatch({ type: SEARCH_LOCATION });

    const response = await axios.post(URL, { query });

    dispatch({
      type: SEARCH_LOCATION_SUCCESS,
      payload: { ...response.data.data.location, term: name },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_LOCATION_ERROR,
      payload: { error: error.message, term: name },
    });
  }
};

export default locationReducer;
