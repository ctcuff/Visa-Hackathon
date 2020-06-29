import React, { Component } from "react";
import Post from './Post';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          price: "",
          farm: "",
          status: "",
          image: null
        };
    }
    componentDidMount() {
        this.setState({ name: this.props.location.query.name,
                        price: this.props.location.query.price, 
                        farm: this.props.location.query.farm,
                        status: this.props.location.query.status})
        import("../assets/" + this.props.location.query.name + ".jpg").then((image) => {
            this.setState({ image: image.default });
        });
    }
    render() {
        return (
            <Post nickname={this.state.name} avatar="../assets/${this.state.name}.jpg" 
            caption="Moving the community!" image={this.state.image}/>
        )
    }
}