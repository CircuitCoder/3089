import { createStore, applyMiddleware, combineReducers } from 'redux';
import Thunk from 'redux-thunk';
import Logger from 'redux-logger';

import * as reducers from './reducers';

const middlewares = [Thunk];
if (process.env.NODE_ENV === `development`) {
  middlewares.push(Logger);
}

export function buildStore() {
  const root = combineReducers(reducers);
  const applied = applyMiddleware(...middlewares);

  return createStore(root, applied);
}
