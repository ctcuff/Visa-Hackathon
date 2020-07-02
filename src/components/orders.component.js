
import React, { Component } from 'react';
import '../styles/orders.css';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import User from '../util/user.js';

//const farmerName = User.getUsername();
const farmerName = 'johnapple';

class ItemsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.data) {
      console.log("hello")
      console.log(this.props.listItemIDs)
        return (
          <BootstrapTable data={this.props.listItemIDs}>
            <TableHeaderColumn dataField='item' isKey={true}>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
          </BootstrapTable>
        );
    } else {
      return (<p>?</p>);
    }
  }
}

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      orderItems: [],
      listItemIDs: [],
    }
  }

  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
      <ItemsTable data={ row.expand } />
    );
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
        //console.log(order);

        order.listOfItems.forEach((item, j) => {
          //console.log(item);
          axios.get(`http://localhost:5000/items/${item}`)
          .then(res => {
            //console.log(res.data);
            this.setState({
              orderItems: this.state.orderItems.concat(res.data)
            })
            //orderItems.push(res.data)
          });
        });
        this.setState({
          listItemsIDs: this.state.listItemIDs.concat(this.state.orderItems)
        })
        //this.state.listItemIDs.concat(orderItems);
      });
      /*console.log("first hello")
      console.log(this.state.listItemIDs);
      /*this.setState({
        listItemIDs: this.state.listItemIDs,
      });*/


    })
    .catch(error => {
      console.log(error);
    })
    console.log("hello again")
    console.log(this.state.listItemIDs);

  }

  componentDidMount() {
    this.fetchOrders()
  }

  render() {

    const options = {
      expandRowBgColor: 'rgb(222, 237, 255)'
    };


    return (


      <div class="container">
        <div>
        <ItemsTable listItemIDs={this.state.listItemIDs}/>
        </div>
       <h1 className="orders-heading">Orders</h1>

         <BootstrapTable data={ this.state.orders } options={options} expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: true}}>
           <TableHeaderColumn dataField='_id' isKey={true}>Order ID</TableHeaderColumn>
           <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
           <TableHeaderColumn dataField='totalPrice'>Total Price</TableHeaderColumn>
           <TableHeaderColumn dataField='customerUsername'>Customer Username</TableHeaderColumn>
         </BootstrapTable>

         <BootstrapTable data={this.state.listItemIDs}>
           <TableHeaderColumn dataField='item' isKey={true}>Product Name</TableHeaderColumn>
           <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
           <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
         </BootstrapTable>

      </div>

    )
  }
}
