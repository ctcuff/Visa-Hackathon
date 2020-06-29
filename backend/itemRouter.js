const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/itemSchema.js');
const itemRouter = express.Router();

itemRouter.get('/', async (req, res) => {
    Item.find({ }, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

itemRouter.get('/searchByFarmer', async (req, res) => {
    console.log("hello")
    console.log(req.params.vendorUsername)
    Item.find({vendorUsername: req.params.vendorUsername}, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});


itemRouter.post('/create', async (req, res) => {
    const item = new Item({
      vendorUsername: req.body.vendorUsername,
      price: req.body.price,
      category: req.body.category,
      item: req.body.item,
      inStock : req.body.inStock
    });
    console.log(item);
    item.save()
    .then(data => {
        res.send(data);
    });
});

module.exports = itemRouter;
