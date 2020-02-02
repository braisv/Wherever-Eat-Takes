const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "Wherever Eat Takes DB"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });