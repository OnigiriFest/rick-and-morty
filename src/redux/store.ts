import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import charsReducer from './charsDuck';
import { AppActions } from '../types/actions';

const rootReducer = combineReducers({
  characters: charsReducer,
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
