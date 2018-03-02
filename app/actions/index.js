import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (text, userName, channelId) => async (dispatch) => {
  const date = new Date();
  const minutes = date.getMinutes();
  const time = `${date.getHours()}:${minutes > 9 ? minutes : `0${minutes}`}`;
  const message = {
    userName,
    time,
    text,
  };

  dispatch(addMessageRequest());
  try {
    const response =
      await axios.post(routes.messagesUrl(channelId), { data: { attributes: message } });
    dispatch(addMessageSuccess({ message: response.data.data.attributes }));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const switchChannel = createAction('CHANNEL_SWITCH');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const response = await axios.post(routes.channelsUrl(), { data: { attributes: { name } } });
    dispatch(addChannelSuccess({ channel: response.data.data.attributes }));
  } catch (e) {
    dispatch(addChannelFailure());
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const renameChannel = (id, name) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    await axios.patch(routes.channelUrl(id), { data: { attributes: { name } } });
    dispatch(renameChannelSuccess({ id, name }));
  } catch (e) {
    dispatch(renameChannelFailure());
  }
};

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelUrl(id));
    dispatch(removeChannelSuccess({ id }));
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};

export const getMessage = createAction('MESSAGE_GET');
export const getChannel = createAction('CHANNEL_GET');
export const getRenamedChannel = createAction('RENAMED_CHANNEL_GET');
export const getRemovedChannel = createAction('REMOVED_CHANNEL_GET');

export const showModalNewChannel = createAction('MODAL_NEW_CHANNEL_SHOW');
export const showModalEditChannel = createAction('MODAL_EDIT_CHANNEL_SHOW');
export const showModalRemoveChannel = createAction('MODAL_REMOVE_CHANNEL_SHOW');
export const closeModal = createAction('MODAL_CLOSE');
