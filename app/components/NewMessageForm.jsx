import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ messageCreatingState, currentChannelId }) => {
  const props = { messageCreatingState, currentChannelId };

  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newMessage' })
export default class NewMessageForm extends React.Component {
  addMessage = ({ message }) => {
    const { userName, currentChannelId } = this.props;
    this.props.addMessage(message, userName, currentChannelId);
    this.props.reset();
  }

  render() {
    const { messageCreatingState, channelName, pristine } = this.props;
    const isDisabled = messageCreatingState === 'requested' || pristine;

    return (
      <form className="form-inline" onSubmit={this.props.handleSubmit(this.addMessage)}>
        <div className="form-group w-50 mr-3">
          <Field className="message-input form-control w-100" name="message"
            component="input" type="text" placeholder={`Message to #${channelName}`} />
        </div>
        <button disabled={isDisabled} type="submit" className="message-submit btn btn-primary">Send</button>
      </form>
    );
  }
}
