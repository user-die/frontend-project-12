import AddChannel from "./addChannel";
import RenameChannel from "./renameChannel";
import RemoveChannel from "./removeChannel";

import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import uniqueId from "lodash.uniqueid";
import { io } from "socket.io-client";
const socket = io();

//Переименование
//Открытие дроп-окна по одному щелчку

const Chat = () => {
  const [messages, setMessages] = useState();
  const [modal, setModal] = useState();
  const [channel, setChannel] = useState({ name: "general", id: 1 });
  const [channels, setChannels] = useState();
  const [rename, setRename] = useState(false);
  const [currentChannel, setCurrentChannel] = useState();
  const [remove, setRemove] = useState();
  const [id, setId] = useState();

  const { t } = useTranslation();

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
    });

    socket.on("removeChannel", (payload) => {
      del(payload.id, channels);
    });

    socket.on("renameChannel", (payload) => {
      console.log(payload);
      setChannels((channels) =>
        channels.splice(
          channels.indexOf(channels.filter((el) => el.id == payload.id)[0]),
          999,
          payload
        )
      );
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
          username: "admin",
        });
        resetForm();
      }
    },
    validationSchema: yup.object().shape({
      message: yup.string().required("введите сообщение"),
    }),
  });

  const loginData = useContext(MyContext);

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
      setCurrentChannel(
        event.target.parentElement.querySelector("button").textContent
      );
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
            <button onClick={quite} type="button" className="btn btn-primary">
              {t("log out")}
            </button>
          </div>
        </nav>
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
                  <span className="text-muted">0 {t("messages")}</span>
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
          channels={channels}
          closeAddChannel={closeAddChannel}
          setChannel={setChannel}
        />
      )}

      {rename && (
        <RenameChannel
          id={id}
          rename={rename}
          channels={channels}
          closeRename={closeRename}
        />
      )}

      {remove && (
        <RemoveChannel
          id={id}
          remove={remove}
          channels={channels}
          closeRemove={closeRemove}
        />
      )}
    </div>
  );
};

export default Chat;
