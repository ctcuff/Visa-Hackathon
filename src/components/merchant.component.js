import '../styles/merchant.css';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Merchant extends Component {
  constructor(props) {
    super(props);
    this.merchant = React.createRef();
    this.business = React.createRef();
    this.address = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
    this.username = React.createRef();
    this.password = React.createRef();
    this.picture = React.createRef();
  }
  
  addMerchant = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.merchant.current.value +
    this.business.current.value +
    this.address.current.value +
    this.email.current.value +
    this.phone.current.value);
  }

  render() {
    return (
      <div className="container merchant">
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
          <Form.Control type="email" placeholder="example@some-site.com" ref={this.email}/>
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="123-123-1234" ref={this.phone}/>
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="" ref={this.username}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" ref={this.password}/>
        </Form.Group>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Upload Farm Image" />
        </Form.Group>
        </Form>
        <Button onClick={this.addMerchant}>
          Sign Up
        </Button>
        <div className="merchant-login">
          <span>Already have an account? {' '}</span>
          <Link to="/account">Login</Link>
        </div>
      </div>
    )
  }
}
