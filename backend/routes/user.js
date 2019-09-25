const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

//devuelve users al front
router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Users fetched successfully",
      users: documents
    });
  });
});

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
  var fetchedUser; //para guardar usuario y usarlo en el método
  //findOne() recibe dos argumentos para comprobar el name o el email
  User.findOne({
    $or: [{ name: req.body.user }, { email: req.body.user }]
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed 1" });
      }
      fetchedUser = user;
      //se compara la pass introducida con la pass del usuario almacenada en la BBDD
      return bcrypt.compare(req.body.pass, user.pass);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({ message: "Auth failed 2" });
      }
      /**
       * sign() crea un nuevo token
       * Dentro del token va: 1(name y id), 2(clave-token), 3(expira)
       */
      const token = jwt.sign(
        { userName: fetchedUser.name, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        message: "Token sent"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Auth failed 3" });
    });
});

module.exports = router;
