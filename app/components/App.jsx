import React from 'react';
import ChannelsList from '../components/ChannelsList.jsx';
import Chat from '../components/Chat.jsx';

export default () => (
  <div className="wrapper container-fluid h-100">
    <div className="row h-100">
      <div className="w-25 h-100">
        <ChannelsList />
      </div>
      <div className="col pt-5 pb-5 h-100">
        <Chat />
      </div>
    </div>
  </div>
);
