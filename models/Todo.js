const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Todo Schema

const TodoSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  is_done: {
    type: Boolean,
    default: false,
  },
});

module.exports = Todo = mongoose.model("Todo", TodoSchema);
