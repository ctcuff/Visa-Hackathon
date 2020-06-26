import React, { Component } from 'react';

export default class Payment extends Component {
  render() {
    return (
      <div>
        <p>Visa Checkout BUtton</p>
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
