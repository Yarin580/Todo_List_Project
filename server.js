const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

//create DB
const db = "mongodb://localhost:27017/Todo_List_Project";

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongo connected..."))
  .catch((err) => console.log(err));

//use Routes
const Todos = require("./routes/Todos_Requests");
app.use("/todos", Todos);

const Users = require("./routes/Users_Requests");
app.use("/users", Users);

const port = process.env.PORT || 5000;

// starting the server
app.listen(port, () => console.log(`server start on port ${port}`));
