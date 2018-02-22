import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, channelRenamingState }) => {
  const props = { currentChannelId, channelRenamingState };

  return props;
};

@connect(mapStateToProps)
class RenameChannelForm extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  }

  renameChannel = (state) => {
    const { currentChannelId, sendRenameChannel } = this.props;
    sendRenameChannel(currentChannelId, state['channel-name']);
    this.props.closeModal();
    this.props.reset();
  }

  render() {
    const { name, channelRenamingState, pristine } = this.props;
    const isDisabled = channelRenamingState === 'requested' || pristine;

    return (
      <form onSubmit={this.props.handleSubmit(this.renameChannel)}>
        <div className="form-group">
          <Field value={name} className="form-control" name="channel-name"
            component="input" type="text" placeholder="Channel name" />
        </div>
        <div className="d-flex justify-content-end">
          <button disabled={isDisabled} type="submit" className="btn btn-success mr-3">Confirm</button>
          <button className="btn btn-secondary" onClick={this.handleCloseModal}>Close</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelForm);
