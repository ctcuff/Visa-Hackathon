const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    vendorUsername: {type: String , required: true },
    customerUsername: {type: String, required: true},
    totalPrice: { type: mongoose.Number , required: true },
    listOfItems: {type: Array},
    time : { type : Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
