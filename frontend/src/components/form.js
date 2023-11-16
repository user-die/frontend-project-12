import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { MyContext } from "./MyContext";

export const Form = () => {
  const [error401, setError401] = useState();
  const loginData = useContext(MyContext);

  const formik = useFormik({
    initialValues: {
      nickname: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("/api/v1/login", {
          username: values.nickname,
          password: values.password,
        })

        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", response.data.token);
            loginData.setLogin("login");
          }
        })

        .catch((error) => {
          if (error.response.status == 401) {
            setError401(true);
          }
          console.log(error.response.status);
        });
    },
    validationSchema: yup.object().shape({
      nickname: yup.string().required("Введите ник"),
      password: yup.string().required("Введите пароль"),
    }),
  });

  return (
    <form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          placeholder="Ваш ник"
          id="username"
          className={
            formik.errors.nickname ? "form-control is-invalid" : "form-control"
          }
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="password"
          placeholder="Пароль"
          id="password"
          className={
            formik.errors.password ? "form-control is-invalid" : "form-control"
          }
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="password">Пароль</label>
        {error401 && (
          <div className="text-danger">
            Неверное имя пользователя или пароль
          </div>
        )}
      </div>
      {formik.errors.nickname && (
        <div className="text-danger">{formik.errors.nickname}</div>
      )}
      {formik.errors.password && (
        <div className="text-danger">{formik.errors.password}</div>
      )}
      <button className="w-100 mb-3 btn btn-outline-dark">Войти</button>
    </form>
  );
};
