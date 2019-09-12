const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
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

//aniade proyectos
app.post("/api/projects", (req, res, next) => {
  const project = req.body;
  console.log(project);
  res.status(201).json({
    message: "Project added successfully!"
  });
});

module.exports = app;
