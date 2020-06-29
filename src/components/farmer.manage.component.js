import React, { Component } from 'react';
import { BootstrapTable , TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import axios from 'axios';

const cellEditProp = {
  mode: 'dbclick'
};

/*
componentDidMount() {
  axios.get('http://localhost:5000/items')
};
*/


const products = [];
products.push({
  name: 'Apples',
  price: '0.50',
  category: 'fruit',
  inStock: true
});

products.push({
  name: 'Bananas',
  price: '0.50',
  category: 'fruit',
  inStock: true
});

products.push({
  name: 'Carrots',
  price: '0.50',
  category: 'vegetable',
  inStock: true
});


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
  dataField: 'category',
  text: 'Category',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true
}, {
  dataField: 'inStock',
  text: 'In Stock'
}];

let order = 'desc';

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};


export default class FarmerManage extends Component {
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


  getInitialState() {
    return ({price: "0.00"});
  }

  constructor(props) {
    super(props)

    this.state = {
      itemname: '',
      price: '0.00',
      category: 'vegetable',
      newPrice: '0.00',
      stock: true,
      remove: 'keep'
    }
  }

  handleItemnameChange = event => {
    this.setState({
      itemname: event.target.value
    })
  }

  handlePriceChange = event => {
    this.setState({
      price: event.target.value
    })
  }

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value
    })
  }

  handleStockChange = event => {
    this.setState({
      stock: event.target.value
    })
  }

  handleNewPriceChange = event => {
    this.setState({
      newPrice: event.target.value
    })
  }

  handleRemoveChange = event => {
    this.setState({
      remove: event.target.value
    })
  }

  handleDeleteButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for DeleteButton click event');
    onClick();
  }

  createCustomDeleteButton = (onClick) => {
    return (
      <DeleteButton
        btnText='Remove Item(s)'
        btnContextual='btn-success'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ e => this.handleDeleteButtonClick(onClick) }/>
    );
  }

  // POST request can use this information
  handleSubmitAdd = event => {
    event.preventDefault()
    const databody = {
      vendorUsername: "johnapple",
      price: this.state.price,
      category: this.state.category,
      item: this.state.itemname,
      inStock: true
    }
    console.log("before fetch")

    axios.post('http://localhost:5000/items/create', databody)
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      });

    alert(`Name: ${this.state.itemname}\nPrice: ${this.state.price}\nCategory: ${this.state.category}`)
  }

  handleSubmitEdit = event => {
    alert(`Stock: ${this.state.stock}\nNew Price: ${this.state.newPrice}\nKeep or remove: ${this.state.remove}`)
    event.preventDefault()
  }

  render() {

    const options = {
      deleteBtn: this.createCustomDeleteButton
    };
    const selectRow = {
      mode: 'checkbox'
    };

    return (
      <div className="container">
        <h1>Manage Items</h1>

        <div>
        <h3>View and Change Items</h3>

          <div>
            <p>Browse for groceries</p>
            <BootstrapTable selectRow={selectRow} data={ products } options={options} pagination cellEdit={cellEditProp} deleteRow>
              <TableHeaderColumn dataField='name' isKey={true} dataSort={ true }>Product Name</TableHeaderColumn>
              <TableHeaderColumn dataField='category' dataSort={ true }>Category</TableHeaderColumn>
              <TableHeaderColumn dataField='price' dataSort={ true }>Product Price</TableHeaderColumn>
              <TableHeaderColumn dataField='inStock' dataSort={ true }>In Stock</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>

        <h3>Add Item</h3>
        <form onSubmit={this.handleSubmitAdd}>
          <div>
            <label>Item name</label>
            <input
              type='text'
              value={this.state.itemname}
              onChange={this.handleItemnameChange}
              />
          </div>

          <div>
            <label>Price</label>
            <input
              type='text' pattern='^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$'
              value={this.state.price}
              onChange={this.handlePriceChange}
              />
          </div>

          <div>
            <label>Category</label>
            <select value={this.state.category} onChange={this.handleCategoryChange} >
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
