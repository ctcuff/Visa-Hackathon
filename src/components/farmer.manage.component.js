import React, { Component } from 'react';
import { BootstrapTable , TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Change farmer name to the username of the vendor
const farmerName = 'johnapple'

const cellEditProp = {
  mode: 'click'
};


class PriceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = { price: props.defaultValue.price };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate({ amount: this.state.price });
  }
  render() {
    return (
      <span>
        <input
          ref='inputRef'
          className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
          style={ { display: 'inline', width: '50%' } }
          type='text'
          value={ this.state.price }
          onKeyDown={ this.props.onKeyDown }
          onChange={ (ev) => { this.setState({ price: parseInt(ev.currentTarget.value, 10) }); } } />

        <button
          className='btn btn-info btn-xs textarea-save-btn'
          onClick={ this.updateData }>
          save
        </button>
      </span>
    );
  }
}

const createPriceEditor = (onUpdate, props) => (<PriceEditor onUpdate={ onUpdate } {...props}/>);
/*
// Global variables to keep track of what cell the user clicked on
$('#sku-map-table').bootstrapTable({
    onClickCell: function (field, value, row, $element) {
        $rowIndex = $element.closest('tr').attr('data-index');
        $field = field;
    }
});

$(document).on('change', '.data-input', function(event) {
    $new_val = $(this).val();
    $('#sku-map-table').bootstrapTable('updateCell', {index: $rowIndex, field: $field, value: $new_val});
});
*/


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

  priceFormat(cell, row) {
    console.log(cell);
    return (
      <div>

        ${cell.toFixed(2)}
      </div>
    );
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
  handleUpdate = event => {
    const updatedItem = {
      vendorUsername: farmerName,
      price: this.state.price,
      category: this.state.category,
      item: this.state.itemname,
      inStock: true
    }
  }
  */
/*
  handleNewPriceChange = event => {
    this.setState({
      newPrice: event.target.value
    })
  }
*/
  handleDeleteButtonClick = (onClick) => {
    this.state.toDelete.forEach(itemID => {
      axios.delete(`http://localhost:5000/items/${itemID}`)
        .then(response => {
           console.log(response)
        })
      console.log(itemID);
    })

    onClick();
  }

  createCustomDeleteButton = (onClick) => {
    return (
      <DeleteButton
        btnText='Remove Item(s)'
        btnContextual='btn-success'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ e => this.handleDeleteButtonClick(onClick) }
        />
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

  // Called when a single row is selected/unselected
  onSelectRow = (row, isSelected, event) => {
    const selectedItemId = row._id;

    if (isSelected) {
      console.log(row._id)
      // An item was selected so add it to the list of items to be removed
      this.setState({

        toDelete: this.state.toDelete.concat(selectedItemId)
      })
    } else {
      // An item was unselected so remove it from the
      // array of items to delete
      this.setState({
        toDelete: this.state.toDelete.filter(id => id !== selectedItemId)
      })
    }
  }

  // Called when all rows are selected/unselected
  onSelectAllRows = (isSelected, rows) => {
    const rowsSelected = [];

    // If all rows were selected, mark all items for deletion.
    if (isSelected) {
      rows.forEach(row => {
        rowsSelected.push(row._id);
      })
    }

    // If all rows were unselected, the array of items
    // to delete will be reset to an empty array
    this.setState({
      toDelete: rowsSelected
    });
  }


  render() {
    const options = {
      deleteBtn: this.createCustomDeleteButton
    };

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,  // enable click to select
      onSelect: this.onSelectRow,
      onSelectAll: this.onSelectAllRows
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
                  <TableHeaderColumn dataField='category' editable={{type: 'select', options: {values: ['Vegetable', 'Fruit', 'Dairy', 'Meat', 'Other']}}}>Category</TableHeaderColumn>
                  <TableHeaderColumn dataField='price' dataFormat={this.priceFormat} customEditor={ { getElement: createPriceEditor}}>Product Price</TableHeaderColumn>
                  <TableHeaderColumn dataField='inStock' editable={ { type: 'select', options: { values: ['True','False'] } } }>In Stock</TableHeaderColumn>
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
                    <option value="other">Other</option>
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
