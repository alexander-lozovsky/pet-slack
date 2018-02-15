import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import faker from 'faker/locale/en';
import cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import App from './components/App.jsx';
import reducers from './reducers';

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  window.gon,
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
