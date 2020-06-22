import React, { useState, useEffect, useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Spinner,
  Collapse,
  CardBody,
  Card,
  CardHeader,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import log from "../../resource/pleaseLogin.gif";
import "../../App.css";

function TodoList() {
  const [todoList, setTodoList] = useState({
    todos: [],
  });

  const [loading, setLoading] = useState(true);
  const [lunchDesc, setLunchDesc] = useState({
    lunch: false,
    todoID: "",
  });

  const toogleDesc = (id) =>
    setLunchDesc({
      lunch: !lunchDesc.lunch,
      todoID: id,
    });

  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  //when the component show up => call to getTodos function
  useEffect(() => {
    setTimeout(() => {
      if (userLogin) getTodos();
    }, 500);
  });

  function getTodos() {
    //get only the todos with the same userID ant put them on todos state
    axios
      .get(`/todos/${userLogin}`)
      .then((res) => {
        setTodoList({ todos: res.data });
        setLoading(false);
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
        loading ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              style={{
                width: "10rem",
                height: "10rem",
              }}
            />
          </span>
        ) : (
          <span>
            <div style={{ overflowY: "scroll" }}>
              <ListGroup style={{ maxHeight: "500px" }}>
                {todoList.todos.map((todo) => (
                  <ListGroupItem
                    onClick={() => toogleDesc(todo._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Input
                      type="checkbox"
                      size="md"
                      style={{ float: "left" }}
                      checked={todo.is_done}
                      onChange={() => {
                        setLunchDesc({ ...lunchDesc, lunch: false });
                        isDoneHandler(todo._id);
                      }}
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
                    {lunchDesc.lunch && lunchDesc.todoID === todo._id ? (
                      <Collapse isOpen={lunchDesc.lunch}>
                        <Card>
                          <CardHeader>
                            <h6>
                              <b>
                                <u>Description:</u>
                              </b>
                            </h6>
                          </CardHeader>
                          <CardBody style={{ whiteSpace: "pre-line" }}>
                            {todo.description !== "" ? (
                              todo.description
                            ) : (
                              <span style={{ color: "red" }}>
                                no description
                              </span>
                            )}
                          </CardBody>
                        </Card>
                      </Collapse>
                    ) : null}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
            <Link to="/UserStatHomePage" style={{ textDecoration: "none" }}>
              <Button outline color="success" size="lg" block>
                Statistic
              </Button>
            </Link>
          </span>
        )
      ) : (
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <img src={log} alt="please login" className="pleaseLoginGif" />
        </Link>
      )}
    </div>
  );
}

export default TodoList;
