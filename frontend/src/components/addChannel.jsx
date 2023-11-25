import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import * as yup from 'yup';

export default function AddChannel(props) {
  const { t } = useTranslation();
  const socket = io();
  const {
    created,
    closeAddChannel,
    channels,
    modal,
  } = props;

  const formikForChannel = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values, { resetForm }) => {
      const channel = filter.clean(values.channelName);
      socket.emit('newChannel', { name: channel });
      closeAddChannel();
      resetForm();
      created();
    },
    validationSchema: yup.object().shape({
      channelName: yup
        .string()
        .min(3, t('min3ChannelName'))
        .required(t('required'))
        .notOneOf(
          channels.map((el) => el.name),
          t('channel already'),
        ),
    }),
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: ` ${modal ? 'block' : 'none'}` }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('add сhannel')}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={closeAddChannel}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={formikForChannel.handleSubmit}>
              <div>

                <label htmlFor="name" className="visually-hidden">
                  <input
                    name="channelName"
                    id="name"
                    className="mb-2 form-control"
                    onChange={formikForChannel.handleChange}
                    value={formikForChannel.values.channelName}
                  />
                </label>
                {formikForChannel.errors.channelName && (
                  <div className="text-danger">
                    {formikForChannel.errors.channelName}
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="me-2 btn btn-secondary"
                    onClick={closeAddChannel}
                  >
                    {t('cancel')}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {t('submit')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
