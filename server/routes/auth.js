const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(new Error("You must provide valid credentials"));
  }

  User.findOne({ username }, (err, foundUser) => {
    if (foundUser) {
      res.status(500).json({ errorMsg: "Username already exists" });
      return;
    }

    require("../helpers/regularExpressions.js")();
    const usernameGood = validateUsername(username);
    const passwordGood = validatePassword(password);

    if (!usernameGood) {
      res.status(500).json({ errorMsg: "Use a valid username" });
      return;
    }

    if (!passwordGood) {
      res.status(500).json({
        errorMsg:
          "The password must contain from 8 to 16 characters and at least 1 digit and character"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      favourites
    });

    newUser
      .save()
      .then(user => {
        login(req, user)
          .then(() => {
            console.log("WIN");
            res.json({ status: "signup & login successfully", user });
          })
          .catch(error => {
            res.status(500).json({
              status: "login failed",
              error
            });
          });
      })
      .catch(err => console.log(err));
  }).catch(err => console.log(err));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
