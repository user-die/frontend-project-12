import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DefaultChannel from './channels/DefaultChannel';
import RemovableChannel from './channels/RemovableChannel';

import { channelsSelectors, changeChannel } from '../slices/channelSlice';
import { setModalShow } from '../slices/modalSlice';

import image from '../assets/button.svg';

const ChannelsGroup = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleAddChannel = (type) => () => {
    dispatch(setModalShow({ type }));
  };

  const handleChangeChannel = (id, name) => () => {
    dispatch(changeChannel({ id, name }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('text.channels')}</b>
        <button onClick={handleAddChannel('adding')} type="button" className="p-0 text-primary btn btn-group-vertical">
          <img src={image} alt="Добавить канал" />
          <span className="visually-hidden">{t('buttons.channels.add')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => (
          removable
            ? <RemovableChannel key={id} id={id} name={name} changeChannel={handleChangeChannel} />
            : <DefaultChannel key={id} id={id} name={name} changeChannel={handleChangeChannel} />
        ))}
      </ul>
    </Col>
  );
};

export default ChannelsGroup;
