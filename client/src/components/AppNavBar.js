import React, { useContext, useState, useEffect } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import checkImg from "../resource/Logo.png";
import "../App.css";

function AppNavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext);

  const [fullName, setFullname] = useState();

  const [is_admin, setIs_Admin] = useState(false);

  useEffect(() => {
    if (userLogin) {
      getFullName();
      check_is_admin();
    }
  });

  function getFullName() {
    axios
      .get(`/users/fullname/${userLogin}`)
      .then((res) => {
        setFullname(res.data);
      })
      .catch((err) => console.log(err));
  }

  function check_is_admin() {
    axios
      .get(`/users/is_admin/${userLogin}`)
      .then((res) => setIs_Admin(res.data))
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
        {userLogin ? (
          <NavbarBrand>
            <h4>hello {fullName} </h4>
          </NavbarBrand>
        ) : null}
        <NavbarBrand className="ml-auto">
          <Link style={{ color: "white" }} to="/">
            <h1>
              ToDo App &nbsp;
              <img src={checkImg} alt="logo" className="Logo" />
            </h1>
          </Link>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          {userLogin ? (
            is_admin ? (
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
