import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
const socket = io();

const AddChannel = (props) => {
  const { t } = useTranslation();

  const formikForChannel = useFormik({
    initialValues: {
      channelName: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (values.channelName !== "") {
        socket.emit("newChannel", { name: values.channelName });
        setModal(false);
        resetForm();
      }
    },
    validationSchema: yup.object().shape({
      channelName: yup
        .string()
        .min(3, "Минимум 3 символа")
        .required("Введите пароль"),
    }),
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: ` ${modal ? "block" : "none"}` }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t("add сhannel")}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={closeAddChannel}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formikForChannel.handleSubmit}>
              <div>
                <input
                  name="channelName"
                  id="name"
                  className="mb-2 form-control"
                  onChange={formikForChannel.handleChange}
                  value={formikForChannel.values.channelName}
                ></input>
                <label className="visually-hidden" htmlFor="name"></label>
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

export default AddChannel;
