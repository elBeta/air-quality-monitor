import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  appBar: {
    background: "#212529"
  },
  root: {
    minHeight: "100vh",
    width: "100%",
    background: "#212529"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>Air Monitoring System</Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Dashboard />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

function Dashboard(props) {
  return (
    <Grid container>
      <Grid container item xs={12} sm={10}>
        <Grid container direction="row-reverse" item xs={12}>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={3}></Grid>
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
