import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Table, Button } from "reactstrap";
import TodosRemainStat from "./TodosRemainStat";
import NewTasksStat from "./NewTasksStat";
import CompletedTaskStat from "./CompletedTaskStat";

function StatisticMainPage() {
  //create mode that will change after OnClick
  const [mode, setMode] = useState();

  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>Statistic</h1>
        <br />
        <hr />
        <Table borderless>
          <thead>
            <tr>
              <th>
                <Button color="success" onClick={() => setMode(0)} block>
                  Tasks Remain
                </Button>
              </th>
              <th>
                <Button color="success" onClick={() => setMode(1)} block>
                  New Tasks
                </Button>
              </th>
              <th>
                <Button color="success" onClick={() => setMode(2)} block>
                  Completed Tasks
                </Button>
              </th>
            </tr>
          </thead>
        </Table>
        <br />
        {mode === 0 ? (
          <TodosRemainStat />
        ) : mode === 1 ? (
          <NewTasksStat />
        ) : mode === 2 ? (
          <CompletedTaskStat />
        ) : null}
      </Container>
    </div>
  );
}

export default StatisticMainPage;
