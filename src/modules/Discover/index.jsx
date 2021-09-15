import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Maps from './Maps'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // height: '100vh'
    }
  })
);

const Discover = () => {
  const classes = useStyles();
  console.log("vo day");
  return (
    <div className={classes.root}>
      <Maps />
    </div>
  );
}

export default Discover;
