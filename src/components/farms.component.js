import '../styles/farms.css';
import React, { Component, useState } from 'react';
import { Button, Carousel, Form, FormControl, Toast } from 'react-bootstrap';
import axios from 'axios';
import Farm1 from '../assets/Farm1.jpg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';
import Farm4 from '../assets/Farm4.jpg';
import Farm5 from '../assets/Farm5.jpg';
import { Link } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';


const placeHolderImages = [Farm1, Farm2, Farm3, Farm4, Farm5];

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
    alert("Your search is for " + this.state.searchValue + " in a radius of " + this.state.radius 
          + " miles of \nLatitude: " + this.state.currentLocation.lat.toFixed(2) 
          + "\nLongitude: " + this.state.currentLocation.lng.toFixed(2))
    const latitude = this.state.currentLocation.lat;
    const longitude = this.state.currentLocation.lng;
    const search = this.state.searchValue;
    const radius = this.state.radius;

    const postData = {
      //latitude, 
      //longitude, 
      name: search, 
      //distance: radius
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
      //.then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('Error: ' + res.error);
          return;
        }
        this.setState({ vendors: res.data});
        if(!res.data){
          alert("No farms match your search criteria");
        }
        // axios.get('http://localhost:5000/locater/')
        //   .then(res => {
        //     console.log(res)
        //   })
        //   .catch(err => alert('Error: ' + err));
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
    // axios.get('http://localhost:5000/vendors')
    //   .then(response => {
    //     this.setState({ vendors: response.data });
    //   })
    //   .catch(err => console.error(err))
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
    const styles = {
      center: {
        marginLeft: "auto",
        marginRight: "auto"
      }
    }

    // const [showA, setShowA] = useState(true);
    // const toggleShowA = () => setShowA(!showA);
    const vendors = this.state.vendors || []
    return (
      <div>
        <p> Due to the limitations of data in Sandbox, we fix the Merchant Locator query to a 50 mile radius of the San Francisco Area </p>
        <p> We recommend searching "Starbucks" </p>
        <div className="text-center"> 
          <Form className="text-center" inline onSubmit={this.queryMerchants}>
            <Form.Label>
              Customize Search Radius
            </Form.Label>
            <Form.Group> 
              <RangeSlider
                value={Number(this.state.radius)}
                onChange={this.handleRadiusValueChange}
                tooltipPlacement='top'
                min={20}
                max={100}
              />
            </Form.Group>
            <Form.Group> 
              <FormControl type="text" placeholder="Franchise Example" className="mr-sm-2" onChange={this.handleSearchValueChange} />
              <Button variant="outline-success" onClick={this.queryMerchants}>Search</Button>
            </Form.Group>
          </Form>
        </div>
        <Carousel>
        {vendors.map((vendor, index) => (
          <Carousel.Item key={index}>
              <img
                className="farm-carousel-img"
                src={placeHolderImages[index % placeHolderImages.length]}
                alt={vendor.distance}
              />
              <Carousel.Caption>
                <h3> {vendor.responseValues.visaStoreName}</h3>
                <p>{vendor.responseValues.distance}iles away</p>
                <p> 
                  {vendor.responseValues.merchantStreetAddress} {vendor.responseValues.merchantCity}, 
                  {vendor.responseValues.merchantState} {vendor.responseValues.merchantPostalCode.substring(0,5)}</p>
                <Link to={this.browseFarmer(vendor.responseValues.visaStoreName)}>Browse Products</Link>
              </Carousel.Caption>
            </Carousel.Item>
        ))}
        
        </Carousel>
        
      </div>
    );
  }
}
