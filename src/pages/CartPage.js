import React from "react";
import "../pages/styles/styles.css";
import { useSelector } from "react-redux";
import { Alert, Container, Row } from "react-bootstrap";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((products) => userCartObj[products._id] != null);

  return (
    <Container
      style={{ minHeight: "95vh", paddingTop: "130px" }}
      className="cart-container"
    >
      <Row>
        <h1 className="pt-02 h3">Shopping cart</h1>
        {cart.length === 0 ? (
          <Alert variant="info">
            Shopping cart is empty. Add products to your cart
          </Alert>
        ) : (
          <div>Payment here</div>
        )}
      </Row>
    </Container>
  );
}

export default CartPage;
