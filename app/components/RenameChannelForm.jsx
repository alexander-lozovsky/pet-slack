import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, channelRenamingState }) => {
  const props = {
    currentChannelId,
    channelRenamingState,
  };

  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannel' })
export default class RenameChannelForm extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  }

  renameChannel = (state) => {
    const { currentChannelId, renameChannel } = this.props;
    renameChannel(currentChannelId, state['channel-name']);
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
          <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Close</button>
        </div>
      </form>
    );
  }
}
