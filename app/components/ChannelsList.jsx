import React from 'react';
import cn from 'classnames';

export default class ChannelsList extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <div className='channels-list'>
        <ul className='list-group'>
          {channels.map(({ id, name }) => {
            const channelClass = cn({
              'list-group-item': true,
              active: id === currentChannelId,
            });

            return <li className={channelClass} key={id}>{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
