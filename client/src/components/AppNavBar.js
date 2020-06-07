import React, { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function AppNavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext);

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
            <h4>hello {userLogin.firstName} </h4>
          </NavbarBrand>
        ) : null}

        <NavbarBrand className="ml-auto">
          <Link style={{ color: "white" }} to="/">
            <h1>ToDo App</h1>
          </Link>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            {userLogin ? (
              <Link
                style={{ color: "white" }}
                onClick={() => setUserLogin(null)}
                to="/"
              >
                logOut
              </Link>
            ) : (
              <Link style={{ color: "white" }} to="/Login">
                login/Signup
              </Link>
            )}
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
