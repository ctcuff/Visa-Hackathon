import React, { Component } from 'react';
import '../styles/orders.css';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import User from '../util/user.js';

//const farmerName = User.getUsername();
const farmerName = 'johnapple';

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      listItemIDs: [],
    }
  }

  fetchOrders() {
    axios.get('http://localhost:5000/orders')
    .then(res => {
      const filteredOrders = res.data.filter(entry => {
        return entry.vendorUsername == farmerName;
      });

      this.setState({
        orders: filteredOrders,
      });

      this.state.orders.forEach((order, i) => {
        console.log(order);
        const orderItems = [];
        order.listOfItems.forEach((item, j) => {
          console.log(item);
          axios.get(`http://localhost:5000/items/${item}`)
          .then(res => {
            console.log(res.data);
            orderItems.push(res.data)
          });
        });
        this.state.listItemIDs.push(orderItems);
      });
      console.log(this.state.listItemIDs);
    })
    .catch(error => {
      console.log(error);
    })
  }

  /*fetchItemsInOrders() {
    console.log("hello")
    console.log(this.state.orders);
    this.state.orders.forEach((order, i) => {
      console.log(order);
      const orderItems = [];
      order.listOfItems.forEach((item, j) => {
        console.log(item);
        axios.get('http://localhost:5000/items/${item}')
        .then(res => {
          console.log(res);
          orderItems.push(res)

        });
      });
      this.state.listItemIDs.push(orderItems);
    });*/


  //}

  componentDidMount() {
    this.fetchOrders()
    //this.fetchItemsInOrders()
  }

  render() {
    return (
      <div class="container">
       <h1 className="orders-heading">Orders</h1>

         <BootstrapTable data={ this.state.orders } pagination>
           <TableHeaderColumn dataField='_id' isKey={true}>Order ID</TableHeaderColumn>
           <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
           <TableHeaderColumn dataField='totalPrice'>Total Price</TableHeaderColumn>
           <TableHeaderColumn dataField='customerUsername'>Customer Username</TableHeaderColumn>
         </BootstrapTable>


      </div>

    )
  }
}
