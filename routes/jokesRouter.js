const express = require("express");
const router = express.Router();
const Jokes = require("../model/Jokes.js");
const auth = require("../routes/auth.js");

router
  .route("/")
  .get((req, res, next) => {
    Jokes.find({})
      .then((jokes) => {
        res.setHeader("Content-Type", "application/json");
        res.json(jokes);
      })
      .catch((err) => next(err));
  })

  .post(auth.verifyAdmin, (req, res, next) => {
    let { title, joke } = req.body;
    Jokes.create({ title, joke })
      .then((jokes) => {
        res.status(201).json(jokes);
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Jokes.deleteMany({})
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });

router
  .route("/:jokes_id")
  .get((req, res, next) => {
    Jokes.findById(req.params.jokes_id)
      .then((jokes) => {
        res.json(jokes);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Jokes.findByIdAndUpdate(
      req.params.jokes_id,
      { $set: req.body },
      { new: true }
    )
      .then((Jokes) => {
        res.json(Jokes);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Jokes.deleteOne({ _id: req.params.jokes_id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });
module.exports = router;
