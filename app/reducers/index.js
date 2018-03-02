import { omit } from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageCreatingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const channelCreatingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'successed';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
}, 'none');

const messages = handleActions({
  [actions.getMessage](state, { payload: { message } }) {
    return { ...state, [message.id]: message };
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    return { ...state, [message.id]: message };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const filtered = Object.values(state).filter(item => item.channelId !== id);
    return { ...filtered };
  },
  [actions.getRemovedChannel](state, { payload: { id } }) {
    const filtered = Object.values(state).filter(item => item.channelId !== id);
    return { ...filtered };
  },
}, {});

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    return { ...state, [channel.id]: channel };
  },
  [actions.renameChannelSuccess](state, { payload: { id, name } }) {
    const renamedChannel = { ...state[id], name };

    return { ...state, [id]: renamedChannel };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    return omit(state, id);
  },
  [actions.getChannel](state, { payload: { channel } }) {
    return { ...state, [channel.id]: channel };
  },
  [actions.getRenamedChannel](state, { payload: { id, name } }) {
    const renamedChannel = { ...state[id], name };

    return { ...state, [id]: renamedChannel };
  },
  [actions.getRemovedChannel](state, { payload: { id } }) {
    return omit(state, id);
  },
}, {});

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    return channel.id;
  },
  [actions.removeChannelSuccess]() {
    return 1;
  },
  [actions.getRemovedChannel](state, { payload: { id } }) {
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
  [actions.addChannelSuccess]() {
    return 'none';
  },
  [actions.renameChannelSuccess]() {
    return 'none';
  },
  [actions.removeChannelSuccess]() {
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
