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
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      total: 0,
      products: [],
      // Contains a list of rows ids that can't be selected.
      // Any item that's not in stock can't be selected.
      unselectable: []
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
      query: { name: row.name, price: row.price, farm: row.farm, status: row.status }
    }}>{cell}</Link></div>);
  }

  onSelectRow = (row, isSelected, e) => {
    if (isSelected) {
      this.setState({ total: this.state.total + row.price })
    } else {
      this.setState({ total: this.state.total - row.price })
    }
  }; 

  onSelectAllRows = (isSelected, rows) => {
    let total = 0;

    if (isSelected) {
      rows.forEach(row => {
        total += row.price
      })
    }

    this.setState({ total });
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

    // Lets us go to the /payment route passing in
    // the current total as a prop to the payment component
    const linkProps = {
      pathname: '/payment',
      priceProps: {
        amount: this.state.total
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
          <TableHeaderColumn dataField="vendorUsername" dataSort={true}>
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
