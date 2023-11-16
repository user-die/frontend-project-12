import { useState } from "react";
import { Form } from "./form";
import logo from "./images/im1.jpeg";

const Login = () => {
  return (
    <section className="h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Chat Slack
          </a>
        </div>
      </nav>
      <div className="container-fluid h-100 bg-light">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={logo} className="rounded-circle"></img>
                </div>
                <Form />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span className="me-1">Нет аккаунта?</span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
