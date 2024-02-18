import React from "react";
import "../pages/styles/styles.css";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Badge } from "react-bootstrap";

function ProductPreview({ _id, category, name, pictures }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{
        cursor: "pointer",
        margin: "10px",
        boxShadow: "0px 10px 20px 1px rgb(51 51 51 / 13%)",
        borderRadius: 0,
      }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
          style={{
            height: "280px",
            objectFit: "cover",
            width: "100%",
            borderRadius: 0,
          }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge style={{ fontFamily: "Open Sans" }} bg="none" text="secondary">
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;