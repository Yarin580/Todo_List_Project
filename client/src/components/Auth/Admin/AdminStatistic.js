import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Spinner, Table } from "reactstrap";

function AdminStatistic() {
  const [info, setInfo] = useState({
    userID_most_Task: "",
    numOf_task: 0,
    num_of_users: null,
    userID_most_Task_done: "",
  });

  const [loading, setLoading] = useState(true);

  const [nameMostTasks, setNameMostTasks] = useState("");
  const [nameMostDone, setNameMostDone] = useState("");

  //when the component show up
  useEffect(() => {
    getUserFullNameMostTasks(info.userID_most_Task);
    getUserFullNameMostDone(info.userID_most_Task_done);
    getNumOfUsers();
  });

  //get num of the users in the system
  function getNumOfUsers() {
    axios.get("/users").then((res) => {
      setInfo({ ...info, num_of_users: res.data.length });
    });
  }

  //get the id of the user with the most tasks
  function userIdWithMostTask() {
    axios
      .get("/users/mostTask")
      .then((res) => {
        setInfo({ ...info, userID_most_Task: res.data });
      })
      .catch((err) => console.log(err));
  }

  //get the id of the user with the most done tasks
  function userIdMostDone() {
    axios
      .get("/users/tasksAreDone")
      .then((res) => {
        setInfo({ ...info, userID_most_Task_done: res.data });
      })
      .catch((err) => console.log(err));
  }

  //get the full name of the user with the most tasks/or user with most tasks are done
  function getUserFullNameMostTasks(id) {
    userIdWithMostTask();

    axios.get(`/users/fullname/${id}`).then((res) => {
      setNameMostTasks(res.data);
    });
  }

  //get full name of the user with the same id
  function getUserFullNameMostDone(id) {
    userIdMostDone();

    axios.get(`/users/fullname/${id}`).then((res) => {
      setNameMostDone(res.data);
      setLoading(false);
    });
  }

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>Statistic</h1>
        <br />
        <hr />
        {loading ? (
          <span
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              style={{ width: "10rem", height: "10rem", position: "fixed" }}
            />
          </span>
        ) : (
          <Table striped>
            <tbody>
              <tr>
                <td>Amount of users in the system:</td>
                <td>{info.num_of_users}</td>
              </tr>
              <tr>
                <td> name of the user with the most task:</td>
                <td>{nameMostTasks}</td>
              </tr>
              <tr>
                <td> name of the user with the most task:</td>
                <td>{nameMostDone}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
export default AdminStatistic;
