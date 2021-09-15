import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100vh'
    }
  })
);

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>Profile</p>
    </div>
  );
}

export default Profile;
