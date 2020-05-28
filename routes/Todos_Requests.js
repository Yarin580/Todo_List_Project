const express = require("express");
const router = express.Router();

//getting the Todo schema
const Todo = require("../models/Todo");

//GET Request
router.get("/", (req, res) => {
  Todo.find()
    .sort({ date: -1 })
    .then((todos) => res.json(todos));
});

//POST request
router.post("/", (req, res) => {
  const newTodo = new Todo({
    value: req.body.value,
  });

  newTodo.save().then((Todo) => res.json(Todo));
});

//DELETE request
router.delete("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => todo.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
