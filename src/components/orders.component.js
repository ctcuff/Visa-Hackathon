
import React, { Component } from 'react';
import '../styles/orders.css';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import User from '../util/user.js';

const farmerName = User.getUsername();

class ItemsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    const itemIds = this.props.itemIds;

    console.log(JSON.stringify(itemIds, null, 3));

    if (!itemIds || itemIds.length === 0) {
      return;
    }

    itemIds.forEach(id => {
      axios.get(`http://localhost:5000/items/${id}`)
        .then(res => {
          this.setState({
            products: this.state.products.concat(res.data)
          })
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <BootstrapTable data={this.state.products}>
        <TableHeaderColumn dataField='item' isKey={true}>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
        <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
      </BootstrapTable>
    );
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
      <ItemsTable itemIds={row.listOfItems} />
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? '(-)' : '(+)' );
    } else {
      content = ' ';
    }
    return (
      <div> { content } </div>
    );
  }

  fetchOrders() {
    axios.get(`http://localhost:5000/orders/${farmerName}`)
    .then(res => {
      this.setState({
        orders: res.data,
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
    const options = {
      expandRowBgColor: 'rgb(222, 237, 255)'
    };

    return (
      <div class="container">
      <h1 className="orders-heading">Orders</h1>
         <BootstrapTable data={ this.state.orders } options={options} expandableRow={this.isExpandableRow}
         expandComponent={this.expandComponent} expandComponent={ this.expandComponent }
         expandColumnOptions={ {
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent,
          columnWidth: 50
        }}>
           <TableHeaderColumn dataField='_id' isKey={true}>Order ID</TableHeaderColumn>
           <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
           <TableHeaderColumn dataField='totalPrice'>Total Price</TableHeaderColumn>
           <TableHeaderColumn dataField='customerUsername'>Customer Username</TableHeaderColumn>
         </BootstrapTable>
      </div>
    )
  }
}
