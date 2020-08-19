import Filter from '../types/Filter';
import { FilterActionTypes, AppActions } from '../types/actions';

// Constants
export const SET_FILTER = 'SET_FILTER';

const initialState: Filter = {
  name: 'characters',
};

// Reducer

const filterReducer = (state = initialState, action: FilterActionTypes) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default filterReducer;

// Actions

export const setFilter = (filter: Filter): AppActions => {
  return { type: SET_FILTER, payload: filter };
};
