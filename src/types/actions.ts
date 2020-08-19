import {
  SEARCH,
  SEARCH_ERROR,
  SEARCH_SUCCESS,
  ADD_SEARCH_ERROR,
  ADD_SEARCH_SUCCESS,
  CLEAR,
  clearCharacters,
} from '../redux/charsDuck';
import CharacterResults from './CharacterResults';

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

export type AppActions = CharacterActionTypes;
