import React, { useState, useEffect, useContext } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function TodoList(props) {
  const [todoList, setTodoList] = useState({
    todos: [],
  });

  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  //when the component show up => call to getTodos function
  useEffect(() => {
    if (userLogin) getTodos();
  });

  function getTodos() {
    //get only the todos with the same userID ant put them on todos state
    axios
      .get(`/todos/${userLogin._id}`)
      .then((res) => {
        setTodoList({ todos: res.data });
      })
      .catch(() => {
        alert("somthing goes worng");
      });
  }

  function deleteHandler(id) {
    //delete the todo with the same ID
    axios.delete(`todos/${id}`).then((res) => {
      console.log(res);
    });
  }

  function isDoneHandler(id) {
    //change the todo to be done or not done
    axios.put(`todos/${id}`).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      {userLogin ? (
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
                style={{
                  textDecoration: todo.is_done ? "line-through" : "none",
                }}
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
      ) : (
        <h1>you need to log in</h1>
      )}
    </div>
  );
}

export default TodoList;
