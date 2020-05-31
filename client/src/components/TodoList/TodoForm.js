import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";

function TodoForm() {
  const [todo, setTodo] = useState("");

  function onChangeHandler(e) {
    setTodo(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (todo === "") return alert("you need to enter todo name");

    const newTodo = {
      value: todo,
    };

    axios.post("/todos", newTodo).then((res) => console.log(res.data));

    setTodo("");
  }

  return (
    <form onSubmit={onSubmit}>
      <Input type="text" placeholder="write Todo" onChange={onChangeHandler} />
      <br />
      <Button className="buttonSubmit" type="submit" color="secondary">
        Submit
      </Button>
    </form>
  );
}

export default TodoForm;
