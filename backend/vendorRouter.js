const express = require('express');
const mongoose = require('mongoose');
const Vendor = require('./models/vendorSchema.js');
const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res) => {
    Vendor.find({ }, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

vendorRouter.post('/', async (req, res) => {
    const vendor = new Vendor({
      username: req.body.username,
      company: req.body.company,
      id: req.body.id,
      address: {
          street: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          zipcode: req.body.address.zipcode
      }
    });
    console.log(vendor);
    vendor.save()
    .then(data => {
        res.send(data);
    });
});

module.exports = vendorRouter;
