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

itemRouter.post('/', async (req, res) => {
    res.send('added:');
    const item = new Item({
      username: req.body.username,
      price: req.body.price,
      category: req.body.category,
      item: req.body.item,
      time : req.body.time
    });
    console.log(item);
    item.save()
    .then(data => {
        res.send(data);
    });
});

module.exports = itemRouter;
