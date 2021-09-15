import React, { useState } from 'react';
import { Dialog, DialogContent, Grid, Hidden } from '@material-ui/core';
import useStyles from './styles';
import { Buttons, Text } from 'components'
import Login from 'modules/Authentication/Login'
import Signup from 'modules/Authentication/SignUp'
import VerifyApp from 'modules/Authentication/VerifyApp'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx'

const RequestFollow = ({ open, handleClose, confirm }) => {
  const classes = useStyles();
  const history = useHistory();
  const customer = JSON.parse(localStorage.getItem('customer'))
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openVerifyApp, setOpenVerifyApp] = useState(false)
  const [verifyUserName, setVerifyUserName] = useState('')
  const dataHeader = useSelector((state) => state.global.dataHeader)
  
  let buttonBack = customer ? 'Back' : 'Back to Login';

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

  const handleBack = () => {
    if (customer) {
      history.goBack()
    }
    else {
      history.push('/')
    }
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.container }}
        BackdropProps={{
          style: {
            backgroundColor: 'unset',
          }
        }}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="center"
            classes={{ root: classes.layoutLogin }}
          >
            {dataHeader.privacy === 'private' ?
              <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainerPrivate }}>
                <Hidden smUp>
                  <Text classes={{ root: clsx(classes.title, classes.titlePrivate) }}>This board has been made private</Text>
                </Hidden>
                <Hidden xsDown>
                  <Text classes={{ root: classes.title }}>This board has been made private by the owner</Text>
                </Hidden>
                <Grid container item justify="center" alignItems="center" classes={{ root: classes.containerButton }}>
                  <Buttons classes={{ root: classes.buttonBack }} btnType="large" onClick={handleBack}>{buttonBack}</Buttons>
                </Grid>
              </Grid>
              :
              <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
                <Hidden smUp>
                  <Text classes={{ root: classes.title }}>You don’t have access to view this board</Text>
                </Hidden>
                <Hidden xsDown>
                  <Text classes={{ root: classes.title }}>Wait...You don’t have access to view this board</Text>
                </Hidden>
                <Text size="medium" classes={{ root: classes.description }}>{customer ? 'Sending request to the board’s owner to view' : 'Please Log In / Sign Up to view this board'}</Text>
                <Grid container item justify="space-between" alignItems="center" classes={{ root: classes.containerButton }}>
                  {customer ?
                    <>
                      <Text size="small" type="bold" handleClick={handleClose}><span>Cancel</span></Text>
                      <Buttons btnType="large" onClick={confirm}>Send Request</Buttons>
                    </>
                    :
                    <>
                      <Text size="small" type="bold" handleClick={() => setOpenSignUp(true)}><span>Sign Up</span></Text>
                      <Buttons btnType="large" onClick={() => setOpenLogin(true)}>Log In</Buttons>
                    </>
                  }
                </Grid>
              </Grid>
            }
          </Grid>
          {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} handleSignUp={handleSignUp} />}
          {!openVerifyApp && openSignUp && <Signup openSignUp={openSignUp} handleClose={handleCloseSignUp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} handleSubmitSignUp={handleSubmitSignUp} />}
          {openVerifyApp && <VerifyApp verifyUserName={verifyUserName} openVerifyApp={openVerifyApp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RequestFollow;