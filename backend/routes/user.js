const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

/*
//devuelve users al front
router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Users fetched successfully",
      projects: documents
    });
  });
});
*/

//Crear usuario
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.pass, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      pass: hash
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

//login
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed 1" });
      }
      //se compara la pass introducida con la pass del usuario almacenada en la BBDD
      return bcrypt.compare(req.body.pass, user.pass);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({ message: "Auth failed 2" });
      }
      /**
       * sign() crea un nuevo token
       */
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
    })
    .catch(err => {
      return res.status(401).json({ message: "Auth failed 3" });
    });
});

module.exports = router;
