import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import * as yup from 'yup';

import routes from '../../routes';
import { setCredentials } from '../../slices/userSlice';

const SignupForm = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const inputUsernameElem = useRef(null);
  useEffect(() => {
    inputUsernameElem.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.username'))
      .max(20, t('errors.username')),
    password: yup.string()
      .required(t('errors.required'))
      .min(6, t('errors.password')),
    confirmPassword: yup.string()
      .required(t('errors.required'))
      .oneOf([yup.ref('password'), null], t('errors.confirmPassword')),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setValidated(false);

      try {
        const res = await axios.post(routes.signupPath(), values);
        dispatch(setCredentials(res.data));
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (e) {
        console.log(e);
        setValidated(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('signUpForm.title')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          name="username"
          id="username"
          type="text"
          placeholder={t('signUpForm.username')}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputUsernameElem}
          isInvalid={(formik.errors.username && formik.touched.username) || validated}
        />
        <Form.Label htmlFor="username">{t('signUpForm.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="password"
          id="password"
          required
          type="password"
          placeholder={t('signUpForm.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={(formik.errors.password && formik.touched.password) || validated}
        />
        <Form.Label htmlFor="password">{t('signUpForm.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder={t('signUpForm.confirmPassword')}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || validated}
        />
        <Form.Label htmlFor="confirmPassword">{t('signUpForm.confirmPassword')}</Form.Label>
        {formik.errors.confirmPassword && formik.touched.confirmPassword
          ? (<Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>)
          : (<Form.Control.Feedback type="invalid" tooltip>{t('errors.usernameRegistration')}</Form.Control.Feedback>)}
      </Form.Floating>

      <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">{t('signUpForm.signUp')}</Button>
    </Form>
  );
};

export default SignupForm;
