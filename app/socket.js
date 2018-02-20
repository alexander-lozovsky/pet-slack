import { getMessage } from './actions';
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

    dispatch(getMessage({ message }));
  });
};
