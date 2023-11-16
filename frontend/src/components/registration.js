import logo from "./images/avatar.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const Registration = () => {
  const [err, setErr] = useState();

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      axios
        .post("/api/v1/signup", {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          if (response.status == 201) {
            setErr(false);
          }
        })
        .catch((data) => {
          console.log(data);
          setErr(true);
        });
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, "не менее 3 символов")
        .max(20, "не более 20 символов")
        .required("От 3 до 20 символов"),
      password: yup
        .string()
        .min(6, "не менее 6 символов")
        .max(20, "не более 20 символов")
        .matches(
          /(?:[а-яёa-z]\d|\d[в-яёa-z])/i,
          "Пароль должен состоять из латинских символов или кириллицы и содержать цифры"
        )
        .required("Обязательное поле"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли должны совпадать")
        .required(),
    }),
  });

  console.log(err);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Chat Slack
            </a>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src={logo} className="rounded-circle" />
                  </div>
                  <form className="w-50" onSubmit={form.handleSubmit}>
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                      <input
                        placeholder="Имя пользователя"
                        autoComplete="username"
                        required
                        className={
                          form.errors.username
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="username"
                        value={form.values.username}
                        onChange={form.handleChange}
                      />
                      <label className="form-label" htmlFor="username">
                        Имя пользователя
                      </label>
                      {form.errors.username && (
                        <div className="invalid-tooltip">
                          {form.errors.username}
                        </div>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        placeholder="Пароль"
                        required
                        autoComplete="password"
                        className={
                          form.errors.password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="password"
                        value={form.values.password}
                        onChange={form.handleChange}
                      />
                      <label className="form-label" htmlFor="password">
                        Пароль
                      </label>
                      {form.errors.password && (
                        <div className="invalid-tooltip">
                          {form.errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        placeholder="Подтвердите пароль"
                        required
                        autoComplete="confirmPassword"
                        className={
                          form.errors.confirmPassword
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="confirmPassword"
                        value={form.values.confirmPassword}
                        onChange={form.handleChange}
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Подтвердите пароль
                      </label>
                      {form.errors.confirmPassword && (
                        <div className="invalid-tooltip">
                          {form.errors.confirmPassword}
                        </div>
                      )}

                      {err && (
                        <div className="invalid-tooltip">
                          Пользователь с тамим именем уже существует
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                    >
                      Зарегистрироваться
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
