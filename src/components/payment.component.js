import '../styles/payment.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default class Payment extends Component {

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
      apikey: '...',
      encryptionKey: '...',
      paymentRequest: {
        currencyCode: 'USD',
        subtotal: price.toFixed(2)
      }
    });

    window.V.on('payment.success', this.onPaymentSuccess);
    window.V.on('payment.cancel', this.onPaymentCancel);
    window.V.on('payment.error', this.onPaymentError);
  }

  onPaymentSuccess = (payment) => {
    console.log('Success', JSON.stringify(payment, null, 3));
  }

  onPaymentCancel = (payment) => {
    console.log('Cancelled', JSON.stringify(payment, null, 3));
  }

  onPaymentError = (payment) => {
    console.log('Error', JSON.stringify(payment, null, 3));
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
      )
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
          <img 
            alt="Visa Checkout" 
            class="v-button" 
            role="button" 
            src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"
            />
        </div>
      </div>
    )
  }
}
