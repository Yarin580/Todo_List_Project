import React, { useContext, useEffect } from "react";
import Chart from "chart.js";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

function TodosRemainStat() {
  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  //when the component show up
  useEffect(() => {
    //async function
    async function getData() {
      //get the num of todos are not done
      const resNotDone = await axios.get(
        `/todos/numOfTodosAreNotDone/${userLogin}`
      );

      //get the num of done todos
      const resDone = await axios.get(`/todos/numOfTodosAreDone/${userLogin}`);

      //create an element call 'myChart'
      const ctx = document.getElementById("myChart").getContext("2d");

      //return the chart with the data
      return new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Done", "NotDone"],
          datasets: [
            {
              data: [resDone.data, resNotDone.data],
              backgroundColor: [
                "rgba(0, 255, 255, 0.6)",
                "rgba(0, 0, 255, 0.6)",
              ],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "todos Done/not Done",
            fontSize: 25,
          },
          legend: {
            display: true,
            position: "right",
          },
          responsive: true,
        },
      });
    }
    getData();
  }, [userLogin]);

  return (
    <div>
      <canvas id="myChart" />
    </div>
  );
}

export default TodosRemainStat;
