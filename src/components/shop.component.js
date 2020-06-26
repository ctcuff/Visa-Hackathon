import React, { Component } from 'react';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';

const products = [];
for (let i = 0; i < 46; i++) {
  products.push({
    id: i, 
    name: 'Strawberries', 
    price: '0.50', 
    farm: 'Bob ${i}', 
    status: 'in stock'
  });
}

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}, {
  dataField: 'farm',
  text: 'Local Farm', 
  sort: true
}, {
  dataField: 'status',
  text: 'Product Status'
}
];

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
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

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    return (
      <div>
        <p>Browse for groceries</p>
        <BootstrapTable data={ products } selectRow={ selectRowProp }>
          <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField='farm'>Farm Name</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Product Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
