import '../styles/farms.css';
import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import Farm1 from '../assets/Farm1.jpeg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';

export default class Farms extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="farm-carousel-img"
              src={Farm1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Farm Number One</h3>
              <p>Distance: 10 miles, Main Products: Blueberries</p>
              <a href="/"> Browse Products</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="farm-carousel-img"
              src={Farm2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Farm Number Two</h3>
              <p>Distance: 12 miles, Main Products: Milk</p>
              <a href="/"> Browse Products</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="farm-carousel-img"
              src={Farm3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Farm Number Three</h3>
              <p>Distance: 30 miles, Main Products: Strawberries</p>
              <a href="/"> Browse Products</a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}
