import React, { useState } from "react";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../Redux/services/appApi";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import axios from "../axios";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    console.log("Deleting image with public_id:", imgObj.public_id);
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all fields");
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzzwvcapu",
        uploadPreset: "u0yzntl8",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container
      style={{
        paddingTop: "100px",
        paddingBottom: "50px",
        width: "90%",
        background: "#fbfaf8",
        color: "#000",
        fontFamily: "Open Sans",
      }}
    >
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Create a product</h1>
            <br />
            {isSuccess && (
              <Alert variant="success">Product created with success</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Product name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Product description
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Product price (₦){" "}
              </Form.Label>
              <Form.Control
                input
                type="text"
                pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
                placeholder="Enter Product price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Category
              </Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled> -- Select One -- </option>
                <option value="technology"> Technology </option>
                <option value="services"> Services </option>
                <option value="fashion"> Fashion </option>
              </Form.Select>
            </Form.Group>
            <br />
            <br />

            <Form.Group>
              <Button
                type="button"
                style={{ width: "100%" }}
                onClick={showWidget}
              >
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div key={image.public_id} className="image-preview">
                    <img src={image.url} alt="img" />
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                style={{ width: "100%" }}
                disabled={isLoading || isSuccess}
              >
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
