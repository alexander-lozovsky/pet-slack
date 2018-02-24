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

  // socket.on('newChannel', ({ data: { attributes: channel } }) => {
  //   dispatch(actions.getNewChannel({ channel }));
  // });

  // socket.on('renameChannel', ({ data: { attributes: channel } }) => {
  //   dispatch(actions.getRenameChannel({ channel }));
  // });

  // socket.on('removeChannel', ({ data: { attributes: channel } }) => {
  //   dispatch(actions.getRemoveChannel({ channel }));
  // });
};
