import React from "react";
import { Container } from "@material-ui/core";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function ContainerTodoList() {
  return (
    <div>
      <Container maxWidth="md">
        <TodoForm />
        <hr />
        <TodoList />
      </Container>
    </div>
  );
}

export default ContainerTodoList;
