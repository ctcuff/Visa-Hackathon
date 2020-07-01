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
      apikey: '8OOJ8XZOLVVXXIMKJ49M21lwSMj14t3lfROD-Z5fbCpESAX2A',
      //encryptionKey: 'InCkjiC-p6Ps8Igu4$07bd6A-/E8{d3HCHBPV6R1',
      paymentRequest: {
        currencyCode: 'USD',
        subtotal: price.toFixed(2),
      }
    });

    window.V.on('payment.success', this.onPaymentSuccess);
    window.V.on('payment.cancel', this.onPaymentCancel);
    window.V.on('payment.error', this.onPaymentError);

  }

  onPaymentSuccess = (payment) => {alert(JSON.stringify("YOUR PAYMENT WAS SUCCESSFULLY PROCESSED")); window.location = '/confirmation'}



  onPaymentCancel = (payment) => {alert(JSON.stringify("YOUR PAYMENT WAS SUCCESSFULLY CANCELLED")); }



  onPaymentError = (payment) => {alert(JSON.stringify("PAYMENT ERROR. PLEASE TRY AGAIN")); }

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
