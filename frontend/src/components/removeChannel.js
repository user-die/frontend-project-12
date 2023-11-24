import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
const socket = io();

const RemoveChannel = (props) => {
  const { t } = useTranslation();

  function removeChannel(id) {
    socket.emit("removeChannel", { id: id });
    props.closeRemove();
    props.deleted();
    //setRemove(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: ` ${props.remove ? "block" : "none"}` }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t("remove channel")}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={props.closeRemove}
            ></button>
          </div>
          <div className="modal-body">
            <p className="lead">{t("sure?")}</p>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={props.closeRemove}
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeChannel(props.id)}
              >
                {t("remove")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveChannel;
