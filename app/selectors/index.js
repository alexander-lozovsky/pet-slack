import { createSelector } from 'reselect';

const getChannels = state => state.channels;

const getMessages = state => state.messages;

const getCurrentChannelId = state => state.currentChannelId;

export const messagesSelector = createSelector(
  getMessages,
  messages => Object.values(messages),
);

export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);

export const currentMessagesSelector = createSelector(
  messagesSelector,
  getCurrentChannelId,
  (messages, currentChannelId) =>
    messages.filter(({ channelId }) => channelId === currentChannelId),
);
