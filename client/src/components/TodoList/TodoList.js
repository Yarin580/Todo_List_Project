import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import axios from "axios";

function TodoList() {
  const [todoList, setTodoList] = useState({
    todos: [],
  });

  useEffect(() => {
    getTodos();
  });

  function getTodos() {
    axios
      .get("/todos")
      .then((res) => {
        setTodoList({ todos: res.data });
      })
      .catch(() => {
        alert("somthing goes worng");
      });
  }

  function deleteHandler(id) {
    axios.delete(`todos/${id}`).then((res) => {
      console.log(res);
    });
  }

  function isDoneHandler(id) {
    axios.put(`todos/${id}`).then((res) => {
      console.log(res);
    });
  }

  return (
    <ListGroup>
      {todoList.todos.map((todo) => (
        <ListGroupItem key={todo._id}>
          <Input
            type="checkbox"
            size="md"
            style={{ float: "left" }}
            onChange={() => isDoneHandler(todo._id)}
          />
          <span
            style={{ textDecoration: todo.is_done ? "line-through" : "none" }}
          >
            {todo.value}
          </span>

          <Button
            color="danger"
            style={{ float: "right" }}
            onClick={() => deleteHandler(todo._id)}
          >
            DELETE
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default TodoList;
