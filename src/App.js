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
import MaterialTable from "material-table";

import LiveAQI from "./LiveAQI";
import AQIGraph from "./AQIGraph";
import AQIForecast from "./AQIForecast";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
  const [statusBrkPoints, setStatusBrkPoints] = useState([90, 120]);
  const [aqiMinMax, setAQIMinMax] = useState([30, 150]);
  const [alertList, setAlertList] = useState([]);

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
    const aqiVal = parseInt(inc_data["aqi"]);

    // setAQIData(aqiData.concat(aqiVal));
    aqiData.push(aqiVal);
    if (aqiData.length > 8) {
      aqiData.unshift();
    }
    // setAQIData(aqiData.concat(1));
    console.log(aqiData);

    setForecastValues(JSON.parse(inc_data["aqi_forecast"]));

    if (aqiVal > statusBrkPoints[1]) {
      setAlertList(
        alertList.concat({
          aqi: aqiVal,
          level: 1
        })
      );
    } else if (aqiVal > statusBrkPoints[0]) {
      setAlertList(
        alertList.concat({
          aqi: aqiVal,
          level: 0
        })
      );
    }
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
                alertList={alertList}
              />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}

function Dashboard(props) {
  const {
    aqiData,
    statusBrkPoints,
    forecastValues,
    aqiMinMax,
    alertList
  } = props;

  return (
    <Grid container>
      <Grid container spacing={2} item xs={12} sm={10}>
        <Grid container spacing={2} direction="row-reverse" item xs={12}>
          <Grid item xs={12} sm={9}>
            <div style={{ width: "100%" }}>
              <MaterialTable
                columns={[
                  { title: "AQI", field: "aqi" },
                  { title: "Warning Level", field: "level" }
                ]}
                data={alertList}
                title="Alerts"
                icons={tableIcons}
              />
            </div>
          </Grid>
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
