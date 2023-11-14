import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io();

/*
1) Функция, добавляющая в message новое сообщение от сокета
2) Фильтрация и мап канала
*/

const Chat = () => {
  const [servData, setServData] = useState();
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState();
  const [modal, setModal] = useState();
  const [channel, setChannel] = useState();

  useEffect(() => {
    const requestData = async () => {
      const data = await axios
        .get("/api/v1/data", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((response) => {
          setServData(response.data);
          setMessages(response.data.messages);
        });
    };
    requestData();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      setMessages((messages) => [...messages, payload]);
      console.log(payload);
    });
  }, []);

  function addMessage() {
    let result = [];
    messages.forEach((message) => {
      result.push(
        <div className="text-break mb-2">
          <b> {message.username}</b>: {message.body}
        </div>
      );
    });
    return result;
  }

  const loginData = useContext(MyContext);

  function quite() {
    loginData.setLogin("notLogin");
  }

  function disabledForm(e) {
    e.preventDefault();

    socket.emit("newMessage", {
      body: newMessage,
      channelId: 1,
      username: "admin",
    });
  }

  function formChange(e) {
    setNewMessage(e.target.value);
  }

  function changeChannel() {}

  function openModal() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light modal-open";
    //body.style.overflow = "hidden";
    setModal(true);
  }

  function closeModal() {
    const body = document.querySelector("body");
    body.className = "h-100 bg-light";
    //body.style.overflow = "";
    setModal(false);
  }

  function createChannel() {
    socket.emit("newChannel", { name: "new channel" });
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
              Выйти
            </button>
          </div>
        </nav>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={openModal}
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
                {servData &&
                  servData.channels.map((el) => (
                    <li className="nav-item w-100">
                      <button
                        type="button"
                        /*className={
                          active
                            ? "w-100 rounded-0 text-start btn btn-secondary"
                            : "w-100 rounded-0 text-start btn"
                        }*/
                        onClick={changeChannel}
                      >
                        <span className="me-1">#</span>
                        {el.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b># general</b>
                  </p>
                  <span className="text-muted">0 сообщений</span>
                </div>
                <div
                  id="messages-box"
                  className="chat-messages overflow-auto px-5"
                >
                  {messages && addMessage()}
                </div>
                <div className="mt-auto px-5 py-3">
                  <form
                    className="py-1 border rounded-2"
                    onSubmit={disabledForm}
                  >
                    <div className="input-group has-validation">
                      <input
                        name="body"
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2 form-control"
                        onChange={formChange}
                        value={newMessage}
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
                        <span className="visually-hidden">Отправить</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && <div className="fade modal-backdrop show"></div>}

      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fade modal show"
          tabindex="-1"
          style={{ display: ` ${modal ? "block" : "none"}` }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">Добавить канал</div>
                <button
                  type="button"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  className="btn btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div>
                    <input
                      name="name"
                      id="name"
                      className="mb-2 form-control"
                    ></input>
                    <label className="visually-hidden" for="name"></label>
                    <div className="invalid-feedback"></div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="me-2 btn btn-secondary"
                        onClick={closeModal}
                      >
                        Отменить
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Отправить
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;