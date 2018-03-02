import React from 'react';
import connect from '../connect';
import NewMessageForm from './NewMessageForm.jsx';
import ChannelManage from './ChannelManage.jsx';
import { currentMessagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  const props = {
    currentChannel: channels[currentChannelId],
    messages: currentMessagesSelector(state),
    messageCreatingState: state.messageCreatingState,
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

  renderMessages = () => {
    const { messages } = this.props;

    return messages.map((item, index) => {
      const isRenderHeader =
        index === 0 || item.userName !== messages[index - 1].userName;

      return (
        <div key={item.id} className="message">
          {isRenderHeader && this.renderMessageHeader(item.userName, item.time)}
          <p className="pl-3 pr-3">{item.text}</p>
        </div>
      );
    });
  }

  render() {
    const { userName, currentChannel, messageCreatingState } = this.props;

    return (
      <div className="chat d-flex flex-column justify-content-between h-100">
        <ChannelManage />
        <div className="chat-messages col">
          <div className="card h-100">
            <div className="card-body" ref={(div) => { this.chatWindow = div; }}>
              {this.renderMessages()}
              {messageCreatingState === 'failed' &&
                <div className="alert alert-danger" role="alert">message was not sent</div>}
            </div>
          </div>
        </div>
        <div className="chat-input mt-3">
          <NewMessageForm userName={userName} channelName={currentChannel.name} />
        </div>
      </div>
    );
  }
}
