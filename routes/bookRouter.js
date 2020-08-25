const express = require("express");
const router = express.Router();
const Book = require("../model/Book.js");
const auth = require("../routes/auth.js");

router
  .route("/")
  .get((req, res, next) => {
    Book.find({ owner: req.user.id })
      .then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.json(books);
      })
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    let { title, owner } = req.body;
    Book.create({ title, owner: req.user.id })
      .then((book) => {
        res.status(201).json(book);
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Book.deleteMany({})
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });

router
  .route("/:book_id")
  .get((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        res.json(book);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Book.findByIdAndUpdate(
      req.params.book_id,
      { $set: req.body },
      { new: true }
    )
      .then((Book) => {
        res.json(Book);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Book.deleteOne({ _id: req.params.book_id })
      .then((reply) => {
        res.json(reply);
      })
      .catch((err) => next(err));
  });

router
  .route("/:book_id/notes")
  .get((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        res.json(book.notes);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Book.findById(req.params.book_id).then((Book) => {
      Book.notes.push(req.body);
      Book.save()
        .then((book) => {
          res.json(book.notes);
        })
        .catch(next);
    });
  })
  .delete((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        book.notes = [];
        book
          .save()
          .then((updatedBook) => {
            res.json(updatedBook.notes);
          })
          .catch(next);
      })
      .catch(next);
  });

router
  .route("/:book_id/notes/:note_id")
  .get((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        res.json(book.notes.id(req.params.note_id));
      })
      .catch(next);
  })

  .put((req, res, next) => {
    Book.findById(req.params.book_id).then((book) => {
      let note = book.notes.id(req.params.note_id);

      note.chapter = req.body.chapter;
      note.text = req.body.text;

      book
        .save()
        .then((updatedBook) => {
          res.json(updatedBook.notes.id(req.params.note_id));
        })
        .catch(next);
    });
  })

  .delete((req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        book.notes = book.notes.filter((note) => {
          return note.id !== req.params.note_id;
        });
        book
          .save()
          .then((updatedBook) => {
            res.json(updatedBook.notes);
          })
          .catch(next);
      })
      .catch(next);
  });

module.exports = router;
