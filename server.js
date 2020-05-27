const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

//create DB
const db = "mongodb://localhost:27017/Todo_List_Project";

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo connected..."))
  .catch((err) => console.log(err));

// starting the server on port 3000
app.listen(3000, () => console.log("server start on port 3000"));
