import React from 'react';
import { reduxForm, Field } from 'redux-form';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ messageCreatingState, currentChannelId }) => {
  const props = { messageCreatingState, currentChannelId };

  return props;
};

@connect(mapStateToProps)
class messageForm extends React.Component {
  addMessage = ({ message }) => {
    if (!message) {
      return;
    }

    const { userName, currentChannelId } = this.props;
    const date = new Date();
    const minutes = date.getMinutes();
    const time = `${date.getHours()}:${minutes > 9 ? minutes : `0${minutes}`}`;
    const newMessage = {
      userName,
      time,
      text: message,
    };

    this.props.sendMessage(newMessage, currentChannelId);
    this.props.reset();
  }

  render() {
    const { messageCreatingState, channelName, handleSubmit } = this.props;
    const submitButtonClasses = cn({
      'message-submit btn btn-primary': true,
      disabled: messageCreatingState === 'requested',
    });

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group w-50 mr-3">
            <Field className="message-input form-control w-100" name="message"
              component="input" type="text" placeholder={`Message to #${channelName}`} />
          </div>
          <button type="submit" className={submitButtonClasses}>Send</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(messageForm);
