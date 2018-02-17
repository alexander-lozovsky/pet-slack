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
  [actions.addMessage](state, { payload: { message } }) {
    return [...state, message];
  },
}, []);

const userName = handleActions({}, '');
const channels = handleActions({}, []);
const currentChannelId = handleActions({}, 0);

export default combineReducers({
  messageCreatingState,
  userName,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
