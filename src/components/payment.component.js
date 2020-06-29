import React, { Component } from 'react';

export default class Payment extends Component {

  componentDidMount() {
    window.V.init({ 
      apikey: '...',
      encryptionKey: '...',
      paymentRequest: {
        currencyCode: 'USD',
        subtotal: '9.00'
      }
    });

    window.V.on('payment.success', function(payment) {
      alert(JSON.stringify(payment));
    });
  }

  render() {
    return (
      <div>
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
