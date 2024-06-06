import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DefaultChannel from './DefaultChannel';
import RemovableChannel from './RemovableChannel';

import { channelsSelectors, changeChannel } from '../../slices/channelSlice';

const ChannelBox = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();

  const handleChangeChannel = (id, name) => () => {
    dispatch(changeChannel({ id, name }));
  };

  return (
    <ul
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      id="channels-box"
    >
      {channels.map(({ id, name, removable }) => (
        removable
          ? <RemovableChannel key={id} id={id} name={name} changeChannel={handleChangeChannel} />
          : <DefaultChannel key={id} id={id} name={name} changeChannel={handleChangeChannel} />
      ))}
    </ul>
  );
};

export default ChannelBox;
