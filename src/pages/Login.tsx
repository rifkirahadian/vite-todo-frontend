import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { authUser, login } from '../services/api';
import { setToken, setUser } from '../services/localStorage';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const { data, isError, error } = await login({ email, password });
    if (isError) {
      setErrorMessage(error);
    }

    if (errorMessage && !isError) {
      setErrorMessage(null);
    }

    if (!isError) {
      setToken(data.access_token);
      const { data: user } = await authUser()
      setUser(user);
      navigate('/')
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2 className="text-center">Login</h2>

          {errorMessage && (
            <Alert variant={'danger'}>
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className='mb-3 text-start'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='text-start mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
