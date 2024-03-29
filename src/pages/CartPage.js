import React from "react";
import "../pages/styles/styles.css";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { Alert, Container, Row, Col, Table } from "react-bootstrap";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../Redux/services/appApi";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) {
      return alert("Cannot proceed");
    } else {
      decreaseCart(product);
    }
  }

  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: user.cart.total * 100,
    publicKey: "pk_test_8ca3f9b7de80e6aa263ff82b29ac2ec0bf4c4aa1",
    onClose: () => null,
    onSuccess: () => {
      alert("Payment successful!");
      // Here you can clear the cart or redirect to a success page
    },
  });

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
            <button style={{outline: "none", border: "1px solid #c5fd7a", backgroundColor: "#c5fd7a", padding: "5px 20px 8px", margin:"35px 0", borderRadius:"4px"}} onClick={initializePayment}>Pay with Paystack</button>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>&nbsp;</td>
                      <td>
                        {!isLoading && (
                          <i
                            className="fa fa-times"
                            style={{ marginRight: "10", cursor: "pointer" }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}
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
                      <td>₦{item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <i
                            className="fa fa-minus-circle"
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                          <span>{user.cart[item._id]}</span>
                          <i
                            className="fa fa-plus-circle"
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        </span>
                      </td>
                      <td>₦{item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: ₦{user.cart.total}</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
