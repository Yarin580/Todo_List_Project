const express = require("express");
const router = express.Router();

const User = require("../models/User");

//POST request
router.post("/", (req, res) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length >= 1) {
      return res.status(404).json({
        massage: "email exists",
      });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save().then((user) => res.json(user));
  });
});

//LogIn request
router.get("/login/:email", (req, res) => {
  User.find({ email: req.params.email }).then((user) => res.json(user));
});

//GET user by ID
router.get("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((user) => res.json(user))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
