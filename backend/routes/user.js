const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.pass, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      pass: hash,
      rol: req.body.rol
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;
