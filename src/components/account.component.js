import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

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
      <div>
        <Form>
        <Form.Group controlId="formMerchant">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="First, Last" ref={this.username}/>
        </Form.Group>
        <Form.Group controlId="formBusiness">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="**********" ref={this.password}/>
        </Form.Group>
        </Form>
        <button onClick={this.signIn}>
          Log In
        </button>
        <p> Don't have an account?</p>
        <a href="/merchant">Merchant Sign-Up</a>
        <br></br>
        <a href="/farms">Customer Sign-Up</a>
      </div>
    )
  }
}