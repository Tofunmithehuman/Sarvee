import React from "react";
import { Container, Button, Nav, Navbar, NavDropdown  } from "react-bootstrap";
import '../pages/styles/styles.css';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/userSlice";


function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar expand="lg" className="bg-body-secondary position-fixed" style={{width: '100%'}}>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>Shop Savvy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {!user && <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>}

            {user && (
            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
              {user.isAdmin && (
                <>
                  <LinkContainer to='/dashbord'>
                  <NavDropdown.Item >Dashbord</NavDropdown.Item> 
                  </LinkContainer>
                  <LinkContainer to='/new-product'>
                  <NavDropdown.Item >Create Product</NavDropdown.Item> 
                  </LinkContainer>
              </>
              )}

              {!user.isAdmin && (
                <>
                  <LinkContainer to='/cart'>
                  <NavDropdown.Item >My Shopping Cart</NavDropdown.Item> 
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                  <NavDropdown.Item >My Orders</NavDropdown.Item> 
                  </LinkContainer>
              </>
              )}
              <NavDropdown.Divider />
              <Button variant="primary" onClick={handleLogout} className="logout-btn">Logout</Button>
            </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;