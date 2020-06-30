import '../styles/farms.css';
import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Farm1 from '../assets/Farm1.jpeg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';
import { Link } from 'react-router-dom';


const placeHolderImages = [Farm1, Farm2, Farm3];

export default class Farms extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: [],
      currentLocation: {
        lat: 0.0,
        lng: 0.0
      }
    };
  }
  
  browseFarmer(name) {
    return {pathname: '/shop', searchProps: { searchTerm: name}}
  }

  componentDidMount() {
    axios.get('http://localhost:5000/vendors')
      .then(response => {
        this.setState({ vendors: response.data });
      })
      .catch(err => console.error(err))
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      } else {
        //todo
      }
  }

  render() {
    return (
      <div>
        <p> Latitude: {this.state.currentLocation.lat} </p> 
        <p> Longitude: {this.state.currentLocation.lng} </p> 
        <Carousel>
        {this.state.vendors.map((vendor, index) => (
          <Carousel.Item key={index}>
              <img 
                className="farm-carousel-img" 
                src={placeHolderImages[index % placeHolderImages.length]}
                alt={vendor.name}
              />
              <Carousel.Caption>
                <h3>{vendor.username}</h3>
                <p> {vendor.company} </p>
                <p>{vendor.address.city}, {vendor.address.state}</p>
                <Link to={this.browseFarmer(vendor.username)}>Browse Products</Link>
              </Carousel.Caption>
            </Carousel.Item>
        ))}
        </Carousel>
      </div>
    );
  }
}
