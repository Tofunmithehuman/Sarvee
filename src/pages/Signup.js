import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../pages/styles/styles.css";
import { useSignupMutation } from "../Redux/services/appApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
  }

  return (
    <Container style={{ paddingTop: "60px" }}>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: "90%" }} onSubmit={handleSignup}>
            <br />
            <br />
            <h1>Create an account</h1>
            <br />
            <br />
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Your Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Your Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button
                type="submit"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                Create account
              </Button>
            </Form.Group>
            <br />
            <p className="pt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Signup;
