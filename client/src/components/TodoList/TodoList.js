import React, { useState, useEffect, useContext } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function TodoList(props) {
  const [todoList, setTodoList] = useState({
    todos: [],
  });

  //get the userID from the context
  const { userID } = useContext(UserContext);

  //when the component show up => call to getTodos function
  useEffect(() => {
    getTodos();
  });

  function getTodos() {
    //get all the todos in the DB and put them in the todoList state
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
      {userID ? (
        <ListGroup>
          {todoList.todos.map((todo) =>
            //show only the todos with the same userID
            userID === todo.userID ? (
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
            ) : null
          )}
        </ListGroup>
      ) : (
        <h1>you need to log in</h1>
      )}
    </div>
  );
}

export default TodoList;
