import {
  SEARCH,
  SEARCH_ERROR,
  SEARCH_SUCCESS,
  ADD_SEARCH_ERROR,
  ADD_SEARCH_SUCCESS,
  CLEAR,
  clearCharacters,
} from '../redux/charsDuck';
import {
  SEARCH_LOCATION,
  SEARCH_LOCATION_ERROR,
  SEARCH_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  ADD_LOCATION_SUCCESS,
  CLEAR_LOCATION,
} from '../redux/locationDuck';
import { SET_FILTER } from '../redux/filterDuck';
import CharacterResults from './CharacterResults';
import LocationResults from './LocationResults';
import Filter from './Filter';

// Filter

export interface setFilter {
  type: typeof SET_FILTER;
  payload: Filter;
}

export type FilterActionTypes = setFilter;

// Characters

export interface getCharacters {
  type: typeof SEARCH | typeof SEARCH_ERROR | typeof SEARCH_SUCCESS;
  payload?: CharacterResults;
}

export interface clearCharacters {
  type: typeof CLEAR;
}

export interface addCharacters {
  type: typeof ADD_SEARCH_SUCCESS | typeof ADD_SEARCH_ERROR;
  payload: CharacterResults;
}

export type CharacterActionTypes =
  | getCharacters
  | clearCharacters
  | addCharacters;

// Location

export interface getLocations {
  type:
    | typeof SEARCH_LOCATION
    | typeof SEARCH_LOCATION_ERROR
    | typeof SEARCH_LOCATION_SUCCESS;
  payload?: LocationResults;
}

export type LocationActionTypes = getLocations;

export type AppActions =
  | FilterActionTypes
  | CharacterActionTypes
  | LocationActionTypes;