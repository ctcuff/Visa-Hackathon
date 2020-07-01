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
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.fetchOrders()
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
