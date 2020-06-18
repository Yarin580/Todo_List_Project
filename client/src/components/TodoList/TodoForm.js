import React, { useState, useContext } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function TodoForm() {
  const [todo, setTodo] = useState({
    title: "",
    desc: "",
  });

  const [lunch, setLunch] = useState(false);
  const [descStatus, setDescStatus] = useState(false);

  const toggle = () => setLunch(!lunch);

  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  // set the todo title
  function onChangeTitle(e) {
    setTodo({ ...todo, title: e.target.value });
  }
  function onChangeDesc(e) {
    setTodo({ ...todo, desc: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!userLogin) return alert("you need to log In");
    if (todo.title === "") return alert("you need to enter todo title");

    //create new todo and add to the DB
    const newTodo = {
      value: todo.title,
      description: todo.desc,
      userID: userLogin,
    };

    //adding the new todo to the DB
    axios.post("/todos", newTodo).then((res) => console.log(res.data));

    //set te state
    setTodo({
      title: "",
      desc: "",
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="write Todo"
        value={todo.title}
        onChange={onChangeTitle}
      />
      <br />
      <Button className="buttonSubmit" type="submit" color="secondary">
        Submit todo
      </Button>
      &nbsp;&nbsp;
      <Button onClick={toggle} color={descStatus ? "success" : "secondary"}>
        Add description
      </Button>
      <Modal isOpen={lunch} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Description</ModalHeader>
        <ModalBody>
          <Input
            type="textarea"
            placeholder="write description"
            value={todo.desc}
            onChange={onChangeDesc}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              setDescStatus(true);
            }}
          >
            Add
          </Button>
          &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={() => {
              toggle();
              setTodo({ ...todo, desc: "" });
            }}
          >
            cencel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
}

export default TodoForm;
