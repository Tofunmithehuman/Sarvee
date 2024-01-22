import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Row, Col, Container, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "../pages/styles/styles.css";
import { LinkContainer } from "react-router-bootstrap";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null); // Fix here

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data.product);
        setSimilar(data.similar);
      })
      .catch((error) => {
        console.error("Error message is:", error.response);
      });
  }, [id]);

  if (!product) return <Loading />;

  const responsive = {
      0: {items: 1},
      568: {items: 2},
      1024: {items: 3}
  }

  const images = product.pictures.map((pictures) => (
    <img
      className="product__carousel--image"
      src={pictures.url}
      onDragStart={handleDragStart}
      alt={pictures.name}
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, idx) => (
      <div className="item" data-value={idx} key={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <Container style={{ position: "relative", paddingTop: "10rem" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p className="product__price"> ₦{product.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong> {product.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{width: '90%'}}>
                <Form.Select size='lg' style={{width: "40%", borderRadius: "0"}}> 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
                <Button size='lg'>Add to cart</Button>
            </ButtonGroup>
          )}

          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size='lg'>Edit Product</Button>
            </LinkContainer>
          )}
        </Col>
      </Row>
      <div className="my-4">
            <h2>Similar Products</h2>
            <div className="d-flex justify-content-center align-items-center flex-wrap mt-5">
              <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate"></AliceCarousel>
            </div>
      </div>
    </Container>
  );
}

export default ProductPage;
