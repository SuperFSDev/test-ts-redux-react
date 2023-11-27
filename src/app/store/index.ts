import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import { thunk } from '../middleware';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

export default configureStore;
