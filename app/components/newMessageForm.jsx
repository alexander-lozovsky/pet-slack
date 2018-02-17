import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ userName, currentChannelId }) => {
  const props = { userName, currentChannelId };

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
    const seconds = date.getSeconds();
    const time = `${date.getHours()}:${seconds > 9 ? seconds : `0${seconds}`}`;
    const newMessage = {
      userName,
      time,
      text: message,
    };

    this.props.sendMessage(newMessage, currentChannelId);
    this.props.reset();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.props.handleSubmit(this.addMessage)}>
        <div className="form-group w-50 mr-3">
            <Field className="form-control w-100" name="message"
              component="input" type="text" placeholder={`Message to #${this.props.channelName}`} />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(messageForm);
