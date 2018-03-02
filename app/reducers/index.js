import { omit, omitBy } from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const createRequestStateReducer = action =>
  handleActions({
    [actions[`${action}Request`]]() {
      return 'requested';
    },
    [actions[`${action}Success`]]() {
      return 'successed';
    },
    [actions[`${action}Failure`]]() {
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
    return omitBy(state, (item => item.channelId === id));
  },
  [actions.getRemovedChannel](state, { payload: { id } }) {
    return omitBy(state, (item => item.channelId === id));
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

const activeModal = handleActions({
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

const uiState = combineReducers({ activeModal });

export default combineReducers({
  messageCreatingState: createRequestStateReducer('addMessage'),
  channelCreatingState: createRequestStateReducer('addChannel'),
  channelRenamingState: createRequestStateReducer('renameChannel'),
  channelRemovingState: createRequestStateReducer('removeChannel'),
  channels,
  messages,
  currentChannelId,
  form: formReducer,
  uiState,
});
