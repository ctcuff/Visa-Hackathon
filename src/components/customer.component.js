import '../styles/customer.css';
import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../util/user';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
      isLoading: false,
      validated: false
    };
  }

  addCustomer = (event) => {
    event.preventDefault();
    const username = this.usernameRef.current.value.trim();
    const password = this.passwordRef.current.value.trim();

    if (!username || !password) {
      this.setState({ validated: true });
      return;
    }

    this.setState({ isLoading: true });

    const postData = {
      username,
      password
    };

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    };

    fetch('http://localhost:5000/customers/signUp', data)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('Error: ' + res.error);
          return;
        }

        User.save(username, User.CUSTOMER);
        alert('Account created. Press OK to finish');
        window.location = '/';
      })
      .catch(err => alert('Error: ' + err))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className="container customer">
        <h1>Customer Sign Up</h1>
        <Form noValidate validated={this.state.validated}>
        <Form.Group controlId="formCustomer">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" required ref={this.usernameRef}/>
          <Form.Control.Feedback type="invalid">
              Please enter a username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required ref={this.passwordRef}/>
          <Form.Control.Feedback type="invalid">
              Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
        <Button 
          onClick={this.addCustomer} 
          className="customer-sign-up-btn"
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? (
            <div>
              <Spinner animation="border" size="sm" />
              {' '} Loading...
            </div>
          ) : 'Sign Up'}
        </Button>
        </Form>
        <div className="customer-login">
          <span>Already have an account? {' '}</span>
          <Link to="/account">Login</Link>
        </div>
      </div>
    )
  }
}
