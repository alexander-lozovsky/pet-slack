import React from 'react';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId, userName }) => {
  const props = {
    userName,
    channels,
    currentChannelId,
  };

  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  render() {
    const { userName, channels, currentChannelId } = this.props;

    return (
      <div className='channels-list h-100'>
        <div className='user-name pl-3 pr-3'>
          <p className="h3 text-white">{userName}</p>
        </div>
        <div className='nav flex-column nav-pills'>
          {channels.map(({ id, name }) => {
            const channelClass = cn({
              'nav-link': true,
              'text-white': true,
              active: id === currentChannelId,
            });

            return <a className={channelClass} href="#" key={id}>{`# ${name}`}</a>;
          })}
        </div>
      </div>
    );
  }
}
