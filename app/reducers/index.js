import { combineReducers } from 'redux';

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
  channels,
  messages,
  currentChannelId,
});
