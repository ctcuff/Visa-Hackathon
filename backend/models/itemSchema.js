const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: {type: String , required: true },
    price: { type: mongoose.Number , required: true },
    category: { type: String , required: true },
    item: {type:String, required: true},
    time : { type : Date, default: Date.now }
  });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
