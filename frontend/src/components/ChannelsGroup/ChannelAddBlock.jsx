import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setModalShow } from '../../slices/modalSlice';
import image from '../../assets/button.svg';

const ChannelAddBlock = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = (type) => () => {
    dispatch(setModalShow({ type }));
  };

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('text.channels')}</b>
      <button
        className="p-0 text-primary btn btn-group-vertical"
        type="button"
        onClick={handleAddChannel('adding')}
      >
        <img src={image} alt="Добавить канал" />
        <span className="visually-hidden">{t('buttons.channels.add')}</span>
      </button>
    </div>
  );
};

export default ChannelAddBlock;
