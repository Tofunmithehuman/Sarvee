import React from "react";
import styled from "styled-components";
import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../pages/styles/styles.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/features/userSlice";
import CartPage from "../pages/CartPage";

const StyledWrapper = styled.div`
  background-color: #fff;
`;

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  console.log('User State:', user);

  return (
    <Navbar expand="lg" className="navigation" style={{ width: "100%" }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              className="navImg"
              src="https://res.cloudinary.com/dzzwvcapu/image/upload/v1705946976/nav_fzhldw.png"
              alt="nav"
            />
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

            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i
                    className="fas fa-shopping-cart"
                    style={{ color: "white" }}
                  ></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
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
                  style={{
                    backgroundColor: "#c5fd7a",
                    color: "#000",
                    border: "#c5fd7a",
                  }}
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