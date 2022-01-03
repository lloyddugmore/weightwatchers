import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import weightWatcherReducer from './store/reducers/weighWatcherReducer';

import App from './App';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  weightWatcher: weightWatcherReducer,
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ))
;

const app = (
  <Provider store={store}>
      <App/>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
