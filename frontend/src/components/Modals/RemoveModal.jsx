import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, FormGroup, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import notification from '../Toast/index.js';
import useApi from '../../hooks/useApi';
import { getActiveChannelId } from '../../slices/selectors';

const RemoveModal = ({ isOpen, close }) => {
  const [disabledSumbitBtn, setDisabledSubmitBtn] = useState(false);
  const activeChannelId = useSelector(getActiveChannelId);

  const api = useApi();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabledSubmitBtn(true);

    try {
      await api.removeChannel(activeChannelId);
      notification.successToast(t('toast.channelRemove'));
      close();
    } catch (err) {
      notification.errorNotify(t('errors.network'));
    }
    setDisabledSubmitBtn(false);
  };

  return (
    <Modal centered show={isOpen}>
      <Modal.Header closeButton onHide={close}>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <p className="lead">{t('modals.removeBody')}</p>
          </FormGroup>

          <div className="d-flex justify-content-end">
            <Button
              className="btn-secondary mt-2 me-2"
              type="button"
              onClick={close}
            >
              {t('buttons.channels.back')}
            </Button>
            <Button
              className="btn-danger mt-2"
              type="submit"
              disabled={disabledSumbitBtn}
            >
              {t('buttons.channels.remove')}
            </Button>
          </div>

        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default RemoveModal;
