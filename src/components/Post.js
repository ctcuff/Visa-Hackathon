import React, { Component } from "react";
import '../styles/item.css';
import { Link } from "react-router-dom";

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
                <div className="Post-farmer"> 
                  <Link 
                    to={{
                      pathname: '/farm',
                      query: { farm: farm }
                    }}
                  >
                    {farm}
                  </Link>
                </div>
                <h2 className="Post-status" style={{color: status === true ? "green" : "red"}}> 
                  In Stock: {status} 
                </h2>
                <p class="price"> ${price} </p>
                
                <div className="Post-image"> 
                  <div className="Post-image-bg">
                    <img src={image} alt="Product Image" class="responsive"/>
                  </div>    
                </div>
                <div className="Post-caption">
                  <strong> {name}</strong>
                </div>
            </article>
          </div>
          
        );
    }
}