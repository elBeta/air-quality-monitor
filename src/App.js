import React from "react";
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

import LiveAQI from "./LiveAQI";

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
              <Dashboard />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}

function Dashboard(props) {
  return (
    <Grid container>
      <Grid container item xs={12} sm={10}>
        <Grid container direction="row-reverse" item xs={12}>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={3}>
            <LiveAQI aqiMin={70} aqiMax={90} aqiVal={74} status={0} />
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" item xs={12}>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={8}></Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={2}>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
}

export default App;
