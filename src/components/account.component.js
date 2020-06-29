import '../styles/account.css';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  signIn = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.username.current.value +
    this.password.current.value);
  }

  render() {
    return (
      <div className="container account">
        <Form>
          <Form.Group controlId="formMerchant">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" ref={this.username}/>
          </Form.Group>
          <Form.Group controlId="formBusiness">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" ref={this.password}/>
          </Form.Group>
        </Form>
        <Button onClick={this.signIn} className="account-sign-up-btn">
          Log In
        </Button>
        <div className="account-sign-up-container">
          <span> Don't have an account?</span>
          <a href="/merchant">Merchant Sign-Up</a>
          <a href="/customer">Customer Sign-Up</a>
        </div>
      </div>
    )
  }
}
