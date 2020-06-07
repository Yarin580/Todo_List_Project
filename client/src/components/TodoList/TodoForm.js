import React, { useState, useContext } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { userID } = useContext(UserContext);

  function onChangeHandler(e) {
    setTodo(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (todo === "") return alert("you need to enter todo name");

    const newTodo = {
      value: todo,
      userID: userID,
    };

    axios.post("/todos", newTodo).then((res) => console.log(res.data));

    setTodo("");
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="write Todo"
        value={todo}
        onChange={onChangeHandler}
      />
      <br />
      <Button className="buttonSubmit" type="submit" color="secondary">
        Submit
      </Button>
    </form>
  );
}

export default TodoForm;
