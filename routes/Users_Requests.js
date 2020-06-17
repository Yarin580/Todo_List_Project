const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const ToDo = require("../models/Todo");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() => res.json({ success: false }));
});

//SignUp request
router.post("/signUp", (req, res) => {
  User.find({ email: req.body.email }).then(async (users) => {
    if (users.length >= 1) {
      return res.status(404).json({
        massage: "email exists",
      });
    }

    const key = await bcrypt.genSalt(10);
    if (!key) return res.status(404).json({ success: false });

    const hash = await bcrypt.hash(req.body.password, key);
    if (!hash) return res.status(404).json({ success: false });

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });

    newUser.save().then((user) => res.json(user));
  });
});

//LogIn request
router.post("/login/", (req, res) => {
  User.find({ email: req.body.email }).then(async (user) => {
    const check = await bcrypt.compare(req.body.password, user[0].password);
    if (check) return res.json(user[0]._id);
    else res.status(404).json("email/password incorect");
  });
});

//GET user full name by ID
router.get("/fullname/:id", (req, res) => {
  let name = "";
  User.findById(req.params.id)
    .then((user) => {
      name = user.firstName + " " + user.lastName;
      res.json(name);
    })
    .catch(() => res.status(404).json({ success: false }));
});

//GET the ID of the user with the most tasks
router.get("/mostTask", async (req, res) => {
  let userlist;
  let max = 0;
  let userID_most = "";

  await User.find().then((users) => (userlist = users));

  await userlist.map((user) => {
    ToDo.find({ userID: user._id }).then((todos) => {
      if (max < todos.length) {
        max = todos.length;
        userID_most = user._id;
      }
    });
  });

  setTimeout(() => {
    res.json(userID_most);
  }, 1000);
});

//GET the ID of the user with the most tasks are done
router.get("/tasksAreDone", async (req, res) => {
  let userList;
  let max = 0;
  let userID_mostDone = "";
  await User.find().then((users) => (userList = users));

  await userList.map((user) => {
    ToDo.find({ userID: user._id, is_done: true }).then((todos) => {
      if (max < todos.length) {
        max = todos.length;
        userID_mostDone = user._id;
      }
    });
  });

  setTimeout(() => {
    res.json(userID_mostDone);
  }, 1000);
});

//get all the users with the same req.body.value
router.post("/find", (req, res) => {
  if (req.body.value === "firstName") {
    User.find({
      firstName: { $regex: "^" + req.body.data },
    }).then((users) => res.json(users));
  } else if (req.body.value === "lastName") {
    User.find({ lastName: { $regex: "^" + req.body.data } }).then((users) =>
      res.json(users)
    );
  } else {
    User.find({ email: { $regex: "^" + req.body.data } }).then((users) =>
      res.json(users)
    );
  }
});

//delete user and all the todos with the same userID
router.delete("/todos/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ succes: false });

  ToDo.deleteMany({ userID: user._id })
    .then(user.remove().then(res.json({ sucess: true })))
    .catch((err) => res.status(404).json({ succes: false }));
});

//get the admin status for the user with the same id
router.get("/is_admin/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user.is_admin))
    .catch(() => res.status(404).json({ success: false }));
});
module.exports = router;
