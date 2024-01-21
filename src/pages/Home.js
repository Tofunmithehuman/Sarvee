import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import categories from "../categories";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "../axios";
import "../pages/styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../Redux/features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);

  const element = <FontAwesomeIcon icon={faCartShopping} />;

  useEffect(() => {
    axios
      .get("/products")
      .then(({ data }) => dispatch(updateProducts(data)))
      .catch((e) => {
        console.log(`Error is coming from ${e}`);
      });
  }, [dispatch]);

  return (
    <div className="Home" style={{ paddingTop: "90px" }}>
      <div className="hero">
        <img
          src="https://res.cloudinary.com/dzzwvcapu/image/upload/v1705793858/herobanner_o2qcpb.jpg"
          alt="banner"
        />
        <div className="contain">
          <h4>Best Available Products</h4>
          <br />
          <h1 style={{textShadow: "2px 2px 4px rgb(186, 186, 186)", fontWeight: "600"}}><span style={{color: "rgb(123 174 54)"}}>SHOP</span> SARVEE</h1>
          <br />
          <p>
            Explore all your favorite at SHOP SARVEE today, featuring a curated
            selection of products spanning from your daily essentials to your
            yearly necessities. This is the online store you won't want to miss!
          </p>
          <br />
          <Link to="/">SHOP NOW {element}</Link>
        </div>
      </div>
      <div className="homeContainer">
        <div className="featured-products-container container mt-4">
          <h2>Latest products</h2>
          {/* last products here */}
          <div className="d-flex justify-content-center mt-5 pt-3 flex-wrap gap-5">
            {lastProducts.map((product) => (
              <ProductPreview key={product._id} {...product} />
            ))}
          </div>
          <div>
            <Link
              to="/category/all"
              style={{
                textAlign: "center",
                display: "block",
                textDecoration: "none",
                color: "#000",
                margin: "40px 0 10px",
                fontSize: "12px",
              }}
            >
              See more...
            </Link>
          </div>
        </div>
        {/* sale banner */}
        <div className="sale_banner--container mt-4">
          <img
            src="https://res.cloudinary.com/dzzwvcapu/image/upload/v1700572876/Untitled_design_rg0zcu.jpg"
            alt="banner"
          />
        </div>
      </div>
      <div className="recent-products-container mt-4" id="catp">
        <h2>Categories</h2>
        <Row>
          {categories.map((category, index) => (
            <LinkContainer
              key={category.name} // Add key prop with a unique value
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile p-0"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
