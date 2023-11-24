import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/avatar.jpg";
import * as yup from "yup";
import axios from "axios";
import ChangeLanguage from "./changeLanguage";

const Registration = () => {
  const [err, setErr] = useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

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
            navigate("/");
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
        .min(3, t("min3Username"))
        .max(20, t("max20Username"))
        .required(t("required nickname")),
      password: yup
        .string()
        .min(6, t("min6Password"))
        .max(20, t("max20Password"))
        .matches(/(?:[а-яёa-z]\d|\d[в-яёa-z])/i, t("consist"))
        .required(t("required password")),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], t("match"))
        .required(t("confirmPassword")),
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
            <ChangeLanguage />
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
                    <h1 className="text-center mb-4">{t("registration")}</h1>
                    <div className="form-floating mb-3">
                      <input
                        placeholder={t("username")}
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
                        {t("username")}
                      </label>
                      {form.errors.username && (
                        <div className="invalid-tooltip">
                          {form.errors.username}
                        </div>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        placeholder={t("password")}
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
                        {t("password")}
                      </label>
                      {form.errors.password && (
                        <div className="invalid-tooltip">
                          {form.errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        placeholder={t("confirmPassword")}
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
                        {t("confirmPassword")}
                      </label>
                      {form.errors.confirmPassword && (
                        <div className="invalid-tooltip">
                          {form.errors.confirmPassword}
                        </div>
                      )}
                    </div>
                    {err && <div className="text-danger">{t("already")}</div>}
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                    >
                      {t("signup")}
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
