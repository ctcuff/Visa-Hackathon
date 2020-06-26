import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

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
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}, {
  dataField: 'farm',
  text: 'Local Farm'
}, {
  dataField: 'status',
  text: 'Product Status'
}
];

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
        <BootstrapTable keyField='id' data={ products } columns={ columns } />
      </div>
    )
  }
}
