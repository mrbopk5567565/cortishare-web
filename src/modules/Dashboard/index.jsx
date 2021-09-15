import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100vh'
    }
  })
);

const Dashboard = () => {
  const classes = useStyles();
console.log("vo day");
  return (
    <div className={classes.root}>
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
