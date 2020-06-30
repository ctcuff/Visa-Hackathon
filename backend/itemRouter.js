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

itemRouter.put('/:id', async (req, res) => {
  Item.findById(req.params.id, function (err, data) {
    if(!req.body.price){
      res.status(404).send({error:'Listing must have code'});
    }
    else if(!req.body.category){
      res.status(404).send({error:'Listing must have category'});
    }
    else if(!req.body.item){
      res.status(404).send({error:'Listing must have item name'});
    }
    data.price = req.body.price;
    data.category = req.body.category;
    data.item = req.body.item;
    data.inStock = req.body.inStock;
    data.save();
    res.json(data);
  });
});

itemRouter.delete('/:id', async (req, res) => {
  Item.findByIdAndRemove(req.params.id, function (err, data) {
    if(err){
      res.status(404).send({error:'Listing could not be found'});
    };
    console.log('removed listing')
    res.json(data);
  });
});

module.exports = itemRouter;
