import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "./MyContext";

export const Form = () => {
  const loginData = useContext(MyContext);

  const validationSchema = yup.object().shape({
    nickname: yup.string().min(3).max(20).required("Введите ник"),
    password: yup.string().required("Введите пароль"),
  });

  let status;

  const formik = useFormik({
    initialValues: {
      nickname: "",
      password: "",
    },
    validationSchema,
  });

  const post = async () => {
    return await axios
      .post("/api/v1/login", {
        username: formik.values.nickname,
        password: formik.values.password,
      })

      .then((response) => {
        status = response.status;
        if (status == 200) {
          localStorage.setItem("token", response.data.token);
          loginData.setLogin("login");
        }
      })
      .catch((error) => console.log(error));
  };

  function disabledForm(e) {
    e.preventDefault();
    post();
  }

  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={disabledForm}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          name="nickname"
          validationSchema={validationSchema}
          value={formik.values.nickname}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          placeholder="Пароль"
          id="password"
          className="form-control"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></input>
        <label htmlFor="password">Пароль</label>
      </div>
      <button className="w-100 mb-3 btn btn-outline-dark">Войти</button>
    </form>
  );
};
