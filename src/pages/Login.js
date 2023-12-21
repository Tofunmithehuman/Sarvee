import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../Redux/services/appApi';
import '../pages/styles/styles.css';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();


  function handleLogin(e) {
    e.preventDefault();
    login({email, password});
  }

  return ( 
    <Container style={{paddingTop: "60px"}}>
        <Row>
          <Col md={6} className='login__form--container'>
            <Form style={{width: "90%"}} onSubmit={handleLogin}>
              <h1>Login to your account</h1>
              <br />
              <br />
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group>
                <Form.Label style={{width: "100%", textAlign: "left"}}>Your Email</Form.Label>
                <Form.Control type="email" placeholder='Enter your email' value={email} required onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              <br />
              <Form.Group className='mb-3'>
                <Form.Label style={{width: "100%", textAlign: "left"}}>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your Password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>  
              <br />
              <Form.Group>
                <Button type='submit' style={{width: "100%"}} disabled={isLoading}>Login</Button>
              </Form.Group>
              <br />
              <p className='pt-3'>Don't have an account? <Link to="/signup">Create account</Link></p>
            </Form>
          </Col>
          <Col md={6} className='login__image--container'></Col>
        </Row>
    </Container>
  )
}

export default Login;