import React, { useContext, useEffect } from "react";
import Chart from "chart.js";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

function NewTasksStat() {
  //get the userID from the context
  const { userLogin } = useContext(UserContext);

  //when the component show up
  useEffect(() => {
    //async function
    async function getData() {
      //get the num of new todos in the last month
      const resMonth = await axios.get(`/todos/todosMonth/${userLogin}`);

      //get the num of new todos in the last week
      const resWeek = await axios.get(`/todos/todosWeek/${userLogin}`);

      //create an element call 'myChart'
      const ctx = document.getElementById("myChart").getContext("2d");

      //return the chart with the data
      return new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["lastWeek", "lastMonth"],
          datasets: [
            {
              data: [resWeek.data, resMonth.data],
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
            text: "new Tasks in the last Week/Month",
            fontSize: 25,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
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

export default NewTasksStat;
