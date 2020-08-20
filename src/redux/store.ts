import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import charsReducer from './charsDuck';
import locationReducer from './locationDuck';
import episodeReducer from './episodeDuck';
import filterReducer from './filterDuck';
import { AppActions } from '../types/actions';

const rootReducer = combineReducers({
  characters: charsReducer,
  location: locationReducer,
  episodes: episodeReducer,
  filter: filterReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
    )
  );

  return store;
};
