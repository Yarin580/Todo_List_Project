import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import axios from "axios";

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //change the state
  function onChangeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    // if everyting good => create new user and add to the db
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };

    //adding the new user to the DB
    axios
      .post("/users/signUp", newUser)
      .then((res) => {
        console.log(res.data);
        alert("user created");
      })
      .catch(() => alert("email exist"));

    //set the state
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>SignUp</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <ListGroup>
            <ListGroupItem>
              <Input
                name="firstName"
                value={user.firstName}
                type="text"
                placeholder="first name"
                onChange={onChangeHandler}
                required
              />
            </ListGroupItem>

            <ListGroupItem>
              <Input
                name="lastName"
                value={user.lastName}
                type="text"
                placeholder="last name"
                onChange={onChangeHandler}
                required
              />
            </ListGroupItem>

            <ListGroupItem>
              <Input
                name="email"
                value={user.email}
                type="email"
                placeholder="email address"
                onChange={onChangeHandler}
                required
              />
            </ListGroupItem>

            <ListGroupItem>
              <Input
                name="password"
                value={user.password}
                type="password"
                placeholder="password"
                onChange={onChangeHandler}
                minLength="8"
                required
              />
            </ListGroupItem>

            <ListGroupItem>
              <Input
                name="confirmPassword"
                value={user.confirmPassword}
                type="password"
                placeholder="confirmPassword"
                onChange={onChangeHandler}
                minLength="8"
                required
              />
            </ListGroupItem>

            <ListGroupItem>
              <Button className="ml-auto" type="submit" color="secondary">
                register
              </Button>
            </ListGroupItem>
          </ListGroup>
        </form>
      </Container>
    </div>
  );
}

export default SignUp;
