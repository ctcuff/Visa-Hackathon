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
          res.status(400).send({error:'Username is taken'});
        }
        else{
          res.send(customer);
        }
    })
});

customerRouter.post('/login', async (req, res) => {
    Customer.findOne({username: req.body.username}, function (err, data) {
        if(!data){
          console.log('Username does not exist');
          res.status(404).send({error:'Username does not exist'});
        }
        else if(data.password != req.body.password){
          res.status(400).send({error: 'Invalid password'})
        }
        else if(data.password == req.body.password){
          res.send({status: 'ok'})
        }
    });
});

module.exports = customerRouter;
