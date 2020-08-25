const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    let err = new Error("No authentication information!");
    err.status = 401;
    return next(err);
  }
  let token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      let err = new Error("Token cound not be found!");
      err.status = 402; //changed from 401
      return next(err);
    }
    req.user = payload;
    next();
  });
}

function verifyAdmin(req, res, next) {
  if (!req.user) {
    let err = new Error("No authentication information");
    err.status = 401;
    return next(err);
  }
  console.log("Log......." + req.user.role);
  if (req.user.role !== "admin") {
    let err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  next();
}

module.exports = {
  verifyUser,
  verifyAdmin,
};
