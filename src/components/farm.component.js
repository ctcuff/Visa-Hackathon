import React, { Component } from "react";
import Post from './Post';
import axios from 'axios';

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
        //this.setState({ farm: this.props.location.query.farm});

        //this.setState({ selected: this.state.vendors[0]})
        //this.setState({ selected: this.state.vendors.find(x => x.name === this.state.farm)})
    }
    render() {
        //let object = this.state.vendors.find(x => x.name === this.state.farm);
        //let object = this.state.vendors.find((vendor, index) => vendor.vendorUsername === this.state.farm)
        return (
            <div className="container">
                {this.state.vendors.map((vendor, index) => (
                    <body>
                        <h2> {vendor.username} </h2>
                        <h3> {vendor.company} </h3>
                        <h5> {vendor.address.city}, {vendor.address.state} </h5>
                    </body>
                ))}
                <p> {this.state.farm}</p>
                <h3> Three </h3>
                <ul>
                    <li> One </li>
                    <li> Two </li>
                </ul>
            </div>
        )
    }
}
