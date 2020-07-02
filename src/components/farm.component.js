import React, { Component } from "react";
import Post from './Post';
import axios from 'axios';
import '../styles/farm.css';
import Farm1 from '../assets/Farm1.jpg';
import Farm2 from '../assets/Farm2.jpg';
import Farm3 from '../assets/Farm3.jpg';
import Farm4 from '../assets/Farm4.jpg';
import Farm5 from '../assets/Farm5.jpg';
import StarRatings from 'react-star-ratings';
import { Button, Form } from 'react-bootstrap';


const arrImages = [Farm1, Farm2, Farm3, Farm4, Farm5];

export default class Farm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          farm: "",
          vendors: []
        };
    }
    componentDidMount() {
      if (this.props.location.query !== undefined) {
        const farmerName = this.props.location.query.farm
        axios.get('http://localhost:5000/vendors')
          .then(response => {
            // this.setState({vendors: response.data})
            const filteredProducts = response.data.filter(entry => {
            return entry.username.toUpperCase() == farmerName.toUpperCase();
            });
            this.setState({ vendors: filteredProducts });
          })
          .catch(err => console.error(err));
      } else {
        window.location.replace("../shop");
      }
    }

    changeRating( newRating, name ) {
      alert("Rating functionality yet to come! You rated product: " + newRating + " stars.")
    }
    
    onComment = (event) => {
      event.preventDefault();
      alert("Comment functionality yet to come! We will make sure to let our farmers know what you think!")
    }
    
    render() {
        const randomstars = (Math.random() * (5.00))
        const randomNum = Math.floor(Math.random() * arrImages.length)
        //let object = this.state.vendors.find(x => x.name === this.state.farm);
        //let object = this.state.vendors.find((vendor, index) => vendor.vendorUsername === this.state.farm)
        return (
            <div className="container">
              <article className="Post" ref="Post">
                {this.state.vendors.map((vendor, index) => (
                    <body>
                        <div className="Farmer-info"> 
                          <h1> {vendor.username} </h1>
                          <h3> {vendor.company} </h3>
                          <h5> {vendor.address.city}, {vendor.address.state} </h5>
                        </div>
                    </body>
                ))}
                <p> {this.state.farm}</p>
                <div className="Farmer-image"> 
                  <div className="Farmer-img-bg"> 
                    <img
                    className="farm-img"
                    src={arrImages[randomNum]}
                    alt={"Image of Farm"}
                  />
                  </div>
                </div>
                <div className="Farmer-stars">
                  <StarRatings
                    rating={randomstars}
                    starRatedColor="black"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="25px"
                    starSpacing="10px"
                  />
                </div>
                <div className="Farmer-comment">
                <Form> 
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Leave a comment!</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                  <Button onClick={this.onComment}> Submit </Button>
                </Form>
                </div>
              </article>
            </div>
        )
    }
}
