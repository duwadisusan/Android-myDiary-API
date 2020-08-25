const express = require("express");
const router = express.Router();
const Log = require("../model/Log.js");
const auth = require("../routes/auth.js");

router
  .route("/")
  .get((req, res, next) => {
    Log.find({ owner: req.user.id })
      .then((log) => {
        res.setHeader("Content-Type", "application/json");
        res.json(log);
      })
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    let { title, date, blog, owner } = req.body;
    Log.create({ title, date, blog, owner: req.user.id })
      .then((log) => {
        res.status(201).json(log);
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Log.deleteMany({ owner: req.user.id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });

router
  .route("/:log_id")
  .get((req, res, next) => {
    Log.findById(req.params.log_id)
      .then((log) => {
        res.json(log);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Log.findByIdAndUpdate(req.params.log_id, { $set: req.body }, { new: true })
      .then((Log) => {
        res.json(Log);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Log.deleteOne({ _id: req.params.log_id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });
module.exports = router;
