import * as actions from './actions';
import getLogger from '../lib/logger';

export default (socket, dispatch, userName) => {
  const logger = getLogger('socket');

  socket.on('connect', () => {
    logger('connect');
  });

  socket.on('newMessage', ({ data: { attributes: message } }) => {
    logger(`new message: ${message.text}`);
    if (message.userName === userName) {
      return;
    }

    dispatch(actions.getMessage({ message }));
  });

  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    logger(`new channel: ${channel.name}`);
    dispatch(actions.getChannel({ channel }));
  });

  socket.on('renameChannel', ({ data: { attributes: { id, name } } }) => {
    logger(`rename channel: ${name}`);
    dispatch(actions.getRenamedChannel({ id, name }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    logger(`remove channel: ${id}`);
    dispatch(actions.getRemovedChannel({ id }));
  });
};
