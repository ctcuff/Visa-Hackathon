import React, { Component } from 'react';
import { BootstrapTable , TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Change farmer name to the username of the vendor
const farmerName = 'johnapple'

const cellEditProp = {
  mode: 'dbclick'
};

export default class FarmerManage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      item: '',
      price: '0.00',
      category: 'vegetable',
      inStock: true,
      toDelete: [],
    }
  }

  fetchItems() {
    axios.get('http://localhost:5000/items')
    .then(res => {

      const filteredProducts = res.data.filter(entry => {
        return entry.vendorUsername == farmerName;
      });

      this.setState({
        products: filteredProducts,
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.fetchItems()
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
/*
  handleNewPriceChange = event => {
    this.setState({
      newPrice: event.target.value
    })
  }
*/
  handleDeleteButtonClick = (onClick) => {
    onClick();
  }

  handleDeleteItems = (selectRow, rows) => {
      //let total = 0;
      //const toDelete = [];

      // All rows were selected so add every item to the cart
      if (selectRow) {
        rows.forEach(row => {
          //total += row.price;
          /*cartItems.push({
            itemName: row.item,
            vendorUsername: row.vendorUsername,
            itemId: row._id,
            price: row.price
          });*/
        console.log(row._id)
        axios.delete("http://localhost:5000/items", {
          params: { id: row._id }
        }).then(response => {
          console.log(response);
        });
      });
      this.fetchItems()
    }
  }

  createCustomDeleteButton = (onClick) => {
    return (
      <DeleteButton
        btnText='Remove Item(s)'
        btnContextual='btn-success'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        //onClick={ e => this.handleDeleteButtonClick(onClick) }/>
        onClick={ e => this.handleDeleteItems(selectRow, rows) }/>
    );
  }

  // Allow the vendor to add an item
  handleSubmitAdd = event => {
    event.preventDefault()
    const databody = {
      vendorUsername: farmerName,
      price: this.state.price,
      category: this.state.category,
      item: this.state.itemname,
      inStock: true
    }

    axios.post('http://localhost:5000/items/create', databody)
      .then((res) => {
        console.log(res.data)
        this.fetchItems()
      }).catch((error) => {
        console.log(error)
      });

    alert(`Name: ${this.state.itemname}\nPrice: ${this.state.price}\nCategory: ${this.state.category}`)
  }

  // Allow vendor to make changes to the item name, category, price, and change whether or not the item is in stock
  handleSubmitEdit = event => {
    alert(`Stock: ${this.state.stock}\nNew Price: ${this.state.newPrice}\nIn Stock: ${this.state.inStock}`)
    event.preventDefault()
  }


  render() {
    const options = {
      deleteBtn: this.createCustomDeleteButton
    };

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true  // enable click to select
    };

    return (
      <div className="container">
        <h1>Manage Items</h1>
        <Tabs>
          <TabList>
            <Tab>View and Change Items</Tab>
            <Tab>Add Items</Tab>
          </TabList>
            <TabPanel>
              <div>
                <BootstrapTable selectRow={selectRowProp} data={ this.state.products } options={options} pagination cellEdit={cellEditProp} deleteRow>
                  <TableHeaderColumn dataField='item' isKey={true} dataSort={ true }>Product Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='category' dataSort={ true }>Category</TableHeaderColumn>
                  <TableHeaderColumn dataField='price' dataSort={ true }>Product Price</TableHeaderColumn>
                  <TableHeaderColumn dataField='inStock' dataSort={ true }>In Stock</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </TabPanel>
            <TabPanel>
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
            </TabPanel>
        </Tabs>
      </div>
    )
  }
}
