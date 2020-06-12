import React, { useContext, useState, useEffect } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

function AppNavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext);

  const [fullName, setFullname] = useState();

  useEffect(() => {
    getFullName();
  });

  function getFullName() {
    axios
      .get(`/users/fullname/${userLogin}`)
      .then((res) => {
        setFullname(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "gray" }}
        dark
        expand="md"
        className="mb-5"
      >
        <NavbarBrand style={{ alignItems: "center" }}>
          <Link style={{ color: "white" }} to="/">
            <h1>ToDo App</h1>
          </Link>
        </NavbarBrand>
        {userLogin ? (
          <NavbarBrand>
            <h4>hello {fullName} </h4>
          </NavbarBrand>
        ) : null}

        <Nav className="ml-auto" navbar>
          {userLogin ? (
            userLogin.is_admin ? (
              <NavItem>
                <Link style={{ color: "white" }} to="/AdminHomePage">
                  admin page
                </Link>
                &nbsp; &nbsp;
                <Link
                  style={{ color: "white" }}
                  onClick={() => setUserLogin(null)}
                  to="/"
                >
                  logOut
                </Link>
              </NavItem>
            ) : (
              <NavItem>
                <Link
                  style={{ color: "white" }}
                  onClick={() => setUserLogin(null)}
                  to="/"
                >
                  logOut
                </Link>
              </NavItem>
            )
          ) : (
            <NavItem>
              <Link style={{ color: "white" }} to="/Login">
                login/Signup
              </Link>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
