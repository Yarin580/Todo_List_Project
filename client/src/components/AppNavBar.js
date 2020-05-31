import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

function AppNavBar() {
  return (
    <div>
      <Navbar
        style={{ backgroundColor: "gray" }}
        dark
        expand="md"
        className="mb-5"
      >
        <NavbarBrand className="ml-auto" href="/">
          <h1>ToDo App</h1>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">login/Signup</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
