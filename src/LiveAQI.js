import React, { useEffect } from "react";

import { Doughnut } from "react-chartjs-2";

function LiveAQI(props) {
  const { aqiVal, aqiMax, aqiMin, statusBrkPoints } = props;

  useEffect(() => {});

  const dataValue = ((aqiVal - aqiMin) / (aqiMax - aqiMin)) * 100;
  const dataBgColor =
    aqiVal >= statusBrkPoints[1]
      ? "#FD413C"
      : aqiVal >= statusBrkPoints[0]
      ? "#FEBC2C"
      : "#5CDB95";

  return (
    <Doughnut
      data={{
        datasets: [
          {
            backgroundColor: [dataBgColor, "#303439"],
            borderWidth: 0,
            data: [dataValue, 100 - dataValue]
          }
        ],
        labels: [`AQI: ${aqiVal}`, ""]
      }}
      options={{
        cutoutPercentage: 70,
        rotation: 0.75 * Math.PI,
        circumference: 1.5 * Math.PI,
        legend: {
          position: "bottom",
          labels: {
            fontSize: 18,
            fontFamily: "Barlow",
            fontStyle: "bold",
            fontColor: "#fafafa",
            filter: (legendItem, data) => legendItem.index === 0
          }
        },
        tooltips: {
          callbacks: {
            label: (toolTipItem, data) => {
              return toolTipItem.datasetIndex === 0 ? aqiVal : null;
            },
            labelColor: (toolTipItem, chart) => {
              return {
                backgroundColor: chart.data.datasets[0].backgroundColor[0]
              };
            }
          }
        }
      }}
    />
  );
}

export default LiveAQI;
