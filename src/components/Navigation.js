import React from "react";
import { Container, Button, Nav, Navbar, NavDropdown  } from "react-bootstrap";
import '../pages/styles/styles.css';
import { LinkContainer } from "react-router-bootstrap";


function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-secondary position-fixed" style={{width: '100%'}}>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>Shop Savvy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;