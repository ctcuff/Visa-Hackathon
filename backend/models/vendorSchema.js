const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {type: String},
  company: {type: String},
  id: {type:String},
  items: {type: Array},
  address: {
      street: {type: String},
      city: {type: String},
      state: {type: String},
      zipcode: {type: mongoose.Number}
  }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
