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

//get the number of todos are done
router.get("/NumOfTodosAreDone/:userID", (req, res) => {
  Todo.find({ userID: req.params.userID, is_done: true })
    .then((todos) => res.json(todos.length))
    .catch(() => res.status(404).json({ success: false }));
});

//get the number of todos are not done
router.get("/NumOfTodosAreNotDone/:userID", (req, res) => {
  Todo.find({ userID: req.params.userID, is_done: false })
    .then((todos) => res.json(todos.length))
    .catch(() => res.status(404).json({ success: false }));
});

//get the number of todos in the last week
router.get("/todosWeek/:userID", (req, res) => {
  Todo.find({
    userID: req.params.userID,
    date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
  }).then((todos) => res.json(todos.length));
});

//get the number of todos in the last month
router.get("/todosMonth/:userID", (req, res) => {
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  Todo.find({
    userID: req.params.userID,
    date: { $gte: lastMonth },
  }).then((todos) => res.json(todos.length));
});

//get the number of todos are completed in the last week
router.get("/doneTodosWeek/:userID", (req, res) => {
  Todo.find({
    userID: req.params.userID,
    date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
    is_done: true,
  }).then((todos) => res.json(todos.length));
});

//get the number of todos are completed in the last month
router.get("/doneTodosMonth/:userID", (req, res) => {
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  Todo.find({
    userID: req.params.userID,
    date: { $gte: lastMonth },
    is_done: true,
  }).then((todos) => res.json(todos.length));
});

module.exports = router;
