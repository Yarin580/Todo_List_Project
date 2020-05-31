import React from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ContainerTodoList from "./components/TodoList/ContainerTodoList";

function App() {
  return (
    <div className="App">
      <AppNavBar />
      <ContainerTodoList />
    </div>
  );
}

export default App;
