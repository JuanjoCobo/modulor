const express = require("express");

const app = express();

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

app.use("/api/projects", (req, res, next) => {
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

module.exports = app;
