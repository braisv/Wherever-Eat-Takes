const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect('mongodb://localhost/server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "Complete Store DB"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });