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

const catchMessage = (channelId) => {
  nock('http://localhost')
    .post(`/api/v1/channels/${channelId}/messages`)
    .reply(201, (uri, body) => {
      const data = JSON.parse(body);
      const id = getNextId();
      const attributes = {
        ...data.data.attributes,
        time: '10:00',
        id,
        channelId,
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

  catchMessage(1);
  messageSubmit.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  messageInput.simulate('change', { target: { value: 'how are you?' } });
  catchMessage(1);
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
        channelId: 1,
        userName: 'User2',
        time: '10:02',
        text: 'i\'m fine',
      },
    },
  };
  mockServer.emit('newMessage', newMessage);
  expect(wrapper.render()).toMatchSnapshot();

  const randomChannel = wrapper.find('.nav-link').last();
  randomChannel.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  catchMessage(2);
  messageInput.simulate('change', { target: { value: 'hahah!' } });
  messageSubmit.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  const newMessageId2 = getNextId();
  const newMessage2 = {
    data: {
      type: 'messages',
      id: newMessageId2,
      attributes: {
        id: newMessageId2,
        channelId: 2,
        userName: 'User2',
        time: '10:05',
        text: 'eeee',
      },
    },
  };
  mockServer.emit('newMessage', newMessage2);
  expect(wrapper.render()).toMatchSnapshot();

  const showNewChannelModalBtn = wrapper.find('.show-new-channel-modal-btn');
  showNewChannelModalBtn.simulate('click');

  const newChannelModal = wrapper.find('.new-channel-modal');
  const newChannelInput = newChannelModal.find('input[name="channel-name"]');
  const newChannelSubmitBtn = newChannelModal.find('button[type="submit"]');

  newChannelInput.simulate('change', { target: { value: 'job' } });
  nock('http://localhost')
    .post('/api/v1/channels')
    .reply(201, (uri, body) => {
      const { data: { attributes: { name } } } = JSON.parse(body);
      const channel = {
        name,
        removable: true,
        id: 3,
      };

      const response = {
        data: {
          type: 'channels',
          id: channel.id,
          attributes: channel,
        },
      };
      return response;
    });
  newChannelSubmitBtn.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  const showRenameChannelModalBtn = wrapper.find('.show-rename-channel-modal-btn');
  showRenameChannelModalBtn.simulate('click');

  const renameChannelModal = wrapper.find('.rename-channel-modal');
  const renameChannelInput = renameChannelModal.find('input[name="channel-name"]');
  const renameChannelSubmit = renameChannelModal.find('button[type="submit"]');
  expect(renameChannelInput.props().value).toEqual('job');

  renameChannelInput.simulate('change', { target: { value: 'work' } });
  nock('http://localhost')
    .patch('/api/v1/channels/3')
    .reply(204);
  renameChannelSubmit.simulate('submit');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();

  const showRemoveChannelModalBtn = wrapper.find('.show-remove-channel-modal-btn');
  showRemoveChannelModalBtn.simulate('click');

  const removeChannelConfirmBtn = wrapper.find('button.remove-channel-confirm-btn');
  nock('http://localhost')
    .delete('/api/v1/channels/3')
    .reply(204);
  removeChannelConfirmBtn.simulate('click');
  await timeout(100);
  expect(wrapper.render()).toMatchSnapshot();
});
