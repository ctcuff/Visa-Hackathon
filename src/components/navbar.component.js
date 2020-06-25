import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

export default class Navbar extends Component {
  searchProduct = (searchtext) => {
    alert("You are submitting " + searchtext)
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Farmers Market Hub</Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="navbar-item">
          <Link to="/farms" className="nav-link">Farms</Link>
          </li>
          <li className="navbar-item">
          <Link to="/shop" className="nav-link">Shop</Link>
          </li>
        </ul>
        <Search placeholder="input search text" onSearch={value => this.searchProduct(value)} enterButton />
        <ul className="navbar-nav">
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
            <NavDropdown.Item href="/Orders">Orders</NavDropdown.Item>
            <NavDropdown.Item href="/Payments">Payments</NavDropdown.Item>
            <NavDropdown.Item href="/farmermanage">Item Manager</NavDropdown.Item> 
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Contact_Us">Contact Us</NavDropdown.Item>
          </NavDropdown>
          <li className='navbar-item'>
            <Link to="/account" className="nav-link">Log-In</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
