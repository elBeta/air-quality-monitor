import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useSocket from "use-socket.io-client";

import LiveAQI from "./LiveAQI";
import AQIGraph from "./AQIGraph";
import AQIForecast from "./AQIForecast";

let theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: "Barlow"
    }
  })
);

const useStyles = makeStyles(theme => ({
  appBarTitleTypo: {
    color: "#fafafa",
    fontWeight: 700
  },
  appBar: {
    background: "#212529"
  },
  root: {
    minHeight: "100vh",
    width: "100%",
    background: "#212529",
    padding: "2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem"
    }
  },
  dashboardTitleTypo: {
    color: "#fafafa",
    fontWeight: 700
  },
  offset: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();
  const [aqiData, setAQIData] = useState([]);
  const [forecastValues, setForecastValues] = useState({});
  const [statusBrkPoints, setStatusBrkPoints] = useState([30, 45]);
  const [aqiMinMax, setAQIMinMax] = useState([30, 90]);

  // const getRandomInt = (min, max) => {
  //   // The maximum is exclusive and the minimum is inclusive
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };

  // const genRandomAQI = () => {
  //   const randAQI = getRandomInt(70, 90);
  //   setAQIData(aqiData.concat(randAQI));
  // };

  // useEffect(() => {
  //   const timer = setInterval(genRandomAQI, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const [socket] = useSocket("192.168.43.60:1400", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
  });

  const handleDataRecieve = incData => {
    let inc_data = JSON.parse(incData);
    console.log(`Recieved Incoming data`);
    console.log(inc_data);
    // setAQIData(aqiData.concat(parseFloat(inc_data["aqi"])));
    setAQIData(aqiData.concat(1));
    console.log(aqiData);

    setForecastValues(inc_data["aqi_forecast"]);
  };

  socket.on("data", handleDataRecieve);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" className={classes.appBarTitleTypo}>
              Air Monitoring System
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.dashboardTitleTypo}>
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Dashboard
                aqiData={aqiData}
                statusBrkPoints={statusBrkPoints}
                forecastValues={forecastValues}
                aqiMinMax={aqiMinMax}
              />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}

function Dashboard(props) {
  const { aqiData, statusBrkPoints, forecastValues, aqiMinMax } = props;

  return (
    <Grid container>
      <Grid container spacing={2} item xs={12} sm={10}>
        <Grid container direction="row-reverse" item xs={12}>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={3}>
            <LiveAQI
              aqiMin={aqiMinMax[0]}
              aqiMax={aqiMinMax[1]}
              aqiVal={aqiData[aqiData.length - 1]}
              statusBrkPoints={statusBrkPoints}
            />
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" spacing={2} item xs={12}>
          <Grid item xs={12} sm={4}>
            <AQIForecast
              forecastValues={forecastValues}
              statusBrkPoints={statusBrkPoints}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <AQIGraph aqiData={aqiData} statusBrkPoints={statusBrkPoints} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={2}>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
}

export default App;
