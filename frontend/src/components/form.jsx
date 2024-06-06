import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { toggleLogin, setNickname, setToken } from '../store/loginSlice';
import { useDispatch } from 'react-redux';

function Form(props) {
  const [error401, setError401] = useState(),
    { serverError } = props,
    { t } = useTranslation(),
    dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    onSubmit: (values) => {
      axios
        .post('/api/v1/login', {
          username: values.nickname,
          password: values.password,
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setToken(response.data.token));
            dispatch(toggleLogin());
            dispatch(setNickname(response.data.username));
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setError401(true);
          }

          if (error.response.status === 500) {
            serverError();
          }
        });
    },
    validationSchema: yup.object().shape({
      nickname: yup.string().required(t('required nickname')),
      password: yup.string().required(t('required password')),
    }),
  });

  return (
    <form
      className='col-12 col-md-6 mt-3 mt-mb-0'
      onSubmit={formik.handleSubmit}
    >
      <h1 className='text-center mb-4'>{t('login')}</h1>
      <div className='form-floating mb-3'>
        <input
          placeholder={t('yourNick')}
          id='username'
          className={
            formik.errors.nickname ? 'form-control is-invalid' : 'form-control'
          }
          name='nickname'
          value={formik.values.nickname}
          onChange={formik.handleChange}
        />
        <label htmlFor='username'>{t('yourNick')}</label>
      </div>
      <div className='form-floating mb-4'>
        <input
          type='password'
          placeholder={t('password')}
          id='password'
          className={
            formik.errors.password ? 'form-control is-invalid' : 'form-control'
          }
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <label htmlFor='password'>{t('password')}</label>
        {error401 && <div className='text-danger'>{t('invalid')}</div>}
      </div>
      {formik.errors.nickname && (
        <div className='text-danger'>{formik.errors.nickname}</div>
      )}
      {formik.errors.password && (
        <div className='text-danger'>{formik.errors.password}</div>
      )}
      <button type='submit' className='w-100 mb-3 btn border'>
        {t('login')}
      </button>
    </form>
  );
}

export default Form
