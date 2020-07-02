import React, { Component } from 'react';
import {NavDropdown, Nav, Navbar as BootstrapNavbar, Form, Button, FormControl, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../util/user';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  searchProduct = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.searchValue);
  };

  handleSearchValueChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  logOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      User.clear();
      window.location = "/";
    }
  };

  render() {
    const linkProps = {
      pathname: '/shop',
      searchProps: {
        searchTerm: this.state.searchValue
      }
    };

    return (
      <BootstrapNavbar bg="dark" expand="lg" variant="dark">
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse>
          <Link to="/" className="navbar-brand">
            Farmers Market Hub
          </Link>
          <Nav className="mr-auto">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/farms" className="nav-link">Farms</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
          </Nav>
          <Nav>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/farmermanage">Item Manager</NavDropdown.Item>
            </NavDropdown>
            {User.isLoggedIn() ? (
              <Link to="#" className="nav-link" onClick={this.logOut}>Log-Out</Link>
            ) : (
              <Link to="/account" className="nav-link">Log-In</Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    );
  }
}
