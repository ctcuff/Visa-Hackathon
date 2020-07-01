import '../styles/payment.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import User from '../util/user';

export default class Payment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    // Get the price that was passed from the Shop component
    const paymentProps = this.props.location.paymentProps;

    // Only try to checkout if a price was passed to this component
    if (paymentProps) {
      this.checkout(paymentProps.total);
    }
  }

  checkout = (price) => {
    window.V.init({
      apikey: '8OOJ8XZOLVVXXIMKJ49M21lwSMj14t3lfROD-Z5fbCpESAX2A',
      paymentRequest: {
        currencyCode: 'USD',
        subtotal: price.toFixed(2),
      }
    });

    window.V.on('payment.success', this.onPaymentSuccess);
    window.V.on('payment.cancel', this.onPaymentCancel);
    window.V.on('payment.error', this.onPaymentError);
  }

  onPaymentSuccess = (payment) => {
    this.setState({ isLoading: true });
    this.submitOrder();
  }

  onPaymentCancel = (payment) => {
    alert("Your payment was cancelled");
  }

  onPaymentError = (payment) => {
    alert('There was an error processing your payment, please try again');
    console.log('Error', JSON.stringify(payment, null, 3));
  }

  submitOrder = () => {
    const cart = this.props.location.paymentProps.cart;

    // Add every item from the cart to the orders db
    const requests = cart.map(cartItem => {
      const postData = {
        vendorUsername: cartItem.vendorUsername,
        customerUsername: User.getUsername(),
        totalPrice: cartItem.price,
        listOfItems: [cartItem.itemId],
        time: Date.now()
      }
      return axios.post('http://localhost:5000/orders/create', postData);
    });

    // Wait for all order db requests to finish
    Promise
      .all(requests)
      .then(res => {
        window.location = '/confirmation';
      })
      .catch(err => {
        console.log(err);
        alert('An error occurred while submitting your order');
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
   const paymentProps = this.props.location.paymentProps;

    if (!paymentProps) {
      return (
        <div className="payment-empty">
          <p>
            You have no items to checkout. {' '}
            <Link to="/shop">Go to the shop</Link>.
          </p>
        </div>
      );
    }

    const { total, cart } = paymentProps;

    return (
      <div className="container payment">
        <h1 className="payment-total">Your total: ${total.toFixed(2)}</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Item name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(cartItem => (
              <tr key={cartItem.itemId}>
                <td>{cartItem.vendorUsername}</td>
                <td>{cartItem.itemName}</td>
                <td>${cartItem.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="payment-checkout">
          {this.state.isLoading ? (
            <p>Processing your order...</p>
          ) : (
            <img
              alt="Visa Checkout"
              className="v-button"
              role="button"
              src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"
            />
          )}
        </div>
      </div>
    );
  }
}
