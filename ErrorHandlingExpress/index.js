const express = require("express");
const app = express();
const AppError = require("./AppError");

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    return next();
  }
  // res.send('Incorrect Password!');
  throw new AppError("Password bruh!", 401);
};

app.get("/", (req, res) => {
  res.send("HOME PAGE!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("I love C++ !!!");
  console.log(req.reqeustedTime);
});

app.get("/error", (req, res) => {
  chicken.fly();
});

app.use((req, res) => {
  res.status(404).send("Not found!");
});

// app.use((err, req, res, next) => {
//     console.log('************');
//     console.log('****Error***');
//     console.log('************');
//     // res.status(500).send('Oh boy its an error');
//     next(err);
// })

app.use((err, req, res, next) => {
  const { status = 500, message = "Bad error" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
