import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessage = createAction('MESSAGE_ADD');

export const sendMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const sendMessage = (message, channelId) => async (dispatch) => {
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
