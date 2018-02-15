import { combineReducers } from 'redux';

const userName = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const currentChannelId = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  userName,
  channels,
  messages,
  currentChannelId,
});
