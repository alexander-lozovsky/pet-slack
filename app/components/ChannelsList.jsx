import React from 'react';
import { Modal } from 'react-bootstrap';
import cn from 'classnames';
import NewChannelForm from './NewChannelForm.jsx';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId, uiState: { showModal } }) => {
  const props = {
    channels,
    currentChannelId,
    showModal,
  };

  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  }

  handleShowNewChannel = () => {
    this.props.showModalNewChannel();
  }

  switchChannel = id => (e) => {
    e.preventDefault();
    this.props.switchChannel({ id });
  };

  renderModalNew = () =>
    (
      <div className="new-channel-modal static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>New channel</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <NewChannelForm />
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );

  render() {
    const { userName, channels, currentChannelId } = this.props;

    return (
      <div className="channels-list h-100">
        <div className="user-name pl-3 pr-3">
          <p className="h3 text-white">{userName}</p>
        </div>
        <div className="nav flex-column nav-pills mb-3">
          {channels.map(({ id, name }) => {
            const channelClass = cn({
              'nav-link': true,
              'text-white': true,
              active: id === currentChannelId,
            });

            return <a onClick={this.switchChannel(id)} className={channelClass} href="#" key={id}>{`# ${name}`}</a>;
          })}
        </div>
        {this.props.showModal === 'newChannel' && this.renderModalNew()}
        <button onClick={this.handleShowNewChannel}
          type="button" className="show-new-channel-modal-btn btn btn-primary ml-3">new</button>
      </div>
    );
  }
}
