import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import * as yup from 'yup';
import filter from 'leo-profanity';

function RenameChannel(props) {
  const { t } = useTranslation();
  const socket = io();
  const {
    id,
    channels,
    rename,
    renamed,
    closeRename,
  } = props;

  const formikForRenameChannel = useFormik({
    initialValues: {
      channelName: document
        .getElementById(id)
        .textContent.replace('#', ''),
    },
    onSubmit: (values, { resetForm }) => {
      const channel = filter.clean(values.channelName);
      socket.emit('renameChannel', { id: id, name: channel });
      closeRename();
      resetForm();
      renamed();
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
      style={{ display: ` ${rename ? 'block' : 'none'}` }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('rename сhannel')}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={closeRename}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={formikForRenameChannel.handleSubmit}>
              <div>
                <input
                  name="channelName"
                  id="name"
                  className="mb-2 form-control"
                  onChange={formikForRenameChannel.handleChange}
                  value={formikForRenameChannel.values.channelName}
                />
                <label className="visually-hidden" htmlFor="name"/>
                {formikForRenameChannel.errors.channelName && (
                  <div className="text-danger">
                    {formikForRenameChannel.errors.channelName}
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="me-2 btn btn-secondary"
                    onClick={closeRename}
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
};

export default RenameChannel;
