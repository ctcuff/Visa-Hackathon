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
        axios.get('http://localhost:5000/vendors')
          .then(response => {
            this.setState({ vendors: response.data });
          })
          .catch(err => console.error(err))
        this.setState({ farm: this.props.location.query.farm})
        //this.setState({ selected: this.state.vendors[0]})
        //this.setState({ selected: this.state.vendors.find(x => x.name === this.state.farm)})
    }
    render() {
        //let object = this.state.vendors.find(x => x.name === this.state.farm);
        let obj = "HI!"
        const object = this.state.vendors[0]
        return (
            <div> 
                <p> {obj} </p>
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