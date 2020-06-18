import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Spinner, Table } from "reactstrap";

function AdminStatistic() {
  const [num_of_users, setNum_of_users] = useState(0);

  const [loading, setLoading] = useState(true);

  const [nameMostTasks, setNameMostTasks] = useState("");
  const [nameMostDone, setNameMostDone] = useState("");

  //when the component show up
  useEffect(() => {
    async function getData() {
      const userMostTasks = await axios.get("/users/mostTask");
      const fullnameMostTask = await axios.get(
        `/users/fullname/${userMostTasks.data}`
      );
      setNameMostTasks(fullnameMostTask.data);

      const userMostDone = await axios.get("/users/tasksAreDone");
      const fullnameMostDone = await axios.get(
        `/users/fullname/${userMostDone.data}`
      );
      setNameMostDone(fullnameMostDone.data);

      const NumOfUsers = await axios.get("/users");
      setNum_of_users(NumOfUsers.data.length - 1);
      setLoading(false);
    }
    getData();
  }, []);

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
                <td>{num_of_users}</td>
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
