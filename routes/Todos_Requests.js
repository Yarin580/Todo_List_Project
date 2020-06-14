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
    userID: req.body.userID,
  });

  newTodo.save().then((Todo) => res.json(Todo));
});

//DELETE request
router.delete("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => todo.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

//PUT request
router.put("/:id", (req, res) => {
  const updateTodo = {
    $set: {
      is_done: !req.params.is_done,
    },
  };
  const id = { _id: req.params.id };

  Todo.updateOne(id, updateTodo)
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ succes: false }));
});

//get all the todos with the same userID
router.get("/:userID", (req, res) => {
  Todo.find({ userID: req.params.userID }).then((todos) => res.json(todos));
});

module.exports = router;
