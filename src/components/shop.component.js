import '../styles/shop.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
  products.push({
    id: i,
    name: foods[Math.floor(Math.random() * foods.length)],
    price: '$' + (Math.random() * 10).toFixed(2),
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

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true
};

const tableOptions = {
  paginationPosition: 'top'
};

export default class Shop extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
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

  render() {
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
          <TableHeaderColumn dataField="name" dataSort={true}>
            Product Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" dataSort={true}>
            Product Price
          </TableHeaderColumn>
          <TableHeaderColumn dataField="farm" dataSort={true}>
            Farm Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort={true}>
            Product Status
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
