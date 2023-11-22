const RenameChannel = (props) => {
  const formikForRenameChannel = useFormik({
    initialValues: {
      channelName: "", //document.getElementById(id).textContent,
    },
    onSubmit: (values, { resetForm }) => {
      if (values.channelName !== "") {
        socket.emit("renameChannel", { id: id, name: values.channelName });
        setRename(false);
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
      style={{ display: ` ${rename ? "block" : "none"}` }}
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
              onClick={closeRename}
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
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="me-2 btn btn-secondary"
                    onClick={closeRename}
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
