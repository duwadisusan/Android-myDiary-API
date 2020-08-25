const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const validation = require("../validation");

router.post("/register", (req, res, next) => {
  const { errors, isValid } = validation.registerInput(req.body);
  if (!isValid) {
    res.status(400).json({
      status: "errors",
      message: errors,
    });
  }

  let { email, password, firstName, lastName, role } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        let err = new Error("User already exists!");
        err.status = 401;
        return next(err);
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) next(err);
        User.create({ email, password: hash, firstName, lastName, role })
          .then((user) => {
            res.json({
              Status: "Registration Successful!",
            });
          })
          .catch(err); // comment lifted
      });
    })
    //.catch(next); //swaped next with err
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      }
      bcrypt
        .compare(password, user.password) //first password  is req.bodypassword, second user.password is from database.
        .then((isMatched) => {
          if (!isMatched) {
            let err = new Error("Password does not match");
            err.status = 404;
            return next(err);
          }
          let payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          };
          //Token is created here.
          jwt.sign(payload, process.env.SECRET, (err, token) => {
            if (err) {
              return next(err);
            }
            res.json({
              status: "Login Sucessful",
              token: `Bearer ${token}`,
            });
          });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
