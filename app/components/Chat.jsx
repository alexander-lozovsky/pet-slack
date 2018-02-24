import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';
import NewMessageForm from './NewMessageForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';

const mapStateToProps = (state) => {
  const currentChannel = state.channels.find(item => item.id === state.currentChannelId);
  const messages = state.messages.filter(item => item.channelId === state.currentChannelId);
  const props = {
    currentChannel,
    messages,
    messageCreatingState: state.messageCreatingState,
    showModal: state.uiState.showModal,
  };

  return props;
};

@connect(mapStateToProps)
export default class Chat extends React.Component {
  componentDidMount() {
    this.setScrollToBottom();
  }

  componentDidUpdate() {
    this.setScrollToBottom();
  }

  setScrollToBottom = () => {
    this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  }

  renderMessageHeader = (userName, time) => (
    <div className="message-header">
      <span className="message-sender font-weight-bold">{userName} </span>
      <span className="message-time">{time}</span>
    </div>
  );

  renderMessages() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return '';
    }

    return messages.map((item, index) => {
      const isRenderHeader =
        index === 0 || item.userName !== messages[index - 1].userName;

      return (
        <div key={item.id} className="message">
          {isRenderHeader ? this.renderMessageHeader(item.userName, item.time) : null}
          <p className="pl-3 pr-3">{item.text}</p>
        </div>
      );
    });
  }

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
    this.props.sendRemoveChannel(this.props.currentChannel.id);
    this.props.closeModal();
  }

  renderModalRenameChannel = () =>
    (
      <div className="rename-channel-modal static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Rename channel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <RenameChannelForm initialValues={{ 'channel-name': this.props.currentChannel.name }} />
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );

  renderModalRemoveChannel = () =>
    (
      <div className="remove-channel-modal static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{`Remove ${this.props.currentChannel.name}`}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{`Do you really want to remove ${this.props.currentChannel.name}?`}</Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleRemoveChannel} className="remove-channel-confirm-btn" bsStyle="danger">Remove</Button>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );

  render() {
    const { userName, currentChannel, messageCreatingState } = this.props;

    return (
      <div className="chat d-flex flex-column justify-content-between h-100">
        <div className='chat-header d-flex mb-3'>
          <h2 className="chat-name mr-3">{`#${currentChannel.name}`}</h2>

          <button onClick={this.handleShowEditModal} type="button"
            className="show-rename-channel-modal-btn btn btn-primary mr-3">edit</button>
          {currentChannel.removable ?
            <button onClick={this.handleShowRemoveModal} type="button"
              className="show-remove-channel-modal-btn btn btn-danger">remove</button> : null}
        </div>
        <div className="chat-messages col">
          <div className="card h-100">
            <div className="card-body" ref={(div) => { this.chatWindow = div; }}>
              {this.renderMessages()}
              {messageCreatingState === 'failed' ?
                <div className="alert alert-danger" role="alert">message was not sent</div> : null}
            </div>
          </div>
        </div>
        <div className="chat-input mt-3">
          <NewMessageForm userName={userName} channelName={currentChannel.name} />
        </div>
        {this.props.showModal === 'editChannel' && this.renderModalRenameChannel()}
        {this.props.showModal === 'removeChannel' && this.renderModalRemoveChannel()}
      </div>
    );
  }
}
