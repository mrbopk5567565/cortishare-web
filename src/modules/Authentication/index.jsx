import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Login from './Login';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100vh'
    }
  })
);

const Authentication = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Login />
    </div>
  );
}

export default Authentication;
