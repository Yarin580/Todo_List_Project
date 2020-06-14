import React, { useState } from "react";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ContainerTodoList from "./components/TodoList/ContainerTodoList";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import SignUp from "./components/Auth/SignUp";
import AdminHomePage from "./components/Auth/Admin/AdminHomePage";
import AdminUserList from "./components/Auth/Admin/AdminUserList";
import AdminStatistic from "./components/Auth/Admin/AdminStatistic";
import AdminDeleteUser from "./components/Auth/Admin/AdminDeleteUser";

function App() {
  const [userLogin, setUserLogin] = useState(null);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
          <AppNavBar />
          <Switch>
            <Route path="/Login" component={Login} />} />
            <Route path="/" exact component={ContainerTodoList} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/AdminHomePage" component={AdminHomePage} />
            <Route path="/AdminUserList" component={AdminUserList} />
            <Route path="/AdminStatistic" component={AdminStatistic} />
            <Route path="/AdminDeleteUser" component={AdminDeleteUser} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
