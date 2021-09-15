import React, { useState, useEffect } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { Buttons, Text, Inputs } from 'components'
import ResetPassword from 'modules/Authentication/ResetPassword'
import Signup from 'modules/Authentication/SignUp'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { LOGIN_REQUEST } from 'redux/reducers/authentication/actionTypes';
import { useDispatch, connect } from 'react-redux';
import { mixPanel } from 'services/mixpanel';
import { EventPage, PropertyName } from 'constants/mixpanel';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';
import ResentEmail from 'modules/Authentication/ResentEmail'

const mapStateToProps = (state) => {
  return {
    successLogin: state.authentication.successLogin,
    successRegister: state.authentication.successRegister,
  };
};

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();
  const [openForgotPassword, setOpenForgotPassword] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openResentEmail, setOpenResentEmail] = useState(false)

  const onSubmit = values => {
    const { username, password } = values;
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        usernameOrEmail: username,
        password: password,
      },
      history,
      isReload: false,
      onSuccess: (info) => {
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
    history.push('/sign-up')
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
    <Grid container classes={{ root: classes.container }}>
      <Hidden smDown>
        <Grid
          item
          md={8}
          container
          classes={{ root: classes.containerLeft }}
          justify="center"
        >
          <div className={classes.containerLogo}>
            <img src={logoTextBlackHighRes} alt="logo-cortishare" />
          </div>
          <Grid container item direction="column" classes={{ root: classes.containerArtboard }} >
            <img src={Images.icArtboard} alt="" />
            <Grid container item justify="center" classes={{ root: classes.body }}>
              <Text classes={{ root: classes.titleWorks }}>
                Build, Store and Share Knowledge Like Never Before.
              </Text>
              <Text classes={{ root: classes.descriptionWorks }}>
                CortiShare is the best place for your ideas, notes, useful weblinks and multimedia.
                Create a Board to store all that you know in a hyper-structured fashion.
                Get your friends and fans to follow you and tap onto like-minded people's frameworks to grow your knowledge base.
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Grid item sm={12} md={4} container classes={{ root: classes.containerRight }}>
        <Grid container justify="center" alignItems="center" direction="column">
          <form
            className={classes.formLogin}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Hidden smDown>
              <Text classes={{ root: classes.wellcome }}>Welcome to CortiShare</Text>
            </Hidden>
            <Hidden mdUp>
              <Grid container classes={{ root: classes.containerLogoForm }} justify="center">
                <img src={logoTextBlackHighRes} alt="logo-cortishare" />
              </Grid>
            </Hidden>
            <Inputs
              title="Username/Email"
              placeholder="Username/Email"
              name="username"
              register={register}
              required={true}
              errors={errors}
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
            />

            <Grid container item justify="space-between" alignItems="center" classes={{ root: classes.containerButton }}>
              <Text size="small" handleClick={handleForgot}>Forgot Password</Text>
              <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">Login</Buttons>
            </Grid>
          </form>
          <Grid
            classes={{ root: classes.layoutFooter }}
            container
            justify="center"
            alignItems="center"
          >
            <Text size="large">Don't have an account? <span className={classes.textLink} onClick={handleOpenSignUp}>Sign Up</span></Text>
          </Grid>
        </Grid>

        {openForgotPassword && <ResetPassword handleClose={handleCloseForgotPassword} />}
        {openSignUp && <Signup handleClickResentEmail={handleClickResentEmail} openSignUp={openSignUp} handleClose={handleCloseSignUp} />}
        {openResentEmail && <ResentEmail openPopup={openResentEmail} handleClose={handleCloseResentEmail} />}

      </Grid>
    </Grid>
  );
}
export default connect(mapStateToProps)(LoginPage);