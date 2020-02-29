import React from "react";
import { Line } from "react-chartjs-2";

function AQIGraph(props) {
  const { aqiData, statusBrkPoints } = props;

  const xValues = [],
    pointColors = [];
  for (let i = 0; i < aqiData.length; i++) {
    xValues.push(i);
    pointColors.push(
      aqiData[i] >= statusBrkPoints[1]
        ? "#FD413C"
        : aqiData[i] >= statusBrkPoints[0]
        ? "#FEBC2C"
        : "#5CDB95"
    );
  }

  return (
    <Line
      type="line"
      data={{
        datasets: [
          {
            label: "AQI",
            data: aqiData,
            pointBackgroundColor: pointColors,
            pointRadius: 3,
            borderColor: "#43484D",
            borderWidth: 1
          }
        ],
        labels: xValues
      }}
      legend={{
        display: false
      }}
      options={{
        scales: {
          xAxes: [
            {
              ticks: { fontColor: "#fafafa", fontSize: 14 }
            }
          ],
          yAxes: [
            {
              ticks: { fontColor: "#fafafa", fontSize: 14 }
            }
          ]
        }
      }}
    />
  );
}

export default AQIGraph;
