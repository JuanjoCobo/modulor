const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Project = require("./models/project");

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

//envía proyectos al front
app.get("/api/projects", (req, res, next) => {
  const projects = [
    {
      id: "sldf1232",
      title: "Primer proyecto del servidor",
      description: "contenido 1"
    },
    {
      id: "sldf1768",
      title: "Segundo proyecto del servidor",
      description: "contenido 2"
    }
  ];
  res.status(200).json({
    message: "Projects fetched successfully",
    projects: projects
  });
});

//aniade proyecto
app.post("/api/projects", (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description
  });
  console.log(project);
  res.status(201).json({
    message: "Project added successfully!"
  });
});

//edita proyecto
app.put("/api/projects/:id", (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  Project.updateOne({ _id: req.params.id }, project).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successfully" });
  });
});

//elimina proyecto
app.delete("/api/projects/:id", (req, res, next) => {
  console.log(req.params.id);
  //metodo borrar de la BBDD una vez pueda trabajar con ella en casa
  res.status(200).json({ message: "Project deleted!" });
});

module.exports = app;
