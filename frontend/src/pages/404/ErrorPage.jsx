import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div>{t('text.errorPage')}</div>
  );
};

export default ErrorPage;
