import React from 'react';
import {
  Row, Container, Col, Card, Image,
} from 'react-bootstrap';

import SignupForm from '../../components/Forms/SignupForm';
import image from '../../assets/signupimage.jpg';

const SignupPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <Image
              src={image}
              style={{ width: '200px', height: '200px' }}
              roundedCircle
              alt="Зарегистрироваться"
            />
            <SignupForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignupPage;
