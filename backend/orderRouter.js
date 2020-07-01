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
            vendorUsername: req.body.vendorUsername,
            customerUsername: req.body.customerUsername,
            totalPrice: req.body.totalPrice,
            listOfItems: req.body.listOfItems,
            time: req.body.time
        }
    );
    console.log(order);
    order.save().then(data => {res.send(data)})
});
