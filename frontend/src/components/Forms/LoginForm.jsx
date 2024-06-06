import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import axios from 'axios';

import routes from '../../routes';
import { setCredentials } from '../../slices/userSlice';

const LoginForm = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state === null ? routes.chatPage() : location.state.from;

  const { t } = useTranslation();

  const inputUsername = useRef(null);
  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsInvalid(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        dispatch(setCredentials(res.data));
        navigate(path);
      } catch (err) {
        setIsInvalid(true);
        const responseStatus = err.response.status;

        if (responseStatus === 401) {
          setErrorMessage(t('errors.login'));
        }
        if (responseStatus === 409) {
          setErrorMessage(t('errors.network'));
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginForm.title')}</h1>

      <Form.Floating className="mb-3">
        <Form.Control
          name="username"
          id="username"
          required
          type="text"
          placeholder={t('loginForm.username')}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputUsername}
          isInvalid={isInvalid}
        />
        <label htmlFor="username">{t('loginForm.username')}</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="password"
          id="password"
          required
          type="password"
          placeholder={t('loginForm.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={isInvalid}
        />
        <label htmlFor="password">{t('loginForm.password')}</label>
        <div className="invalid-tooltip">{errorMessage}</div>
      </Form.Floating>

      <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">{t('loginForm.title')}</Button>
    </Form>
  );
};

export default LoginForm;
