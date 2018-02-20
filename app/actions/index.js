import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessage = createAction('MESSAGE_ADD');

export const sendMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const sendMessage = (text, userName, channelId) => async (dispatch) => {
  if (!text) {
    return;
  }

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
    dispatch(sendMessageSuccess());
    dispatch(addMessage({ message: response.data.data.attributes }));
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
