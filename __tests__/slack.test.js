import 'js-polyfills/html';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import timeout from 'timeout-then';

import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';

import App from '../app/components/App.jsx';
import reducers from '../app/reducers';

Enzyme.configure({ adapter: new Adapter() });

axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();

const host = 'http://localhost';

it('check app', async () => {
  document.body.innerHTML = '<div id="app-container"></div>';
  const initState = {
    userName: 'user',
    channels: [
      { id: 1, name: 'general', removable: false },
      { id: 2, name: 'random', removable: false },
    ],
    messages: [],
    currentChannelId: 1,
  };
  const store = createStore(
    reducers,
    initState,
    applyMiddleware(thunk),
  );

  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-container'),
  );

  expect(wrapper.render()).toMatchSnapshot();

  const messageInput = wrapper.find('.message-input input[type="text"]');
  const messageSubmit = wrapper.find('.message-submit');

  messageInput.simulate('change', { target: { value: 'hey!' } });
  expect(wrapper.render()).toMatchSnapshot();

  nock(host)
    .post('/api/v1/channels/1/messages')
    .reply(200, (uri, body) => {
      const data = JSON.parse(body);
      const attributes = {
        ...data.data.attributes,
        time: '10:00',
        id: 1,
      };

      const response = {
        data: {
          type: 'messages',
          attributes,
        },
      };

      return response;
    });

  messageSubmit.simulate('submit');
  await timeout(1000);
  expect(wrapper.render()).toMatchSnapshot();
});
