import React, { useState, useContext } from "react";
import { ListGroup, ListGroupItem, Button, Input } from "reactstrap";
import { Container } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // get the userID from the context
  const { setUserLogin } = useContext(UserContext);

  const history = useHistory();

  //change user state
  function onChangeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    //get the user with the same email
    axios.get(`/users/login/${user.email}`).then((res) => {
      //
      //check if the password in the user state snd the user in the DB are the same
      if (res.data[0].password === user.password) {
        setUserLogin(res.data[0]);
        history.push("/");
      }

      //if not display alert
      else {
        alert("email/password are incorect");
      }
    });
  }

  return (
    <div>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <ListGroup>
            <ListGroupItem>
              <Input
                name="email"
                value={user.email}
                type="email"
                placeholder="email address"
                onChange={onChangeHandler}
              />
            </ListGroupItem>

            <ListGroupItem>
              <Input
                name="password"
                value={user.password}
                type="password"
                placeholder="password"
                onChange={onChangeHandler}
              />
            </ListGroupItem>

            <ListGroupItem>
              <Button className="ml-auto" type="submit" color="secondary">
                login
              </Button>
            </ListGroupItem>

            <ListGroupItem>
              <a href="/SignUp">
                <Button className="ml-auto" color="secondary" type="button">
                  register
                </Button>
              </a>
            </ListGroupItem>
          </ListGroup>
        </form>
      </Container>
    </div>
  );
}

export default Login;
