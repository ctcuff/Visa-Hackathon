const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Vendor = require('./models/vendorSchema.js');
const Item = require('./models/itemSchema.js');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
