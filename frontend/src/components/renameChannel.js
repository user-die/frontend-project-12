import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
const socket = io();

const RenameChannel = (props) => {
  const { t } = useTranslation();

  const formikForRenameChannel = useFormik({
    initialValues: {
      channelName: document
        .getElementById(props.id)
        .textContent.replace("#", ""),
    },
    onSubmit: (values, { resetForm }) => {
      socket.emit("renameChannel", { id: props.id, name: values.channelName });
      props.closeRename();
      resetForm();
      props.renamed();
    },
    validationSchema: yup.object().shape({
      channelName: yup
        .string()
        .min(3, t("min3ChannelName"))
        .required(t("required"))
        .notOneOf(
          props.channels.map((el) => el.name),
          t("channel already")
        ),
    }),
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: ` ${props.rename ? "block" : "none"}` }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t("rename сhannel")}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={props.closeRename}
            ></button>
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
                ></input>
                <label className="visually-hidden" htmlFor="name"></label>
                {formikForRenameChannel.errors.channelName && (
                  <div className="text-danger">
                    {formikForRenameChannel.errors.channelName}
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="me-2 btn btn-secondary"
                    onClick={props.closeRename}
                  >
                    {t("cancel")}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {t("submit")}
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
