const express = require('express');
const restaurantsRouter = express.Router();
const Restaurant = require("../models/Restaurant")

restaurantsRouter.post('/new', (req, res, next) => {
  const { name, neighborhood, photograph, location, image, cuisine_type, timetable, reviews } = req.body;
  Restaurant
    .create({ name, neighborhood, photograph, location, image, cuisine_type, timetable, reviews })
    .then((newRestaurant) => {
      Restaurant
        .findById(newRestaurant._id)
        .then(theNewRestaurant => res.json(theNewRestaurant))
    })
});

restaurantsRouter.get('/restaurants', (req, res, next) => {
  Restaurant
    .find()
    .then(allTheRestaurants => res.json(allTheRestaurants))
});

restaurantsRouter.get('/restaurant/:id', (req, res, next) => {
  const restaurantID = req.params.id
  Restaurant
    .findById(restaurantID)
    .then(restaurant => res.json(restaurant))
});

restaurantsRouter.post('/remove/:id', (req, res, next) => {
  const restaurantID = req.params.id
  Restaurant
    .findByIdAndRemove({ _id : restaurantID })
    .then(theRestaurant => {
      res.json(theRestaurant)
    })
});

restaurantsRouter.post('/edit/:id', (req, res, next) => {
    const { name, neighborhood, photograph, location, image, cuisine_type, timetable, reviews } = req.body;
    const restaurantID = req.params.id
  Restaurant
    .findByIdAndUpdate({ _id: restaurantID }, { $set: { name, neighborhood, photograph, location, image, cuisine_type, timetable, reviews }}, { new: true })
    .then(theRestaurant => res.json(theRestaurant))
});


module.exports = restaurantsRouter;