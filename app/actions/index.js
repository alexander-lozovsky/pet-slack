import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const showModalNewChannel = createAction('MODAL_NEW_CHANNEL_SHOW');
export const showModalEditChannel = createAction('MODAL_EDIT_CHANNEL_SHOW');
export const showModalRemoveChannel = createAction('MODAL_REMOVE_CHANNEL_SHOW');
export const closeModal = createAction('MODAL_CLOSE');

export const getMessage = createAction('MESSAGE_GET');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

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

export const switchChannel = createAction('CHANNEL_SWITCH');

export const sendNewChannelRequest = createAction('NEW_CHANNEL_SEND_REQUEST');
export const sendNewChannelSuccess = createAction('NEW_CHANNEL_SEND_SUCCESS');
export const sendNewChannelFailure = createAction('NEW_CHANNEL_SEND_FAILURE');

export const sendNewChannel = name => async (dispatch) => {
  dispatch(sendNewChannelRequest());
  try {
    const response = await axios.post(routes.channelsUrl(), { data: { attributes: { name } } });
    dispatch(sendNewChannelSuccess({ channel: response.data.data.attributes }));
  } catch (e) {
    dispatch(sendNewChannelFailure());
  }
};

export const sendRenameChannelRequest = createAction('RENAME_CHANNEL_SEND_REQUEST');
export const sendRenameChannelSuccess = createAction('RENAME_CHANNEL_SEND_SUCCESS');
export const sendRenameChannelFailure = createAction('RENAME_CHANNEL_SEND_FAILURE');

export const sendRenameChannel = (id, name) => async (dispatch) => {
  dispatch(sendRenameChannelRequest());
  try {
    await axios.patch(routes.channelUrl(id), { data: { attributes: { name } } });
    dispatch(sendRenameChannelSuccess({ id, name }));
  } catch (e) {
    dispatch(sendRenameChannelFailure());
  }
};

export const sendRemoveChannelRequest = createAction('REMOVE_CHANNEL_SEND_REQUEST');
export const sendRemoveChannelSuccess = createAction('REMOVE_CHANNEL_SEND_SUCCESS');
export const sendRemoveChannelFailure = createAction('REMOVE_CHANNEL_SEND_FAILURE');

export const sendRemoveChannel = id => async (dispatch) => {
  dispatch(sendRemoveChannelRequest());
  try {
    await axios.delete(routes.channelUrl(id));
    dispatch(sendRemoveChannelSuccess({ id }));
  } catch (e) {
    dispatch(sendRemoveChannelFailure());
  }
};

export const getNewChannel = createAction('NEW_CHANNEL_GET');
export const getRenameChannel = createAction('RENAME_CHANNEL_GET');
export const getRemoveChannel = createAction('REMOVE_CHANNEL_GET');
