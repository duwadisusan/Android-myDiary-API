const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const auth = require("./routes/auth");

const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const jokesRouter = require("./routes/jokesRouter");
const logRouter = require("./routes/logRouter");
const bucketlistRouter = require("./routes/bucketlistRouter");
const uploadRouter = require("./routes/uploadRouter");

const app = express();
mongoose
  .connect(process.env.DbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database server connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome, to my app");
});

app.use("/api/users", userRouter);
app.use("/api/logs", auth.verifyUser, logRouter);
app.use("/api/bucketlists", auth.verifyUser, bucketlistRouter);
app.use("/api/books", auth.verifyUser, bookRouter);
app.use("/api/jokes", auth.verifyUser, jokesRouter);
app.use("/api/upload", auth.verifyUser, uploadRouter);

app.use((req, res, next) => {
  let err = Error("Error");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "err",
    message: err.message,
  });
});

app.listen(process.env.Port, () => {
  console.log(`server is running at localhost:${process.env.Port}`);
});
