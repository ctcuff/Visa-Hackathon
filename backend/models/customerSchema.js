const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

customerSchema.plugin(uniqueValidator);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
