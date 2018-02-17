const apiPath = '/api/v1';

export default {
  channelsUrl: () => `${apiPath}/channels`,
  channelUrl: id => `${apiPath}/channels/${id}`,
  messagesUrl: channelId => `${apiPath}/channels/${channelId}/messages`,
};
