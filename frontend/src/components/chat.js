import AddChannel from "./addChannel";
import RenameChannel from "./renameChannel";
import RemoveChannel from "./removeChannel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import uniqueId from "lodash.uniqueid";
import { io } from "socket.io-client";
const socket = io();

// склонение сообщений : 0сообщений, 3 сообщения.
// перевести ошибки
// Кнопка переключения языка
// уведомления при ошибках сервера

const Chat = () => {
  const [messages, setMessages] = useState();
  const [modal, setModal] = useState();
  const [channel, setChannel] = useState({ name: "general", id: 1 });
  const [channels, setChannels] = useState();
  const [rename, setRename] = useState(false);
  const [remove, setRemove] = useState();
  const [id, setId] = useState();

  const { t } = useTranslation();
  const loginData = useContext(MyContext);

  const created = () => toast(t("channel created"));
  const renamed = () => toast(t("channel renamed"));
  const deleted = () => toast(t("channel deleted"));

  useEffect(() => {
    const requestData = async () => {
      const data = await axios
        .get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          setMessages(response.data.messages);
          setChannels(response.data.channels);
        });
    };
    requestData();
  }, []);

  function del(id) {
    setChannels((channels) => channels.filter((el) => el.id !== id));

    setChannel({ name: "general", id: 1 });
  }

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      setMessages((messages) => [...messages, payload]);
    });

    socket.on("newChannel", (payload) => {
      setChannels((channels) => [...channels, payload]);
      setChannel({ name: payload.name, id: payload.id });
    });

    socket.on("removeChannel", (payload) => {
      del(payload.id, channels);
    });

    socket.on("renameChannel", (payload) => {
      setChannels((channels) => {
        const copyChannels = [...channels];
        copyChannels.splice(
          copyChannels.indexOf(
            copyChannels.filter((el) => el.id == payload.id)[0]
          ),
          1,
          payload
        );
        return copyChannels;
      });
    });

    //return () => socket.removeAllListeners();
  }, []);

  const formikForMessage = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (values.message !== "") {
        socket.emit("newMessage", {
          body: values.message,
          channelId: channel.id,
          username: loginData.nickname,
        });
        resetForm();
      }
    },
    validationSchema: yup.object().shape({
      message: yup.string().required(t("enter a message")),
    }),
  });

  function declinationOfMessage(n, text_forms) {
    if (n % 10 == 1 && n !== 11) {
      return `${n} ${text_forms[2]}`;
    } else if (
      (n % 10 == 2 || n % 10 == 3 || n % 10 == 4) &&
      n !== 12 &&
      n !== 13 &&
      n !== 14
    ) {
      return `${n} ${text_forms[1]}`;
    } else {
      return `${n} ${text_forms[0]}`;
    }
  }

  function quite() {
    loginData.setLogin("notLogin");
  }

  function changeChannel(e) {
    setChannel({
      name: e.target.textContent.replace("#", ""),
      id: e.target.id,
    });
  }

  function openAddChannel() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light modal-open";
    setModal(true);
  }

  function closeAddChannel() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light";
    setModal(false);
  }

  function dropMenu(event) {
    if (event.target.nextElementSibling.className === "dropdown-menu") {
      event.target.nextElementSibling.className = "dropdown-menu show";
    } else {
      event.target.nextElementSibling.className = "dropdown-menu";
    }
  }

  function openRename(e) {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light modal-open";
    setRename(true);
    setId(e.target.id);
  }

  function closeRename() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light";
    setRename(false);
  }

  function openRemove(id) {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light modal-open";
    setId(id);
    setRemove(true);
  }

  function closeRemove() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light";
    setRemove(false);
  }

  return (
    <div id="chat" className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Chat Slack
            </a>

            <button className="btn btn-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
              </svg>
            </button>

            <button onClick={quite} type="button" className="btn btn-primary">
              {t("log out")}
            </button>
          </div>
        </nav>
        <ToastContainer />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t("channels")}</b>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={openAddChannel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ul
                id="channels-box"
                className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
              >
                {channels &&
                  channels.map((el) => (
                    <li key={uniqueId()} className="nav-item w-100">
                      <div
                        className="d-flex dropdown btn-group"
                        id={`div ${el.id}`}
                      >
                        <button
                          type="button"
                          id={el.id}
                          className={
                            channel.name === `${el.name}`
                              ? "w-100 rounded-0 text-start btn btn-secondary"
                              : "w-100 rounded-0 text-start btn"
                          }
                          onClick={changeChannel}
                        >
                          <span className="me-1">#</span>
                          {el.name}
                        </button>
                        {el.removable && (
                          <button
                            type="button"
                            id={`react-aria8247902799-${el.id}`}
                            aria-expanded="false"
                            className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
                            onClick={dropMenu}
                          ></button>
                        )}
                        <div
                          x-placement="bottom-start"
                          aria-labelledby={`react-aria8247902799-${el.id}`}
                          className="dropdown-menu"
                          data-popper-reference-hidden="false"
                          data-popper-escaped="false"
                          data-popper-placement="bottom-start"
                          style={{
                            position: "absolute",
                            inset: "0px auto auto 0px",
                            transform: "translate(-8px, 40px)",
                          }}
                        >
                          <a
                            data-rr-ui-dropdown-item
                            className="dropdown-item"
                            role="button"
                            tabIndex="0"
                            id={el.id}
                            href="#"
                            onClick={() => openRemove(el.id)}
                          >
                            {t("remove")}
                          </a>
                          <a
                            data-rr-ui-dropdown-item
                            className="dropdown-item"
                            role="button"
                            tabIndex="0"
                            id={el.id}
                            href="#"
                            onClick={openRename}
                          >
                            {t("rename")}
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">{channel && <b>{channel.name}</b>}</p>
                  {channel && messages && (
                    <span className="text-muted">
                      {declinationOfMessage(
                        messages.filter((el) => el.channelId == channel.id)
                          .length,
                        ["сообщений", "сообщения", "сообщение"]
                      )}
                    </span>
                  )}
                </div>
                <div
                  id="messages-box"
                  className="chat-messages overflow-auto px-5"
                >
                  {messages &&
                    messages
                      .filter((el) => el.channelId == channel.id)
                      .map((message) => (
                        <div key={uniqueId()} className="text-break mb-2">
                          <b>{message.username}</b>: {message.body}
                        </div>
                      ))}
                </div>
                <div className="mt-auto px-5 py-3">
                  <form
                    className="py-1 border rounded-2"
                    onSubmit={formikForMessage.handleSubmit}
                  >
                    <div className="input-group has-validation">
                      <input
                        name="message"
                        aria-label="Новое сообщение"
                        placeholder={t("enter a message")}
                        className="border-0 p-0 ps-2 form-control"
                        value={formikForMessage.values.message}
                        onChange={formikForMessage.handleChange}
                      ></input>
                      <button type="submit" className="btn btn-group-vertical">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                          ></path>
                        </svg>
                        <span className="visually-hidden">{t("submit")}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(modal || rename || remove) && (
        <div className="fade modal-backdrop show"></div>
      )}

      {modal && (
        <AddChannel
          modal={modal}
          created={created}
          channels={channels}
          closeAddChannel={closeAddChannel}
        />
      )}

      {rename && (
        <RenameChannel
          id={id}
          rename={rename}
          renamed={renamed}
          channels={channels}
          closeRename={closeRename}
        />
      )}

      {remove && (
        <RemoveChannel
          id={id}
          remove={remove}
          deleted={deleted}
          channels={channels}
          closeRemove={closeRemove}
        />
      )}
    </div>
  );
};

export default Chat;
