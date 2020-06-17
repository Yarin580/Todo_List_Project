import React, { useEffect, useState, useContext } from "react";
import { Container } from "@material-ui/core";
import { Table } from "reactstrap";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

function AdminUserList() {
  const [usersList, setUsersList] = useState({
    users: [],
  });

  //get the user from the context
  const { userLogin } = useContext(UserContext);

  //when the component show up => call to getUsers function
  useEffect(() => {
    getUsers();
  });

  //get all the user in the system
  function getUsers() {
    axios
      .get("/users")
      .then((res) => {
        setUsersList({ users: res.data });
      })
      .catch(() => {
        alert("somthing goes worng");
      });
  }

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>Users List</h1>
        <br />
        <hr />

        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
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
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminUserList;
