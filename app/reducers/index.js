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

const messages = handleActions({
  [actions.getMessage](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    return [...state, message];
  },
}, []);

const channels = handleActions({}, []);
const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: { id } }) {
    return id;
  },
}, 0);

export default combineReducers({
  messageCreatingState,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
