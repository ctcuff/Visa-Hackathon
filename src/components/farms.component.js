import '../styles/farms.css';
import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Farm1 from '../assets/Farm1.jpeg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';

const placeHolderImages = [Farm1, Farm2, Farm3];

export default class Farms extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: []
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/vendors')
      .then(response => {
        this.setState({ vendors: response.data });
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <Carousel>
        {this.state.vendors.map((vendor, index) => (
          <Carousel.Item key={index}>
              <img 
                className="farm-carousel-img" 
                src={placeHolderImages[index % placeHolderImages.length]}
                alt={vendor.name}
              />
              <Carousel.Caption>
                <h3>{vendor.company}</h3>
                <p>{vendor.address.city}, {vendor.address.state}</p>
                <a href="/">Browse Products</a>
              </Carousel.Caption>
            </Carousel.Item>
        ))}
        </Carousel>
      </div>
    );
  }
}
