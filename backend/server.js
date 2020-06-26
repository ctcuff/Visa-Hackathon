const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Vendor = require('./models/vendorSchema.js');
const Item = require('./models/itemSchema.js');
const fs = require('fs');
const vendorRouter = require('./vendorRouter.js')
const itemRouter = require('./itemRouter.js')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//place merchant entries into db
fs.readFile('farmer_entries.json', 'utf8', (err, data) => {
    if (err) throw err;
    farmerData = JSON.parse(data);

    Vendor.insertMany(farmerData.entries,function(err,docs){
      if (err) {
      console.log(err);
      }
      else {
      console.log("success!");
      }
    });
});

//place item entries into db
fs.readFile('item_entries.json', 'utf8', (err, data) => {
    if (err) throw err;
    itemData = JSON.parse(data);

    Item.insertMany(itemData.entries,function(err,docs){
      if (err) {
      console.log(err);
      }
      else {
      console.log("success!");
      }
    });
});


app.use('/items', itemRouter);


app.use('/vendors', vendorRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
