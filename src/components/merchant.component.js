import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

function addProduct() {

}

export default class Merchant extends Component {
  render() {
    return (
      <div>
        <p>Merchant Home page</p>
        <Form>
        <Form.Group controlId="formMerchant">
          <Form.Label>Merchant Name</Form.Label>
          <Form.Control type="text" placeholder="First, Last" />
        </Form.Group>
        <Form.Group controlId="formBusiness">
          <Form.Label>Business</Form.Label>
          <Form.Control type="text" placeholder="Enter Business" />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="address" placeholder="123 River Drive" />
        </Form.Group>
        <Form.Group controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control type="text" placeholder="Blueberries" />
        </Form.Group>
        <Form.Group controlId="formCount">
          <Form.Label>Count</Form.Label>
          <Form.Control type="number" placeholder="0" />
        </Form.Group>
        </Form>
        <button onClick={addProduct}>
          Add Product
        </button>
      </div>
    )
  }
}
