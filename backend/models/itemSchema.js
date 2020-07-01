const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    vendorUsername: {type: String , required: true },
    price: { type: mongoose.Number , required: true },
    category: { type: String , required: true },
    item: {type: String, required: true},
    inStock : { type : String }
  });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
