import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageCreatingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageSuccess]() {
    return 'successed';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
}, 'none');

const channelCreatingState = handleActions({
  [actions.sendNewChannelRequest]() {
    return 'requested';
  },
  [actions.sendNewChannelSuccess]() {
    return 'successed';
  },
  [actions.sendNewChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.sendRenameChannelRequest]() {
    return 'requested';
  },
  [actions.sendRenameChannelSuccess]() {
    return 'successed';
  },
  [actions.sendRenameChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.sendRemoveChannelRequest]() {
    return 'requested';
  },
  [actions.sendRemoveChannelSuccess]() {
    return 'successed';
  },
  [actions.sendRemoveChannelFailure]() {
    return 'failed';
  },
}, 'none');

const messages = handleActions({
  [actions.getMessage](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.sendRemoveChannelSuccess](state, { payload: { id } }) {
    return state.filter(item => item.channelId !== id);
  },
  [actions.getRemoveChannel](state, { payload: { id } }) {
    return state.filter(item => item.channelId !== id);
  },
}, []);

const channels = handleActions({
  [actions.sendNewChannelSuccess](state, { payload: { channel } }) {
    if (state.find(item => item.id === channel.id)) {
      return state;
    }

    return [...state, channel];
  },
  [actions.sendRenameChannelSuccess](state, { payload: { id, name } }) {
    const editedChannel = state.find(item => item.id === id);
    editedChannel.name = name;
    return [...state];
  },
  [actions.sendRemoveChannelSuccess](state, { payload: { id } }) {
    return state.filter(item => item.id !== id);
  },
  [actions.getNewChannel](state, { payload: { channel } }) {
    if (state.find(item => item.id === channel.id)) {
      return state;
    }

    return [...state, channel];
  },
  [actions.getRenameChannel](state, { payload: { id, name } }) {
    const editedChannel = state.find(item => item.id === id);
    editedChannel.name = name;
    return [...state];
  },
  [actions.getRemoveChannel](state, { payload: { id } }) {
    return state.filter(item => item.id !== id);
  },
}, []);

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.sendNewChannelSuccess](state, { payload: { channel } }) {
    return channel.id;
  },
  [actions.sendRemoveChannelSuccess]() {
    return 1;
  },
  [actions.getRemoveChannel](state, { payload: { id } }) {
    if (state !== id) {
      return state;
    }

    return 1;
  },
}, 0);

const modalShowing = handleActions({
  [actions.showModalNewChannel]() {
    return 'newChannel';
  },
  [actions.showModalEditChannel]() {
    return 'editChannel';
  },
  [actions.showModalRemoveChannel]() {
    return 'removeChannel';
  },
  [actions.closeModal]() {
    return 'none';
  },
  [actions.sendNewChannelSuccess]() {
    return 'none';
  },
  [actions.sendRenameChannelSuccess]() {
    return 'none';
  },
  [actions.sendRemoveChannelSuccess]() {
    return 'none';
  },
}, 'none');

const uiState = combineReducers({ modalShowing });

export default combineReducers({
  messageCreatingState,
  channelCreatingState,
  channelRenamingState,
  channelRemovingState,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
  uiState,
});
