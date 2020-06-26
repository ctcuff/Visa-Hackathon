import React, { Component } from 'react';
import {
  NavDropdown,
  Nav,
  Navbar as BootstrapNavbar,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  render() {
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
            <Form inline onSubmit={this.searchProduct}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.handleSearchValueChange}
              />
              <Button variant="outline-info" type="submit">
                Search
              </Button>
            </Form>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="/Orders">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/Payments">Payments</NavDropdown.Item>
              <NavDropdown.Item href="/farmermanage">Item Manager</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Contact_Us">Contact Us</NavDropdown.Item>
            </NavDropdown>
            <Link to="/account" className="nav-link">Log-In</Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    );
  }
}
