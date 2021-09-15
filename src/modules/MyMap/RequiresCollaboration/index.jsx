import React, { useState } from 'react';
import { Dialog, DialogContent, Grid, Hidden, Button } from '@material-ui/core';
import useStyles from './styles';
import { Buttons, Text, Tooltips } from 'components'
import Login from 'modules/Authentication/Login'
import Signup from 'modules/Authentication/SignUp'
import { useSelector } from 'react-redux';
import clsx from 'clsx'
import { checkLongString } from 'helpers'

const RequiresCollaboration = ({ open, handleClose, reject, accept }) => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const mapRequested = useSelector((state) => state.notification.mapRequested)

  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  const handleLogin = () => {
    setOpenLogin(true)
  }

  const handleSignUp = () => {
    setOpenSignUp(true)
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
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
        disableBackdropClick={true}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="center"
            classes={{ root: classes.layoutLogin }}
          >
            <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
              <Text classes={{ root: clsx(classes.title, mapRequested && mapRequested.type !== 'MapSharing' && classes.titleRequested) }}>
                {mapRequested && mapRequested.type === 'MapSharing' ? 
                  <>
                    User 
                    <Tooltips title={mapRequested.userName}>
                      <span>{` ${checkLongString(mapRequested.userName, 15, 10) } `}</span>
                    </Tooltips>
                    has invited you to collaborate
                  </>
                  : 
                  <>
                    User 
                    <Tooltips title={mapRequested.userName}>
                      <span>{` ${checkLongString(mapRequested.userName, 15, 10) } `}</span>
                    </Tooltips>
                    has requested to view your board
                  </>
                }
              </Text>
              <Text classes={{ root: classes.description }}>Do you want to accept?</Text>
              <Grid container item justify="center" alignItems="center" classes={{ root: classes.containerButton }}>
                <Hidden smUp>
                  <Text size="small" type="bold" handleClick={handleClose}><span>No</span></Text>
                </Hidden>
                <Hidden xsDown>
                  <Button classes={{ root: classes.button }} onClick={reject}>No</Button>
                </Hidden>
                <Buttons btnType="large" onClick={accept}>Yes</Buttons>
              </Grid>
            </Grid>
          </Grid>
          {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} handleSignUp={handleSignUp} />}
          {openSignUp && <Signup openSignUp={openSignUp} handleClose={handleCloseSignUp} handleLogin={handleLogin}/>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RequiresCollaboration;