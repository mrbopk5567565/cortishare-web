import React, { useState } from 'react';
import { Dialog, Grid, Hidden, DialogContent } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { Buttons, Text, Inputs } from 'components'
import ResetPassword from '../ResetPassword'
import Signup from '../SignUp'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"
import { LOGIN_REQUEST } from 'redux/reducers/authentication/actionTypes';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Loading } from 'components';
import { mixPanel } from 'services/mixpanel';
import { EventPage, PropertyName } from 'constants/mixpanel';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';
import ResentEmail from 'modules/Authentication/ResentEmail'

const Login = ({ openLogin, handleClose, handleSignUp, userSignUpSuccess }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();
  const isLoading = useSelector((state) => state.global.isLoading)
  const [openForgotPassword, setOpenForgotPassword] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openResentEmail, setOpenResentEmail] =useState(false)
  const matchDashboard = useRouteMatch('/');

  const onSubmit = values => {
    const { username, password } = values;
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        usernameOrEmail: username,
        password: password,
      },
      isReload: (matchDashboard && matchDashboard.isExact) ? false : true,
      history,
      onSuccess: (info) => {
        handleClose()
        handleTracking(info)
      }
    })
  };

  const handleTracking = (info) => {
    mixPanel.track(EventPage.Login, {
      [PropertyName.Login_UserEmail]: info.userName,
      [PropertyName.Login_UserEmail]: info.email
    })
  }

  const handleForgot = () => {
    // history.push('/forgot-password')
    setOpenForgotPassword(true)
  }

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false)
  }

  const handleOpenSignUp = () => {
    handleClose()
    handleSignUp()
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }
  const handleClickResentEmail = () => {
    setOpenResentEmail(true)
  }
  const handleCloseResentEmail = () => {
    setOpenResentEmail(false)
  }
  return (
    <div className={classes.root}>
      <Dialog
        open={openLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.container,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Hidden smUp>
            <div className={classes.buttonClose} onClick={handleClose}>
              <img src={Images.icCloseBig} />
            </div>
          </Hidden>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="space-between"
            classes={{ root: classes.layoutLogin }}
          >
            <Grid container alignItems="center" direction="column" justify="center" classes={{ root: classes.layoutContainer }} direction="column">
              <img src={logoTextBlackHighRes} className={classes.containerLogoLogin} />
              <Grid container alignItems="flex-start" justify="center">
                {isLoading && <Loading />}
                <form
                  className={classes.formLogin}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Inputs
                    title="Username/Email"
                    placeholder="Username/Email"
                    name="username"
                    register={register}
                    required={true}
                    errors={errors}
                    // defaultValue={userSignUpSuccess.username ? userSignUpSuccess.username : ''}
                  />
                  <Inputs
                    title="Password"
                    placeholder="Password"
                    name="password"
                    showEyes={true}
                    type="password"
                    register={register}
                    required={true}
                    errors={errors}
                    isValidatePassword={false}
                    // defaultValue={userSignUpSuccess.password ? userSignUpSuccess.password : ''}
                  />

                  <Grid container item justify="space-between" alignItems="center" classes={{ root: classes.containerButton }}>
                    <Text size="small" handleClick={handleForgot}>Forgot Password</Text>
                    <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">Login</Buttons>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <Grid
              classes={{ root: classes.layoutFooter }}
              container
              justify="center"
              alignItems="center"
            >
              <Text size="large">Don't have an account? <span className={classes.textLink} onClick={handleOpenSignUp}>Sign Up</span></Text>
            </Grid>
            {openForgotPassword && <ResetPassword handleClose={handleCloseForgotPassword} />}
          </Grid>
        </DialogContent>
        {openSignUp && <Signup handleClickResentEmail={handleClickResentEmail} openSignUp={openSignUp} handleClose={handleCloseSignUp} />}
        {openResentEmail && <ResentEmail openPopup={openResentEmail} handleClose={handleCloseResentEmail} />}
      </Dialog>
    </div>
  );
}

export default Login;