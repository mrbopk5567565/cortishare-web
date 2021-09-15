import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import { Text } from 'components'
import Login from 'modules/Authentication/Login'
import Signup from 'modules/Authentication/SignUp'
import VerifyApp from 'modules/Authentication/VerifyApp'

const ContinueViewing = () => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openVerifyApp, setOpenVerifyApp] = useState(false)
  const [verifyUserName, setVerifyUserName] = useState('')

  const handleLogin = () => {
    setOpenLogin(true)
  }

  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  const handleSignUp = () => {
    setOpenSignUp(true)
  }

  const handleSubmitSignUp = (e) => {
    setVerifyUserName(e.userName ? e.userName : 'You');
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  const handleVerifyApp = () => {
    setOpenVerifyApp(state => !state)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        classes={{ root: classes.layoutLogin }}
      >
        <Grid container alignItems="center" direction="column" classes={{ root: classes.layoutContainer }}>
          <Text classes={{ root: classes.title }}>Do you want to continue viewing?</Text>
          <Text size="large" classes={{ root: classes.description }}>Sign up for a free account to continue viewing</Text>
          <Button classes={{ root: classes.containerButton }} onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </Grid>
      </Grid>
      {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} handleSignUp={handleSignUp} />}
      {!openVerifyApp && openSignUp && <Signup openSignUp={openSignUp} handleClose={handleCloseSignUp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} handleSubmitSignUp={handleSubmitSignUp} />}
      {openVerifyApp && <VerifyApp verifyUserName={verifyUserName} openVerifyApp={openVerifyApp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} />}
    </div>
  );
}

export default ContinueViewing;