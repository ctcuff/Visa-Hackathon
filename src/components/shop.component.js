import '../styles/shop.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class Shop extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      products: [],
      // Contains a list of rows ids that can't be selected.
      // Any item that's not in stock can't be selected.
      unselectable: [],
      cart: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/items')
      .then(res => {
        const outOfStockItems = [];

        res.data.forEach(entry => {
          if (!entry.inStock) {
            outOfStockItems.push(entry._id);
          }
        });

        this.setState({ 
          products: res.data,
          unselectable: outOfStockItems
        });
      });
  }

  CellFormatter(cell, row) {
    return (<div><Link to={{
      pathname: '/item',
      query: { order: row._id, name: row.item, price: row.price, farm: row.vendorUsername, status: row.inStock.toString() }
    }}>{cell}</Link></div>);
  }

  VendorFormatter(cell, row) {
    return (<div><Link to={{
      pathname: '/farm',
      query: { farm: row.vendorUsername }
    }}>{cell}</Link></div>);
  }


  onSelectRow = (row, isSelected, e) => {
    const cartItem = {
      itemName: row.item,
      vendorUsername: row.vendorUsername,
      itemId: row._id,
      price: row.price
    };
  
    if (isSelected) {
      this.setState({ 
        total: this.state.total + row.price,
        cart: [...this.state.cart, cartItem]
      })
    } else {
      // An item was unselected, so remove it from the
      // cart by filtering it out based in the row's ID
      this.setState({ 
        total: this.state.total - row.price,
        cart: this.state.cart.filter(cartItem => cartItem.itemId !== row._id)
      })
    }
  }; 

  onSelectAllRows = (isSelected, rows) => {
    let total = 0;
    const cartItems = [];

    // All rows were selected so add every item to the cart
    if (isSelected) {
      rows.forEach(row => {
        total += row.price;
        cartItems.push({
          itemName: row.item,
          vendorUsername: row.vendorUsername,
          itemId: row._id,
          price: row.price
        });
      });
    }

    this.setState({ 
      total,
      cart: cartItems
    });
  }

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      onSelectAll: this.onSelectAllRows,
      unselectable: this.state.unselectable
    };

    const tableOptions = {
      paginationPosition: 'top'
    };

    // This allows us to pass in the current total
    // and what items the user has in their cart when
    // the /payment route is visited
    const linkProps = {
      pathname: '/payment',
      paymentProps: {
        total: this.state.total,
        cart: this.state.cart
      }
    };

    return (
      <div className="container shop">
        <h1 className="shop-header">Browse for groceries</h1>
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          options={tableOptions}
          className="shop-table"
          pagination
          hover
        >
          <TableHeaderColumn dataField="_id" isKey dataSort={true}>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="item" dataFormat={this.CellFormatter} dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" dataSort={true}>
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn dataField="vendorUsername" dataFormat={this.VendorFormatter} dataSort={true}>
            Farm Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="inStock" dataSort={true}>
            Product Status
          </TableHeaderColumn>
        </BootstrapTable>
        <div className="shop-checkout">
          <h1>Total: ${this.state.total.toFixed(2)}</h1>
            <Link to={linkProps}>
              <Button disabled={this.state.total === 0}>Checkout</Button>
            </Link>
        </div>
      </div>
    );
  }
}
