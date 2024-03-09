import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";

function Modal (props) {
  const { type, closeModal, id } = props,
    { t } = useTranslation(),
    channels = useSelector((state) => state.channels.channels);

  const config = {
    add: {
      title: t("add сhannel"),
      button: t("submit"),
      func: (name) =>
        axios.post(
          "/api/v1/channels",
          { name: name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        ),
    },

    rename: {
      title: t("rename сhannel"),
      button: t("submit"),
      func: (name) =>
        axios.patch(
          `/api/v1/channels/${id}`,
          { name: name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        ),
    },

    remove: {
      title: t("remove channel"),
      button: t("remove"),
      func: () =>
        axios.delete(`/api/v1/channels/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }),
    },
  };

  const formikForChannel = useFormik({
    initialValues: {
      channelName: "",
    },
    onSubmit: (values, { resetForm }) => {
      config[type].func(values.channelName);
      closeModal();
      resetForm();
    },
    validationSchema: yup.object().shape({
      channelName: yup
        .string()
        //.min(3, t("min3ChannelName"))
        //.required(t("required"))
        .notOneOf(
          channels.map((el) => el.name),
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
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{config[type].title}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={formikForChannel.handleSubmit}>
              <div>
                {type === "remove" ? (
                  <div>Уверены?</div>
                ) : (
                  <input
                    name="channelName"
                    id="name"
                    className="mb-2 form-control"
                    placeholder="Введите название канала"
                    onChange={formikForChannel.handleChange}
                    value={formikForChannel.values.channelName}
                  />
                )}

                {formikForChannel.errors.channelName && (
                  <div className="text-danger">
                    {formikForChannel.errors.channelName}
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="me-2 btn btn-secondary"
                    onClick={closeModal}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className={
                      type === "remove" ? "btn btn-danger" : "btn btn-primary"
                    }
                  >
                    {config[type].button}
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

export default Modal;
