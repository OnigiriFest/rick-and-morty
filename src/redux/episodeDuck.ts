import EpisodeResults from '../types/EpisodeResults';
import { EpisodeActionType } from '../types/actions';

// Constants

export const SEARCH_EPISODE = 'SEARCH_EPISODE';
export const SEARCH_EPISODE_ERROR = 'SEARCH_EPISODE_ERROR';
export const SEARCH_EPISODE_SUCCESS = 'SEARCH_EPISODE_SUCCESS';

export const ADD_EPISODE_ERROR = 'ADD_EPISODE_ERROR';
export const ADD_EPISODE_SUCCESS = 'ADD_EPISODE_SUCCESS';

export const CLEAR_EPISODE = 'CLEAR_EPISODE';

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
    case SEARCH_EPISODE:
    default:
      return state;
  }
};

export default episodeReducer;
