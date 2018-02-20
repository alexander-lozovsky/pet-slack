import 'js-polyfills/html';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import timeout from 'timeout-then';
import axios from 'axios';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import { SocketIO, Server } from 'mock-socket';
import _ from 'lodash';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import addSocketHandlers from '../app/socket';
import App from '../app/components/App.jsx';
import reducers from '../app/reducers';

Enzyme.configure({ adapter: new Adapter() });

axios.defaults.adapter = httpAdapter;

const getNextId = () => Number(_.uniqueId());

const catchMessage = () => {
  nock('http://localhost')
    .post('/api/v1/channels/1/messages')
    .reply(200, (uri, body) => {
      const data = JSON.parse(body);
      const id = getNextId();
      const attributes = {
        ...data.data.attributes,
        time: '10:00',
        id,
      };

      const response = {
        data: {
          type: 'messages',
          id,
          attributes,
        },
      };

      return response;
    });
};

it('check app', async () => {
  const initState = {
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

  const mockServer = new Server('http://localhost:8080');
  const mockClient = SocketIO('http://localhost:8080');
  addSocketHandlers(mockClient, store.dispatch, 'user1');

  document.body.innerHTML = '<div id="app-container"></div>';
  const wrapper = mount(
    <Provider store={store}>
      <App userName='User1' />
    </Provider>,
    document.getElementById('app-container'),
  );
  expect(wrapper.render()).toMatchSnapshot();

  const messageInput = wrapper.find('.message-input input[type="text"]');
  const messageSubmit = wrapper.find('.message-submit');

  messageInput.simulate('change', { target: { value: 'hey!' } });
  expect(wrapper.render()).toMatchSnapshot();

  catchMessage();
  messageSubmit.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  messageInput.simulate('change', { target: { value: 'how are you?' } });
  catchMessage();
  messageSubmit.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  const newMessageId = getNextId();
  const newMessage = {
    data: {
      type: 'messages',
      id: newMessageId,
      attributes: {
        id: newMessageId,
        userName: 'User2',
        time: '10:02',
        text: 'i\'m fine',
      },
    },
  };
  mockServer.emit('newMessage', newMessage);
  expect(wrapper.render()).toMatchSnapshot();
});
