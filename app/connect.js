import { connect } from 'react-redux';

export default mapStateToProps => Component => connect(mapStateToProps)(Component);
