import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from './store';

import App from './containers/AppContainer';

const reducer = combineReducers(reducers);
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("app"));
