import React, { Component } from 'react';
//import CurrencyInput from 'react-currency-input';

export default class FarmerManage extends Component {
  getInitialState() {
    return ({price: "0.00"});
  }

  constructor(props) {
    super(props)

    this.state = {
      itemname: '',
      price: '0.00',
      category: ''
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

  // POST request can use this information
  handleSubmit = event => {
    alert(`${this.state.itemname} ${this.state.price} ${this.state.category}`)
    // this prevents the form from resetting text after submission
    event.preventDefault()
  }


  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <form onSubmit={this.handleSubmit}>
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
