const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/orderSchema.js');
const orderRouter = express.Router();

orderRouter.get('/', async (req, res) => {
    Order.find({ }, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

orderRouter.post('/create', async (req, res) => {
    const order = new Order(
        {
            company: req.body.company,
            buyer: req.body.buyer,
            price: req.body.price,
            category: req.body.category,
            item: req.body.item,
            time: req.body.time
        }
    );
    console.log(order);
    order.save().then(data => {res.send(data)})
});

orderRouter.put('/:itemId', async (req, res) => {
    Order.findById(req.params.itemId, function (err, data) {
      if(err){
        res.status(404).send({error:'Item could not be found'});
      }
      else if(!req.body.price){
        res.status(404).send({error:'Item must have price'});
      }
      else if(!req.body.category){
        res.status(404).send({error:'Item must have category'});
      }
      else if(!req.body.item){
        res.status(404).send({error:'Item must have name'});
      }
      else{
        data.price = req.body.price;
        data.category = req.body.category;
        data.item = req.body.item;
        data.time = req.body.time;
        data.save();
        res.json(data);
      }
    });
  });

  orderRouter.delete('/:itemId', async (req, res) => {
    Order.findByIdAndRemove(req.params.itemId, function (err, data) {
      if(err){
        res.status(404).send({error:'Item could not be found'});
      };
      console.log('removed item')
      res.json(data);
    });
  });
