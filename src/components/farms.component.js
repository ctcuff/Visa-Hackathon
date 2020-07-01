import '../styles/farms.css';
import React, { Component } from 'react';
import { Button, Carousel, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Farm1 from '../assets/Farm1.jpeg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';
import { Link } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';


const placeHolderImages = [Farm1, Farm2, Farm3];

export default class Farms extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vendors: [],
      radius: 50,
      searchValue: '',
      currentLocation: {
        lat: 0.0,
        lng: 0.0
      }
    };
  }

  handleSearchValueChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleRadiusValueChange = (event) => {
    this.setState({ radius: event.target.value });
  };
  
  queryMerchants = (event) => {
    event.preventDefault();
    const latitude = this.state.currentLocation.lat;
    const longitude = this.state.currentLocation.lng;
    const search = this.state.searchValue;
    const radius = this.state.radius;

    const postData = {
      latitude, 
      longitude, 
      search, 
      radius
    };

    console.log(postData)
    // const data = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(postData)
    // };

    axios.post('http://localhost:5000/locater/', postData)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('Error: ' + res.error);
          return;
        }
        console.log('hi')
        console.log(res)
      })
      .catch(err => alert('Error: ' + err));
  }

  browseFarmer(name) {
    return {
      pathname: '/shop',
      searchProps: {
        farmerName: name
      }
    }
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
        <Form inline onSubmit={this.queryMerchants}>
          <Form.Group> 
            <RangeSlider
              value={Number(this.state.radius)}
              onChange={this.handleRadiusValueChange}
              tooltipPlacement='top'
              min={20}
              max={100}
            />
          </Form.Group>
          <FormControl type="text" placeholder="Franchise Example" className="mr-sm-2" onChange={this.handleSearchValueChange} />
          <Button variant="outline-success" onClick={this.queryMerchants}>Search</Button>
        </Form>
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
