import { useTranslation } from 'react-i18next';
import ChangeLanguage from '../changeLanguage';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div id="chat" className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Chat Slack
            </a>
            <ChangeLanguage />
          </div>
        </nav>
        <div className="text-center">
          <h1 className="h4 text-muted">{t('page not found')}</h1>
          <p className="text-muted">
            {t('But you can go')}
            <a href="/">{t('the main page')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
