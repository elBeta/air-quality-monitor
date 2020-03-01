import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Line } from "react-chartjs-2";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2rem",
    background: "#2A2E32",
    borderRadius: "1.5rem"
  },
  titleTypoHolder: {
    paddingBottom: "1rem"
  },
  titleTypo: {
    fontFamily: "Roboto",
    fontWeight: 500,
    color: "#fafafa"
  }
}));

function AQIGraph(props) {
  const { aqiData, statusBrkPoints, setUpdateFreq } = props;
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
      <Grid container>
        <Grid container item xs={12}>
          <Grid item className={classes.titleTypoHolder}>
            <Typography variant="h4" className={classes.titleTypo}>
              AQI Graph
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default AQIGraph;
