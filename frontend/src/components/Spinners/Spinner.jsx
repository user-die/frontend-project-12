import { Container } from 'react-bootstrap';

const Spinner = () => (
  <Container className="h-100 d-flex align-items-center justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </Container>
);

export default Spinner;
