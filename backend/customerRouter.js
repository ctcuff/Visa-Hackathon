const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customerSchema.js');
const customerRouter = express.Router();

customerRouter.post('/signUp', async (req, res) => {
    const customer = new Customer({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(customer);
    customer.save(function (err) {
        if(err){
          console.log(err);
          res.send('Username is taken! Please choose different username.');
        }
        else{
          res.send(customer);
        }
    })
});

customerRouter.get('/login', async (req, res) => {
    Customer.findOne({username: req.body.username}, function (err, data) {
        if(!data){
          console.log('Username does not exist');
          res.status(404).send({error:'Username does not exist'});
        }
        else if(data.password != req.body.password){
          res.send(false);
        }
        else if(data.password == req.body.password){
          res.send(true);
        }
    });
});

module.exports = customerRouter;
