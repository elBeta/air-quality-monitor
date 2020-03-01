import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

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

function AQIForecast(props) {
  const { aqiValues, statusBrkPoints } = props;
  const classes = useStyles({ statusBrkPoints });

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item className={classes.titleTypoHolder}>
            <Typography variant="h4" className={classes.titleTypo}>
              Forecast
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid item xs={12}>
          <ForecastResults
            aqiValues={aqiValues}
            statusBrkPoints={statusBrkPoints}
            classes={classes}
          />
        </Grid>
      </Grid>
    </div>
  );
}

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

function ForecastResults(props) {
  const { aqiValues, statusBrkPoints, classes } = props;
  const [curPage, setCurPage] = useState(0);
  const mobileMode = useWidth() === "xs";
  const [itemsPerPage, setItemsPerPage] = useState(mobileMode ? 3 : 2);
  const lastPage = Math.ceil(aqiValues.length / itemsPerPage) - 1;
  console.log(lastPage);

  useEffect(() => {
    setItemsPerPage(mobileMode ? 3 : 2);
  }, [mobileMode]);

  const handlePrevClick = () => {
    if (curPage > 0) {
      setCurPage(curPage - 1);
    }
  };

  const handleNextClick = () => {
    if (curPage < lastPage) {
      setCurPage(curPage + 1);
    }
  };

  const displayItems = [];

  for (let i = 0; i < itemsPerPage; i++) {
    if (curPage * itemsPerPage + i < aqiValues.length) {
      displayItems.push(
        <Grid item xs={4} sm={6}>
          <DisplayItem
            aqiVal={aqiValues[curPage * itemsPerPage + i]}
            statusBrkPoints={statusBrkPoints}
            classes={classes}
          />
        </Grid>
      );
    }
  }

  return (
    <Grid container wrap="nowrap">
      <Grid item>
        <IconButton disabled={curPage === 0} onClick={handlePrevClick}>
          <ArrowLeft />
        </IconButton>
      </Grid>
      <Grid container justify="center" item>
        {displayItems}
      </Grid>
      <Grid item>
        <IconButton disabled={curPage === lastPage} onClick={handleNextClick}>
          <ArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function DisplayItem(props) {
  const { aqiVal, statusBrkPoints, classes } = props;

  const aqiTypoColor =
    aqiVal >= statusBrkPoints[1]
      ? "#FD413C"
      : aqiVal >= statusBrkPoints[0]
      ? "#FEBC2C"
      : "#5CDB95";

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ color: aqiTypoColor }}>
          {aqiVal}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ color: "#fafafa" }}>
          AQI
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AQIForecast;
