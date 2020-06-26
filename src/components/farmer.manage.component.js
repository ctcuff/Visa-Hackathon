import React, { Component } from 'react';

export default class FarmerManage extends Component {
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
      stock: 'in stock',
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

  // POST request can use this information
  handleSubmitAdd = event => {
    alert(`Name: ${this.state.itemname}\nPrice: ${this.state.price}\nCategory: ${this.state.category}`)
    // this prevents the form from resetting text after submission
    event.preventDefault()
  }

  handleSubmitEdit = event => {
    alert(`Stock: ${this.state.stock}\nNew Price: ${this.state.newPrice}\nKeep or remove: ${this.state.remove}`)
    event.preventDefault()
  }




  render() {
    return (
      <div className="container">
        <h1>Manage Items</h1>

        <form onSubmit={this.handleSubmitEdit}>
        <div>
        <h3>View and Change Items</h3>
          <p>display each item here after querying</p>



            <div>
              <label>In Stock/Out of Stock</label>
              <select value={this.state.stock} onChange={this.handleStockChange} >
                <option value="in stock">In Stock</option>
                <option value="out of stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label>Change Price</label>
              <input
                type='text' pattern='^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$'
                value={this.state.newPrice}
                onChange={this.handleNewPriceChange}
                />
            </div>

            <div>
              <label>Remove Item</label>
              <select value={this.state.remove} onChange={this.handleRemoveChange} >
                <option value="keep">Keep</option>
                <option value="remove">Remove</option>
              </select>
            </div>

            <button type="submit">Submit</button>
        </div>
        </form>




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
