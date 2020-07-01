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

itemRouter.get('/:itemId', async (req, res) => {
  console.log(req.params.itemId);
    Item.findById(req.params.itemId, function (err, data) {
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

itemRouter.put('/:itemId', async (req, res) => {
  console.log(req.body);
  Item.findById(req.params.itemId, function (err, data) {
    if(err){
      res.status(404).send({error:'Item could not be found'});
    }
    else if(!req.body.price){
      res.status(404).send({error:'Item must have price'});
    }
    else if(!req.body.category){
      console.log("no category");
      res.status(404).send({error:'Item must have category'});
    }
    else if(!req.body.item){
      console.log("no name");
      res.status(404).send({error:'Item must have name'});
    }
    else{
      data.price = req.body.price;
      data.category = req.body.category;
      data.item = req.body.item;
      data.inStock = req.body.inStock;
      data.save();
      res.json(data);
    }
  });
});

itemRouter.delete('/:itemId', async (req, res) => {
  Item.findByIdAndRemove(req.params.itemId, function (err, data) {
    if(err){
      res.status(404).send({error:'Item could not be found'});
    };
    console.log('removed item')
    res.json(data);
  });
});

module.exports = itemRouter;
