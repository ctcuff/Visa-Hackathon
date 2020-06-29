import '../styles/shop.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const products = [];
const foods = [
  'Strawberries', 
  'Carrots',
  'Potatoes',
  'Lemons',
  'Corn',
  'Blueberries',
  'Oranges'
];

// Create a placeholder list of products with
// random prices, random foods, and a random in/out
// of stock status
for (let i = 0; i < 46; i++) {
  const randomPrice = Math.random() * 10
  products.push({
    id: i,
    name: foods[Math.floor(Math.random() * foods.length)],
    priceString: '$' + randomPrice.toFixed(2),
    price: randomPrice,
    farm: `Bob ${i}`,
    status: Math.random() >= 0.5 ? 'in stock' : 'out of stock'
  });
}

const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
      if (order === 'asc') {
        return b - a;
      }
      return a - b; // desc
    },
  },
  {
    dataField: 'name',
    text: 'Product Name',
    sort: true,
  },
  {
    dataField: 'price',
    text: 'Product Price',
    sort: true,
  },
  {
    dataField: 'farm',
    text: 'Local Farm',
    sort: true,
  },
  {
    dataField: 'status',
    text: 'Product Status',
  },
];

let order = 'desc';

export default class Shop extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    total: 0
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

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

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: this.onSelectRow
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
          data={products}
          selectRow={selectRowProp}
          options={tableOptions}
          pagination
          hover
          className="shop-table"
        >
          <TableHeaderColumn dataField="id" isKey dataSort={true}>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataFormat={this.CellFormatter} dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="priceString" dataSort={true}>
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn dataField="farm" dataSort={true}>
            Farm Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort={true}>
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
