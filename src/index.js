import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { initializeApp } from "firebase/app";

import weightWatcherReducer from './store/reducers/weighWatcherReducer';

import App from './App';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  weightWatcher: weightWatcherReducer,
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ))
;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "weightwatcher-8bad9.firebaseapp.com",
  databaseURL: "https://weightwatcher-8bad9-default-rtdb.firebaseio.com",
  projectId: "weightwatcher-8bad9",
  storageBucket: "weightwatcher-8bad9.appspot.com",
  messagingSenderId: "1002137492330",
  appId: "1:1002137492330:web:43743b24be6278e371e313",
  measurementId: "G-S2WYCSX3PQ"
};

initializeApp(firebaseConfig);

const app = (
  <Provider store={store}>
      <App/>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
