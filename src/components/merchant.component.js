import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import { ReactDOM } from 'react-dom';

export default class Merchant extends Component {
  constructor(props) {
    super(props);
    this.merchant = React.createRef();
    this.business = React.createRef();
    this.address = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
  }
  
  addMerchant = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.merchant.current.value +
    this.business.current.value +
    this.address.current.value +
    this.email.current.value +
    this.phone.current.value);
  }

  merchantHandler = (event) => {
    this.setState({merchant: event.target.value});
  }

  render() {
    return (
      <div>
        <p>Merchant Home page</p>
        <Form>
        <Form.Group controlId="formMerchant">
          <Form.Label>Merchant Name</Form.Label>
          <Form.Control type="text" placeholder="First, Last" ref={this.merchant}/>
        </Form.Group>
        <Form.Group controlId="formBusiness">
          <Form.Label>Business</Form.Label>
          <Form.Control type="text" placeholder="Enter Business" ref={this.business}/>
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="address" placeholder="123 River Drive" ref = {this.address}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Contact</Form.Label>
          <Form.Control type="email" placeholder="example@somesite.com" ref={this.email}/>
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="123-123-1234" ref={this.phone}/>
        </Form.Group>
        </Form>
        <button onClick={this.addMerchant}>
          Add Product
        </button>
      </div>
    )
  }
}
