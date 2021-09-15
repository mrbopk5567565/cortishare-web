import React, { useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Grid, Typography, Avatar, Button, TextField } from "@material-ui/core";
import useStyles from './styles';
import clsx from 'clsx';
import { PopupUpgrade } from 'components'
const BillingFree = () => {
  const classes = useStyles();
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)

  const handleClickUpgrade = () => {
    setIsOpenUpgrade(true)
  }
  const handleCloseUpgrade = () => {
    setIsOpenUpgrade(false)
  }
  return (
    <Grid>
      <Grid className={classes.billingFreeContainer}>
        <Grid className={clsx(classes.colorTitle, classes.title)}>Unlock the unlimited for your creation</Grid>
        <Grid className={classes.description}>
          There are lots of ideas and interesting posts are waiting for you. Let’s
          join us for unlimited boards and followings and expanding your creativity.
      </Grid>
        <Grid className={clsx(classes.colorTitle, classes.textUpgrade)} onClick={handleClickUpgrade}>Upgrade Plan</Grid>
      </Grid>
      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
    </Grid>

  );
};

export default connect()(BillingFree);
