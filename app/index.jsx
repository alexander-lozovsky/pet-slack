import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import faker from 'faker/locale/en';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import addSocketHandlers from './socket';
import gon from 'gon'; // eslint-disable-line
import App from './components/App.jsx';
import reducers from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let userName = cookies.get('userName');

if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName);
}

const store = createStore(
  reducers,
  gon,
  composeWithDevTools(applyMiddleware(thunk)),
);
const socket = io();
addSocketHandlers(socket, store.dispatch, userName);

render(
  <Provider store={store}>
    <App userName={userName}/>
  </Provider>,
  document.getElementById('app-container'),
);
