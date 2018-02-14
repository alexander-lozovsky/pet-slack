import { connect } from 'react-redux';
import ChannelsList from '../components/ChannelsList.jsx';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const props = {
    channels,
    currentChannelId,
  };

  return props;
};

export default connect(mapStateToProps)(ChannelsList);
