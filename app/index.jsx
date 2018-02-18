import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import faker from 'faker/locale/en';
import cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import App from './components/App.jsx';
import reducers from './reducers';

let userName = cookies.get('userName');

if (!userName) {
  userName = faker.name.findName();
  cookies.set('userName', userName);
}

const store = createStore(
  reducers,
  { userName, ...window.gon },
  composeWithDevTools(applyMiddleware(thunk)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container'),
);
