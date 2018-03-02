import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RenameChannelForm from './RenameChannelForm.jsx';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  const props = {
    currentChannel: channels[currentChannelId],
    channelRenamingState: state.channelRenamingState,
    channelRemovingState: state.channelRemovingState,
    modalShowing: state.uiState.modalShowing,
  };

  return props;
};

@connect(mapStateToProps)
export default class ChannelManage extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  }

  handleShowEditModal = () => {
    this.props.showModalEditChannel();
  }

  handleShowRemoveModal = () => {
    this.props.showModalRemoveChannel();
  }

  handleRemoveChannel = () => {
    this.props.removeChannel(this.props.currentChannel.id);
  }

  renderModalRenameChannel = () => {
    const { channelRenamingState, modalShowing, currentChannel } = this.props;

    return (
      <Modal show={modalShowing === 'editChannel'}
        onHide={this.handleCloseModal} className="rename-channel-modal">
        <Modal.Header>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RenameChannelForm initialValues={{ 'channel-name': currentChannel.name }} />
          {channelRenamingState === 'failed'
            && <div className="alert alert-danger mt-3" role="alert">Connection error</div>}
        </Modal.Body>
      </Modal>
    );
  }

  renderModalRemoveChannel = () => {
    const { modalShowing, currentChannel, channelRemovingState } = this.props;

    return (
      <Modal show={modalShowing === 'removeChannel'}
        onHide={this.handleCloseModal} className="remove-channel-modal">
        <Modal.Header>
          <Modal.Title>{`Remove ${currentChannel.name}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{`Do you really want to remove ${this.props.currentChannel.name}?`}</Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleRemoveChannel}
            className="remove-channel-confirm-btn" bsStyle="danger">Remove</Button>
          <Button onClick={this.handleCloseModal}>Close</Button>
        </Modal.Footer>
          {channelRemovingState === 'failed' &&
            <div className="alert alert-danger mt-3" role="alert">Connection error</div>}
      </Modal>
    );
  }

  render() {
    const { currentChannel } = this.props;
    return (
      <div className='chat-header d-flex mb-3'>
        <h2 className="chat-name mr-3">{`#${currentChannel.name}`}</h2>

        <button onClick={this.handleShowEditModal} type="button"
          className="show-rename-channel-modal-btn btn btn-primary mr-3">edit</button>
        {currentChannel.removable ?
          <button onClick={this.handleShowRemoveModal} type="button"
            className="show-remove-channel-modal-btn btn btn-danger">remove</button> : null}
        {this.renderModalRenameChannel()}
        {this.renderModalRemoveChannel()}
      </div>
    );
  }
}
