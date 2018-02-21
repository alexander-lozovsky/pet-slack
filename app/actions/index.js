import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const getMessage = createAction('MESSAGE_GET');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const switchChannel = createAction('CHANNEL_SWITCH');

export const sendMessage = (text, userName, channelId) => async (dispatch) => {
  const date = new Date();
  const minutes = date.getMinutes();
  const time = `${date.getHours()}:${minutes > 9 ? minutes : `0${minutes}`}`;
  const message = {
    userName,
    time,
    text,
  };

  dispatch(sendMessageRequest());
  try {
    const response =
      await axios.post(routes.messagesUrl(channelId), { data: { attributes: message } });
    dispatch(sendMessageSuccess({ message: response.data.data.attributes }));
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
