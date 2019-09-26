const express = require("express");
const router = express.Router();
const Project = require("../models/project");

//devuelve todos los proyectos
router.get("", (req, res, next) => {
  Project.find().then(documents => {
    res.status(200).json({
      message: "Projects fetched successfully",
      projects: documents
    });
  });
});

//busca y devuelve un proyecto
router.get("/:id", (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  });
});

//aniade proyecto
router.post("", (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: "Project added successfully!",
      projectId: createdProject._id
    });
  });
});

//edita proyecto
router.put("/:id", (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  Project.updateOne({ _id: req.params.id }, project).then(result => {
    res.status(200).json({ message: "Project updated successfully" });
  });
});

//elimina proyecto
router.delete("/:id", (req, res, next) => {
  Project.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Project deleted successfully" });
  });
});

module.exports = router;
