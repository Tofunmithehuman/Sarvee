import React from "react";
import "../pages/styles/styles.css";
import { useSelector } from "react-redux";
import { Alert, Container, Row, Col, Table } from "react-bootstrap";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container
      style={{ minHeight: "95vh", paddingTop: "130px" }}
      className="cart-container"
    >
      <Row>
        <Col md={7}>
          <h1 className="pt-02 h3">Shopping cart</h1>
          {cart.length === 0 ? (
            <Alert variant="info">
              Shopping cart is empty. Add products to your cart
            </Alert>
          ) : (
            <div>Payment here</div>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <th>&nbsp;</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <i
                          className="fa fa-times"
                          style={{ marginRight: "10", cursor: "pointer" }}
                        ></i>
                        <img
                          src={item.pictures[0].url}
                          alt="itemPicture"
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <i className="fa fa-minus-circle"></i>
                          <i className="fa fa-plus-circle"></i>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
