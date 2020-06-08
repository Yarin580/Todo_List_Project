const express = require("express");
const router = express.Router();

const User = require("../models/User");

//SignUp request
router.post("/signUp", (req, res) => {
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
router.post("/login/", (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (req.body.password === user[0].password) res.json(user[0]);
    else res.status(404).json("email/password incorect");
  });
});

//GET userName by ID
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user[0].firstName))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
