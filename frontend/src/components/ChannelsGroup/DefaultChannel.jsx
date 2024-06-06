import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getActiveChannelId } from '../../slices/selectors';

const DefaultChannel = ({ id, name, changeChannel }) => {
  const activeChannelId = useSelector(getActiveChannelId);
  const isCurrent = activeChannelId === id ? 'secondary' : 'none';

  return (
    <li className="nav-item w-100">
      <Button
        type="button"
        id={id}
        className="w-100 rounded-0 text-start text-truncate"
        variant={isCurrent}
        onClick={changeChannel(id, name)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

export default DefaultChannel;
