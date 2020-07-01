import '../styles/home.css';
import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import agricultureImage1 from '../assets/agriculture1.jpg';
import agricultureImage2 from '../assets/agriculture2.jpg';
import agricultureImage3 from '../assets/agriculture3.jpg';
import agricultureImage4 from '../assets/agriculture4.jpg';
import agricultureImage5 from '../assets/agriculture5.jpg';
import { Carousel } from 'react-bootstrap';

const carouselImages = [agricultureImage1, 
                        agricultureImage2, 
                        agricultureImage3, 
                        agricultureImage4, 
                        agricultureImage5]
export default class Home extends Component {
  render() {
    return (
      <div>
        <Carousel className>
        {carouselImages.map((image, i) => (
          <Carousel.Item key={i}>
              <img 
                className="home-carousel-img" 
                src={carouselImages[i]}
                alt='Agriculture Image${i}'
              />
            </Carousel.Item>
        ))}
        </Carousel>
        <div className="home-container container">
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
