import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Line } from "react-chartjs-2";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "1.5rem",
    background: "#2A2E32",
    borderRadius: "1.5rem"
  }
}));

function AQIGraph(props) {
  const { aqiData, statusBrkPoints } = props;
  const classes = useStyles();

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
    <div className={classes.root}>
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
    </div>
  );
}

export default AQIGraph;
