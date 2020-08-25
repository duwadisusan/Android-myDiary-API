const express = require("express");
const router = express.Router();
const Bucketlist = require("../model/Bucketlist.js");
const auth = require("../routes/auth.js");

router
  .route("/")
  .get((req, res, next) => {
    Bucketlist.find({ owner: req.user.id })
      .then((blist) => {
        res.setHeader("Content-Type", "application/json");
        res.json(blist);
      })
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    let { detail, done } = req.body;
    Bucketlist.create({ detail, done, owner: req.user.id })
      .then((blist) => {
        res.status(201).json(blist);
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Bucketlist.deleteMany({ owner: req.user.id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });

router
  .route("/:blist_id")
  .get((req, res, next) => {
    Bucketlist.findById(req.params.blist_id)
      .then((blist) => {
        res.json(blist);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Bucketlist.findByIdAndUpdate(
      req.params.blist_id,
      { $set: req.body },
      { new: true }
    )
      .then((Bucketlist) => {
        res.json(Bucketlist);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Bucketlist.deleteOne({ _id: req.params.blist_id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });
module.exports = router;
