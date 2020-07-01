import React, { Component } from "react";
import '../styles/item.css';

export default class Post extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const order = this.props.order;
        const name = this.props.name;
        const price = this.props.price;
        const image = this.props.image;
        const farm = this.props.farm;
        const status = this.props.status;

        return (
          <div classname = "Product"> 
            <article className="Post" ref="Post">
                <ul> 
                  <li> Order ID: {order}</li>
                  <li> {name} </li> 
                  <li> ${price}</li>
                  <li> {farm} </li>
                  <li> {status} </li>
                </ul>
                <img src={image} alt="../assets/Carrot.jpg" class="responsive"/>
            </article>
          </div>
          
        );
    }
}