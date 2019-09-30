const express = require('express');
const multer = require('multer');

const router = express.Router();
const Project = require('../models/project');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    var error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    callback(error, 'backend/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});

//devuelve todos los proyectos
router.get('', (req, res, next) => {
  Project.find().then(documents => {
    res.status(200).json({
      message: 'Projects fetched successfully',
      projects: documents
    });
  });
});

//busca y devuelve un proyecto
router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  });
});

//aniade proyecto
router.post(
  '',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const project = new Project({
      title: req.body.title,
      description: req.body.description
    });
    project.save().then(createdProject => {
      res.status(201).json({
        message: 'Project added successfully!',
        projectId: createdProject._id
      });
    });
  }
);

//edita proyecto
router.put('/:id', (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  Project.updateOne({ _id: req.params.id }, project).then(result => {
    res.status(200).json({ message: 'Project updated successfully' });
  });
});

//elimina proyecto
router.delete('/:id', (req, res, next) => {
  Project.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Project deleted successfully' });
  });
});

module.exports = router;
