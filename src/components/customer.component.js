import '../styles/customer.css';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.customer = React.createRef();
    this.address = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
  }

  addCustomer = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.customer.current.value +
    this.address.current.value +
    this.email.current.value +
    this.phone.current.value);
  }

  render() {
    return (
      <div className="container customer">
        <Form>
        <Form.Group controlId="formCustomer">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" placeholder="First, Last" ref={this.customer}/>
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="address" placeholder="123 River Drive" ref = {this.address}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Contact</Form.Label>
          <Form.Control type="email" placeholder="example@some-site.com" ref={this.email}/>
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="123-123-1234" ref={this.phone}/>
        </Form.Group>
        </Form>
        <Button href="/account" onClick={this.addCustomer} className="customer-sign-up-btn">
          Sign Up
        </Button>
        <div className="customer-login">
          <span>Already have an account? {' '}</span>
          <Link to="/account">Login</Link>
        </div>
      </div>
    )
  }
}
