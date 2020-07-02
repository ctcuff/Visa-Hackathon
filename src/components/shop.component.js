import '../styles/shop.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from "react-router-dom";
import { Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import User from '../util/user';

function filterByValue(array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())));
}

export default class Shop extends Component {

  constructor(props) {
    super(props);

    this.searchInputRef = React.createRef();
    this.state = {
      total: 0,
      allProducts: [],
      // Contains a list of rows ids that can't be selected.
      // Any item that's not in stock can't be selected.
      unselectable: [],
      filteredProducts: [],
      cart: [],
      searchQuery: ''
    };
  }

  componentDidMount() {
    const farmerName =
      this.props.location &&
      this.props.location.searchProps &&
      this.props.location.searchProps.farmerName;

    axios
      .get('http://localhost:5000/items')
      .then(res => {
        const outOfStockItems = [];

        res.data.forEach(entry => {
          if (entry.inStock.toLowerCase() === 'false') {
            outOfStockItems.push(entry._id);
          }
        });

        if (farmerName) {
          this.setState({
            allProducts: res.data,
            filteredProducts: res.data.filter(entry => {
              return entry.vendorUsername.toLowerCase().includes(farmerName.toLowerCase());
            }),
            unselectable: outOfStockItems
          });
        } else {
          this.setState({
            allProducts: res.data,
            filteredProducts: res.data,
            unselectable: outOfStockItems
          });
        }
      });
  }

  onSearchItem = (event) => {
    event.preventDefault();
    const searchQuery = this.searchInputRef.current.value.toLowerCase();

    // Find all the items the user searched for
    const products = this.state.allProducts.filter(entry => {
      return (
        entry.item.toLowerCase().includes(searchQuery) ||
        entry.vendorUsername.toLowerCase().includes(searchQuery)
      );
    });

    // Find every item that's out of stock and grab its id
    // so the table knows what can't be selected
    const unselectable = products
      .filter(entry => entry.inStock.toLowerCase() === 'false')
      .map(entry => entry._id);

    this.setState({
      filteredProducts: products,
      unselectable
    });
  }

  CellFormatter(cell, row) {
    return (
      <div>
        <Link
          to={{
            pathname: '/item',
            query: {
              order: row._id,
              name: row.item,
              price: row.price,
              farm: row.vendorUsername,
              status: row.inStock.toString()
            }
          }}
        >
         {cell}
        </Link>
      </div>
    );
  }

  VendorFormatter(cell, row) {
    return (
      <div>
        <Link
          to={{
            pathname: '/farm',
            query: { farm: row.vendorUsername }
          }}
        >
          {cell}
        </Link>
      </div>
    );
  }

  priceFormat = (cell, row) => {
    return (
      <div>
        ${cell.toFixed(2)}
      </div>
    );
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
        cart: this.state.cart.concat(cartItem)
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
      paginationPosition: 'top',
      noDataText: 'No Products Match Your Search'
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
        <Form inline onSubmit={this.onSearchItem}>
          <FormControl type="text" placeholder="Product name or farm" className="mr-sm-2" ref={this.searchInputRef} />
          <Button variant="outline-success" onClick={this.onSearchItem}>Search</Button>
        </Form>
        <BootstrapTable
          data={this.state.filteredProducts}
          selectRow={selectRowProp}
          options={tableOptions}
          className="shop-table"
          pagination
          hover
        >

          <TableHeaderColumn dataField="_id" isKey dataSort={true} hidden>
          Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="item" dataFormat={this.CellFormatter} dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="category" dataSort={true} >
            Category
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" dataSort={true} dataFormat={this.priceFormat}>
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn dataField="vendorUsername" dataFormat={this.VendorFormatter} dataSort={true}>
            Farm Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="inStock" dataSort={true}>
            In Stock
          </TableHeaderColumn>
        </BootstrapTable>
        <div className="shop-checkout">
          <h1>Total: ${this.state.total.toFixed(2)}</h1>
            <Link to={linkProps}>
              <Button disabled={this.state.total === 0 || !User.isLoggedIn()}>
                {User.isLoggedIn() ? 'Checkout' : 'Please sign in'}
              </Button>
            </Link>
        </div>
      </div>
    );
  }
}
