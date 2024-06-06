import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setModalShow } from '../../slices/modalSlice';
import { getActiveChannelId } from '../../slices/selectors';

const RemovableChannel = ({ id, name, changeChannel }) => {
  const activeChannelId = useSelector(getActiveChannelId);
  const isCurrent = activeChannelId === id ? 'secondary' : 'none';

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleModalShow = (type) => () => {
    dispatch(setModalShow({ type }));
  };

  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button
        type="button"
        className="w-100 rounded-0 text-start text-truncate"
        onClick={changeChannel(id, name)}
        variant={isCurrent}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        id="dropdown-split-basic"
        split
        variant={isCurrent}
      >
        <span className="visually-hidden">{t('buttons.channels.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleModalShow('removing')}>{t('buttons.channels.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleModalShow('renaming')}>{t('buttons.channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
