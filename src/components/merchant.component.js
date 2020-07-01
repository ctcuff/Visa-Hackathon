import '../styles/merchant.css';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../util/user';

export default class Merchant extends Component {
  constructor(props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.companyRef = React.createRef();
    this.streetAddressRef = React.createRef();
    this.cityRef = React.createRef();
    this.stateRef = React.createRef();
    this.zipCodeRef = React.createRef();

    this.state = {
      isLoading: false,
      validated: false
    };
  }

  addMerchant = (event) => {
    event.preventDefault();
    const refs = [
      this.usernameRef,
      this.passwordRef,
      this.companyRef,
      this.streetAddressRef,
      this.cityRef,
      this.stateRef
    ];

    // Check every input field to make sure each field
    // has a value
    if (!refs.every(ref => !!ref.current.value)) {
      this.setState({ validated: true });
      return;
    }

    this.setState({ isLoading: true });

    const body = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
      company: this.companyRef.current.value,
      address: {
        street: this.streetAddressRef.current.value,
        city: this.cityRef.current.value,
        state: this.stateRef.current.value,
        zipcode: this.zipCodeRef.current.value
      }
    }

    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch('http://localhost:5000/vendors/signUp', postData)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(`Error: ${res.error}`);
          return;
        }

        alert('Account successfully created. Press OK to finish');
        User.save(body.username, User.MERCHANT);
        window.location = '/';
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className="container merchant">
        <h1> Merchant Sign Up</h1>
        <Form noValidate validated={this.state.validated}>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" ref={this.usernameRef}/>
          <Form.Control.Feedback type="invalid">
              Please enter a username
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" ref={this.passwordRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Company Name</Form.Label>
          <Form.Control required type="text" placeholder="Company Name" ref={this.companyRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a company name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Street Address</Form.Label>
          <Form.Control required type="address" placeholder="123 River Drive" ref = {this.streetAddressRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a street address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control required type="text" placeholder="Miami" ref={this.cityRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a city
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control required type="text" placeholder="FL" ref={this.stateRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a state
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control required type="number" placeholder="33101" ref={this.zipCodeRef}/>
          <Form.Control.Feedback type="invalid">
            Please enter a zip code
          </Form.Control.Feedback>
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
