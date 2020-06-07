import React, { useState } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ContainerTodoList from "./components/TodoList/ContainerTodoList";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import SignUp from "./components/Auth/SignUp";

function App() {
  const [userID, setUserID] = useState(null);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ userID, setUserID }}>
          <AppNavBar />
          <Switch>
            <Route path="/Login" component={Login} />} />
            <Route path="/" exact component={ContainerTodoList} />
            <Route path="/SignUp" component={SignUp} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
