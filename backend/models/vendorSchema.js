const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  company: {type: String, required: true},
  address: {
      street: {type: String, required: true},
      city: {type: String, required: true},
      state: {type: String, required: true},
      zipcode: {type: mongoose.Number, required: true}
  }
});

vendorSchema.plugin(uniqueValidator);
const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
