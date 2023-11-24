import React, { useState } from 'react';
import './styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../Redux/services/appApi';
import { Alert, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NewProduct() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);

  const navigate = useNavigate();
  const [createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation();


  function showWidget() {
    
  }



  return (
    <Container style={{paddingTop: "100px", paddingBottom: "50px", background: '#000', color: '#fff'}}>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{width: "100%"}}>
                <h1>Create a product</h1>
                  {isSuccess && <Alert variant='success'>Product created with success</Alert>}
                {isError && <Alert variant='danger'>{error.data}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control type="text" placeholder='Enter product name' value={name} required onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product description</Form.Label>
                  <Form.Control as='textarea' placeholder='Product description' style={{height: "100px"}} value={description} required onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price($) </Form.Label>
                  <Form.Control type="number" placeholder='Price ($)' value={price} required onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>
              
                <Form.Group className='mb-3' onChange={(e) => setCategory(e.target.value)}>
                  <Form.Label>Category</Form.Label>
                  <Form.Select>
                    <option disabled selected> -- Select One -- </option>
                    <option value="technology"> Technology </option>
                    <option value="laptop"> Laptop </option>
                    <option value="phone"> Phone </option>
                    <option value="clothe"> Clothe </option>                   
                  </Form.Select>
                </Form.Group>  

                <Form.Group className="mb-3">
                  <Button type='button' onClick={showWidget}>Upload Images</Button>
                  <div className='image-previw-container'>
                    {images.map((image) => (
                      <div className='image-preview'>
                          <img src={image.url} />

                      </div>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Button type='submit' disabled={isLoading || isSuccess}>Create Product</Button>
                </Form.Group>
              </Form>
        </Col>
        <Col md={6} classname="ew-producnt__image--container"></Col>
      </Row>
    </Container>
  )
}

export default NewProduct;