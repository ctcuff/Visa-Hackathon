import '../styles/home.css';
import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import agricultureImage from '../assets/agriculture.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Image src={agricultureImage} fluid className="home-landing-image" />
        <div class="home-container container">
          <h1 className="home-heading">Welcome to the Farmer's Market Hub</h1>
          <p className="home-text">
            Farmer's Market Hub is a central hub for consumers and
            farmers. As a consumer, you can purchase produce online,
            pick it up via curbside pickup, and find farms using geolocation.
            Little to no contact is required. Due to COVID, many farmers
            have excess produce and now have no way to sell it.
            Additionally, consumers have wanted more fresh all natural
            options for purchasing food, however, to purchase directly
            from the farm has been difficult since information is well
            aggregated on Google and many farms have no web presence
            whatsoever. Lastly, locals farmers markets now have strict
            rules and capacity limits due to COVID, so farmers who typically
            sold products at these markets saw a decrease in sales without
            another way to market their products. Our Farmer’s Market Hub
            gives farmers a leg up in the online food industry.
          </p>
        </div>
      </div>
    )
  }
}
