const express = require("express");
const likesRouter = express.Router();
const User = require("../models/User");

likesRouter.post("/updateLike", (req, res, next) => {
    const updatedUserObj = req.body.updatedUserObj;
    User.findByIdAndUpdate(req.user._id, {$push:{likes:updatedUserObj}} , { new: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  });

  likesRouter.post("/removeLike", (req, res, next) => {
    const { restaurant } = req.body;
    User.findByIdAndUpdate(req.user._id, {$pull:{likes:restaurant}} , { new: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  });
  
  
  module.exports = likesRouter;