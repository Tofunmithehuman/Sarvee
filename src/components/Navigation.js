import React from "react";
import styled from "styled-components";
import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../pages/styles/styles.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/userSlice";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const StyledWrapper = styled.div`
    background-color: #fff;
  `;


  return (
    <Navbar expand="lg" className="navigation" style={{ width: "100%" }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <h5 style={{ color: "#fff", background-color: "c5fd7a"}}>SAVVY</h5>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-navbar-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>
                  <h6 style={{ color: "#fff" }}>Login</h6>
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <StyledWrapper>
                    <LinkContainer to="/dashbord">
                      <NavDropdown.Item>Dashbord</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                  </StyledWrapper>
                )}
                

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>My Shopping Cart</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button
                  variant="primary"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
