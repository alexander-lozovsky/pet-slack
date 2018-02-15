import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import io from 'socket.io-client';

import faker from 'faker/locale/en';
import cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import App from './components/App.jsx';
import reducers from './reducers';

// const socket = io();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line
const devtoolMiddleware = ext && ext();


let userName = cookies.get('userName');

if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName);
}

const store = createStore(
  reducers,
  { userName, ...window.gon },
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container'),
);
