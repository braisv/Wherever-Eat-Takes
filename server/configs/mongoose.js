const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect('mongodb://localhost/we-eat-takes', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "Wherever Eat Takes DB"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });