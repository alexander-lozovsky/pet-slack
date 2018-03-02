import React from 'react';
import { reduxForm, Field } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ channelCreatingState }) => {
  const props = { channelCreatingState };

  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
export default class NewChannelForm extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  }

  addChannel = (state) => {
    this.props.addChannel(state['channel-name']);
  }

  render() {
    const { channelCreatingState, pristine } = this.props;
    const isDisabled = channelCreatingState === 'requested' || pristine;

    return (
      <form onSubmit={this.props.handleSubmit(this.addChannel)}>
        <div className="form-group">
          <Field className="form-control" name="channel-name"
            component="input" type="text" placeholder="Channel name" />
        </div>
        <div className="d-flex justify-content-end">
          <button disabled={isDisabled} type="submit" className="btn btn-success mr-3">Add channel</button>
          <button className="btn btn-secondary" onClick={this.handleCloseModal}>Close</button>
        </div>
      </form>
    );
  }
}
