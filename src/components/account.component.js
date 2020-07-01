import '../styles/account.css';
import React, { Component } from 'react';
import { Form, Button, Dropdown, Spinner } from 'react-bootstrap';
import User from '../util/user';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

    this.state = {
      accountType: User.MERCHANT,
      isLoading: false,
      validated: false
    };
  }

  signIn = (event) => {
    event.preventDefault();
    const username = this.usernameRef.current.value.trim();
    const password = this.passwordRef.current.value.trim();
    const route = this.state.accountType === User.MERCHANT
      ? 'vendors'
      : 'customers';

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

    fetch(`http://localhost:5000/${route}/login`, data)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(`Error: ${res.error}`);
          return;
        }
          User.save(username, this.state.accountType);
          window.location = '/';
      })
      .catch(err => alert('Error: ' + err))
      .finally(() => this.setState({ isLoading: false }));
  }

  onMenuItemSelect = (accountType) => {
    this.setState({ accountType });
  }

  render() {
    return (
      <div className="container account">
        <h1>{this.state.accountType} Sign In</h1>
        <Form noValidate validated={this.state.validated}>
          <Form.Group  controlId="formMerchant">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" required ref={this.usernameRef}/>
            <Form.Control.Feedback type="invalid">
              Please enter a username
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBusiness">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required ref={this.passwordRef}/>
            <Form.Control.Feedback type="invalid">
              Please enter a password
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <div className="account-type-row">
          <Dropdown>
            <Dropdown.Toggle>
              I am a {this.state.accountType.toLocaleLowerCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={User.MERCHANT} onSelect={this.onMenuItemSelect}>
                merchant
              </Dropdown.Item>
              <Dropdown.Item eventKey={User.CUSTOMER} onSelect={this.onMenuItemSelect}>
                customer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            onClick={this.signIn}
            className="account-sign-up-btn"
            disabled={this.state.isLoading}
          >
          {this.state.isLoading ? (
            <div>
              <Spinner animation="border" size="sm" />
              {' '} Loading...
            </div>
          ) : 'Log In'}
        </Button>
        </div>
        <div className="account-sign-up-container">
          <span> Don't have an account?</span>
          <a href="/merchant">Merchant Sign-Up</a>
          <a href="/customer">Customer Sign-Up</a>
        </div>
      </div>
    )
  }
}
