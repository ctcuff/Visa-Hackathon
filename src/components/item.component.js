import React, { Component } from "react";
import Post from './Post';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          price: "",
          farm: "",
          status: ""
        };
    }
    componentDidMount() {
        this.setState({ name: this.props.location.query.name,
                        price: this.props.location.query.price, 
                        farm: this.props.location.query.farm,
                        status: this.props.location.query.status})
    }
    render() {
        return (
            <Post nickname={this.state.name} avatar="https://www.laravelnigeria.com/img/chris.jpg" caption="Moving the community!" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />
        )
    }
}