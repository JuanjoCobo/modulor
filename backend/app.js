const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const projectsRoutes = require("./routes/projects");
const usersRoutes = require("./routes/user");

const app = express();

//Conexion a BBDD
mongoose
  .connect(
    "mongodb+srv://juan:nANuQRPnkVf6ruJz@cluster0-azrx1.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conexion exitosa");
  })
  .catch(error => {
    console.log("Conexion fallida " + error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Soluciona error de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/projects", projectsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
