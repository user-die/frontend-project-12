import { useTranslation } from 'react-i18next';
import Navbar from '../navbar';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div id='chat' className='h-100' style={{ height: '100vh' }}>
      <div className='d-flex flex-column h-100'>
        <Navbar />
        <div className='container-fluid h-100 text-center bg-secondary-subtle'>
          <div className='row justify-content-center align-content-center h-100'>
            <h1 className='h4 text-muted'>{t('page not found')}</h1>
            <p className='text-muted'>
              {t('But you can go')}
              <a href='/'> {t('the main page')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
