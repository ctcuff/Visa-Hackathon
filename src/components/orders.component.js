
import React, { Component } from 'react';
import '../styles/orders.css';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import User from '../util/user.js';
import { Link } from 'react-router-dom';

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

  priceCellFormatter(cell) {
    return <div>${cell}</div>;
  }

  render() {
    return (
      <BootstrapTable data={this.state.products}>
        <TableHeaderColumn dataField='item' isKey={true}>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
        <TableHeaderColumn dataField='price' dataFormat={this.priceCellFormatter}>
          Price
        </TableHeaderColumn>
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
    const route = User.isMerchant() ? 'vendor' : 'customer';

    axios.get(`http://localhost:5000/orders/${route}/${farmerName}`)
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

  priceCellFormatter(cell) {
    return <div>${cell}</div>;
  }

  timeCellFormatter(cell) {
    const date = new Date(cell);
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return <div>{day} - {time}</div>
  }

  render() {
    const options = {
      expandRowBgColor: 'rgb(222, 237, 255)'
    };

    if (!User.isLoggedIn()) {
      return(
        <div className="container">
          <p className="orders-log-in-message">
            You need to <Link to="/account">log in</Link> to view your orders.
          </p>
        </div>
      );
    }

    return (
      <div className="container">
      <h1 className="orders-heading">Orders</h1>
         <BootstrapTable 
          data={this.state.orders} 
          options={options} 
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent} 
          expandColumnOptions={ {
            expandColumnVisible: true,
            expandColumnComponent: this.expandColumnComponent,
            columnWidth: 50
        }}>
           <TableHeaderColumn dataField='_id' isKey={true}>Order ID</TableHeaderColumn>
           <TableHeaderColumn dataField='time' dataFormat={this.timeCellFormatter}>
             Time
            </TableHeaderColumn>
           <TableHeaderColumn dataField='totalPrice' dataFormat={this.priceCellFormatter}>
             Total Price
             </TableHeaderColumn>
           <TableHeaderColumn dataField='customerUsername'>Customer Username</TableHeaderColumn>
         </BootstrapTable>
      </div>
    )
  }
}
