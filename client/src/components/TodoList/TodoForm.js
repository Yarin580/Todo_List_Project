import React, { useState, useContext } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function TodoForm() {
  const [todo, setTodo] = useState("");

  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  // set the state
  function onChangeHandler(e) {
    setTodo(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (todo === "") return alert("you need to enter todo name");

    //create new todo and add to the DB
    const newTodo = {
      value: todo,
      userID: userLogin._id,
    };

    //adding the new todo to the DB
    axios.post("/todos", newTodo).then((res) => console.log(res.data));

    //set te state
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
