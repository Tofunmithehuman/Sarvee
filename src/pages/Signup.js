import React, {useState} from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../pages/styles/styles.css';


function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <Container style={{paddingTop: "60px"}}>
        <Row>
            <Col md={6} className='signup__form--container' style={{marginTop: "-70px"}}>
                <Form style={{width: "100%"}}>
                    <h1>Create an account</h1>
                    <Form.Group style={{textAlign: "left"}}>
                        {/* <Form.Label>First Name</Form.Label> */}
                        <Form.Control type="text" placeholder='Enter first name' value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>
                    </Form.Group>
                    <br />

                    <Form.Group>
                        {/* <Form.Label>Last Name</Form.Label> */}
                        <Form.Control type="text" placeholder='Enter last name' value={lastName} required onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                    <br />

                    <Form.Group>
                        {/* <Form.Label>Email Address</Form.Label> */}
                        <Form.Control type="email" placeholder='Enter email' value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <br />

                    <Form.Group>
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type='password' placeholder='Enter Password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group> 
                    <br />
                                    
                    <Form.Group className='mb-3'>
                        {/* <Form.Label>Confirm Password</Form.Label> */}
                        <Form.Control type='password' placeholder='Confirm Password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>  
                    <br />

                    <Form.Group>
                        <Button type='submit'>Sign up</Button>
                    </Form.Group>
                    <p className='pt-3'>Already have an account?<Link to="/login">Login</Link></p>
                </Form>
            </Col>
            <Col md={6} className="signup__image--container"></Col>
        </Row>
    </Container>
  )
}

export default Signup;