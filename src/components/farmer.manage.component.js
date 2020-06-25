import React, { Component } from 'react';

export default class FarmerManage extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      itemname: ''
    }
  }

  handleItemnameChange = (event) => {
    this.setState({
      itemname: event.target.value
    })
  }
  
  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <form>
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
              type='text' pattern="/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/"
              value={this.state.price}
              onChange={this.handlePriceChange}
              />
          
          <div>
            <label>Category</label>
            <select>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}
