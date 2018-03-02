import { omit } from 'lodash';
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
    return { ...state, [message.id]: message };
  },
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    return { ...state, [message.id]: message };
  },
  [actions.sendRemoveChannelSuccess](state, { payload: { id } }) {
    const filtered = Object.values(state).filter(item => item.channelId !== id);
    return { ...filtered };
  },
  [actions.getRemoveChannel](state, { payload: { id } }) {
    const filtered = Object.values(state).filter(item => item.channelId !== id);
    return { ...filtered };
  },
}, {});

const channels = handleActions({
  [actions.sendNewChannelSuccess](state, { payload: { channel } }) {
    return { ...state, [channel.id]: channel };
  },
  [actions.sendRenameChannelSuccess](state, { payload: { id, name } }) {
    return { ...state, [id]: { ...state[id], name } };
  },
  [actions.sendRemoveChannelSuccess](state, { payload: { id } }) {
    return omit(state, id);
  },
  [actions.getNewChannel](state, { payload: { channel } }) {
    return { ...state, [channel.id]: channel };
  },
  [actions.getRenameChannel](state, { payload: { id, name } }) {
    return { ...state, [id]: { ...state[id], name } };
  },
  [actions.getRemoveChannel](state, { payload: { id } }) {
    return omit(state, id);
  },
}, {});

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
