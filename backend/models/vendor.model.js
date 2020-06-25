var mongoose = require('mongoose');

var vendorSchema = mongoose.Schema(
    {
        name: String,
        id: String,
        items: Array
    }
);

var Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
