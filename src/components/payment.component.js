import '../styles/payment.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Payment extends Component {

  componentDidMount() {
    // Get the price that was passed from the Shop component
    const price = this.props.location.priceProps && this.props.location.priceProps.amount;

    // Only try to checkout if a price was passed to this component
    if (price) {
      this.checkout(price);
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
    const price = this.props.location.priceProps && this.props.location.priceProps.amount;

    if (!price) {
      return (
        <div className="payment-empty">
          <p>
            You have no items to checkout. {' '}
            <Link to="/shop">Go to the shop</Link>.
          </p>
        </div>
      )
    }
  
    return (
      <div>
        <h1>Your total: ${price.toFixed(2)}</h1>
        <img 
          alt="Visa Checkout" 
          class="v-button" 
          role="button" 
          src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"
          />
      </div>
    )
  }
}
