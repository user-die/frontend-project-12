import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { removeCredentials } from '../slices/userSlice.js';
import Spinner from './Spinner.jsx';

const Header = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const { t } = useTranslation();

  const handeleRemoveUser = () => () => {
    dispatch(removeCredentials());
    localStorage.removeItem('userId');
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">{t('text.chatTitle')}</Navbar.Brand>
          {token
            ? <Button as={Link} onClick={handeleRemoveUser()} to="/login" state={{ from: location }}>{t('buttons.chat.out')}</Button>
            : null}
        </Container>
      </Navbar>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Header;
