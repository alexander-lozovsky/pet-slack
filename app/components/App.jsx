import React from 'react';
import ChannelsList from '../components/ChannelsList.jsx';
import Chat from '../components/Chat.jsx';

export default props => (
  <div className="wrapper container-fluid h-100">
    <div className="row h-100">
      <div className="w-25 h-100 pt-3 bg-dark">
        <ChannelsList userName = {props.userName}/>
      </div>
      <div className="col pt-3 pb-5 h-100 bg-light">
        <Chat userName = {props.userName} />
      </div>
    </div>
  </div>
);
