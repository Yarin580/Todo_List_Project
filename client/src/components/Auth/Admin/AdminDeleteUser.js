import React, { useState, useContext } from "react";
import { Container } from "@material-ui/core";
import { Input, Button, Table } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

function AdminDeleteUser() {
  const [usersList, setUsersList] = useState({
    users: [],
  });

  // get the userID from the context
  const { userLogin } = useContext(UserContext);

  const [find, setFind] = useState({
    value: "firstName",
    data: "",
  });
  //update the state with the current value
  function onChangeFindSelect(e) {
    setFind({ ...find, value: e.target.value });
  }

  //update the state
  function onChangeInputText(e) {
    setFind({ ...find, data: e.target.value });
  }

  //delete the user
  function deleteUser(id) {
    //delete the user with the same ID
    axios.delete(`users/todos/${id}`).then((res) => {
      console.log(res);
      getUsers();
    });
  }

  //get the users
  function getUsers(e) {
    if (e) e.preventDefault();

    axios
      .post("/users/find", find)
      .then((res) => setUsersList({ users: res.data }))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>Delete User</h1>
        <br />
        <hr />
        <form onSubmit={getUsers}>
          <table>
            <tr>
              <td>
                <Input
                  type="select"
                  name="findSelect"
                  id="findSelect"
                  onChange={onChangeFindSelect}
                >
                  <option value="firstName">firstName</option>
                  <option value="lastName">lastName</option>
                  <option value="email">email</option>
                </Input>
              </td>
              <td style={{ width: "85%" }}>
                <Input
                  type="text"
                  placeholder="wirte..."
                  value={find.data}
                  onChange={onChangeInputText}
                />
              </td>
            </tr>
          </table>
          <Button color="primary" type="submit" block>
            search
          </Button>
        </form>
        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersList.users.map((user) =>
              //show the users without the admin
              userLogin !== user._id ? (
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button color="danger" onClick={() => deleteUser(user._id)}>
                      DELETE
                    </Button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminDeleteUser;
