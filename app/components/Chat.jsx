import React from 'react';
import io from 'socket.io-client';
import connect from '../connect';
import NewMessageForm from './newMessageForm.jsx';


const mapStateToProps = (state) => {
  const { name: channelName } = state.channels.find(item => item.id === state.currentChannelId);
  const props = {
    channelName,
    userName: state.userName,
    messages: state.messages,
    messageCreatingState: state.messageCreatingState,
  };

  return props;
};

@connect(mapStateToProps)
export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();

    this.socket.on('newMessage', ({ data: { attributes: message } }) => {
      if (message.userName === props.userName) {
        return;
      }

      props.addMessage({ message });
    });
  }

  componentDidMount = () => {
    this.setScrollToBottom();
  }

  componentDidUpdate = () => {
    this.setScrollToBottom();
  }

  setScrollToBottom = () => {
    this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  }

  renderMessages = () =>
    this.props.messages.map(item =>
      <div key={item.id} className="message">
        <div className="message-header">
          <span className="message-sender font-weight-bold">{item.userName} </span>
          <span className="message-time">{item.time}</span>
        </div>
        <p className="pl-3 pr-3">{item.text}</p>
      </div>);

  render() {
    const { channelName, messageCreatingState } = this.props;

    return (
      <div className="chat d-flex flex-column justify-content-between h-100">
        <h2 className="chat-name">{`#${channelName}`}</h2>
        <div className="chat-messages col">
          <div className="card h-100">
            <div className="card-body" ref={(div) => { this.chatWindow = div; }}>
              {this.renderMessages()}
              {messageCreatingState === 'failed' ?
                <div className="alert alert-danger" role="alert">message was not sent</div> : ''}
            </div>
          </div>
        </div>
        <div className="chat-input mt-3">
          <NewMessageForm channelName={channelName}/>
        </div>
      </div>
    );
  }
}
