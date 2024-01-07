import React from "react";
import categories from "../categories";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../pages/styles/styles.css";

function Home() {


  return (
    <div className="Home" style={{ paddingTop: "90px" }}>
      <div className="homeContainer">
        <video
          src="https://res.cloudinary.com/dzzwvcapu/video/upload/v1704545830/savvy_banner_wlinev.mp4"
          alt="banner"
          autoPlay
          loop
          muted
        />
        <div className="featured-products-container container mt-4">
          <h2>Last products</h2>
          {/* last products here */}

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
        <div className="recent-products-container mt-4" id="catp">
          <h2>Categories</h2>
          <Row>
            {categories.map((category, index) => (
              <LinkContainer
                key={index} // Add key prop with a unique value
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
    </div>
  );
}

export default Home;
