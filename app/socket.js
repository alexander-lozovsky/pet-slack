import * as actions from './actions';
import getLogger from '../lib/logger';

export default (socket, dispatch, userName) => {
  const logger = getLogger(userName);

  socket.on('connect', () => {
    logger('connect');
  });

  socket.on('newMessage', ({ data: { attributes: message } }) => {
    logger(`sent message: ${message.text}`);
    if (message.userName === userName) {
      return;
    }

    dispatch(actions.getMessage({ message }));
  });

  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    logger(`get new channel: ${channel.name}`);
    dispatch(actions.getNewChannel({ channel }));
  });

  socket.on('renameChannel', ({ data: { attributes: { id, name } } }) => {
    logger(`get rename channel: ${name}`);
    dispatch(actions.getRenameChannel({ id, name }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    logger(`get remove channel: ${id}`);
    dispatch(actions.getRemoveChannel({ id }));
  });
};
