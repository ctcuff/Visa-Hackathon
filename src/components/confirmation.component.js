import '../styles/confirmation.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class confirmation extends Component {
  render() {
    return (
      <div className="container confirmation">
        <div>
          <h1 className="confirmation-header">Thank you for you purchase!</h1>
          <p>
            Click <Link to="/orders">here</Link> to view your orders
          </p>
        </div>
      </div>
      );
    }
}
