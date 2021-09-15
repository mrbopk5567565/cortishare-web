import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect } from 'react-redux';
import { Buttons, Text } from 'components'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx'
import Login from 'modules/Authentication/Login'
import ResentEmail from 'modules/Authentication/ResentEmail'

import Signup from 'modules/Authentication/SignUp'
import VerifyApp from 'modules/Authentication/VerifyApp'
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';

const mapStateToProps = (state) => {
  return {
    successLogin: state.authentication.successLogin,
    successRegister: state.authentication.successRegister,
  };
};

const Public = ({ successLogin, successRegister }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  // const [openVerifyApp, setOpenVerifyApp] = useState(false)
  const [userSignUpSuccess, setUserSignUpSuccess] = useState({
    isSuccess: false,
    username: '',
    password: '',
  })
  // const [verifyUserName, setVerifyUserName] = useState('')
  // const [openResentEmail, setOpenResentEmail] = useState(false)
  useEffect(() => {
    mixPanel.track(EventPage.ViewPublicPage)
  }, [])
  useEffect(() => {
    if (successLogin) {
      setOpenLogin(false);
    }
    if (successRegister) {
      setOpenSignUp(false);
    }
  }, [successLogin, successRegister])
  const handleLogin = () => {
    setOpenLogin(true)
  }
  // const handleClickResentEmail = () => {
  //   setOpenResentEmail(true)
  // }
  // const handleCloseResentEmail = () => {
  //   setOpenResentEmail(false)
  // }
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  const handleSignUp = () => {
    setOpenSignUp(true)
  }

  const handleSubmitSignUp = (e) => {
    setUserSignUpSuccess({
      ...userSignUpSuccess,
      username: e.userName,
      password: e.password,
      isSuccess: true,
    })
    setTimeout(() => {
      handleLogin()
    }, 700)
    // setVerifyUserName(e.userName ? e.userName : 'You');
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  // const handleVerifyApp = () => {
  //   setOpenVerifyApp(state => !state)
  // }

  return (
    <Grid container classes={{ root: classes.layout }}>
      <Grid container alignItems="center" justify="space-between" classes={{ root: classes.header }}>
        <img src={logoTextBlackHighRes} alt="" className={classes.logo} />
        <div className={classes.containerButton}>
          <Button onClick={handleLogin} classes={{ root: clsx(classes.buttons, classes.buttonLogin) }}>Login</Button>
          <Buttons classes={{ root: clsx(classes.buttons, classes.buttonSignup) }} btnType="medium" onClick={handleSignUp}>Sign Up</Buttons>
        </div>
      </Grid>
      <Grid container classes={{ root: classes.body }}>
        <Grid container alignItems="center" justify="space-between" classes={{ root: classes.bodyHead }}>
          <Grid container item sm={6} xs={12}>
            <img src={Images.icArtboard} alt="" className={classes.imageArtboard} />
          </Grid>
          <Grid container item sm={6} xs={12}>
            <span className={classes.title}>Lorem ipsum is placeholder</span>
            <span className={classes.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            <Button classes={{ root: classes.button }} onClick={setOpenSignUp}>Sign Up</Button>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center" classes={{ root: classes.containerWorks }}>
          <p className={classes.introWorks}>How it works</p>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            classes={{ root: clsx(classes.bodyHead) }}
          >
            <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.bodyHeadChild }}>
              <div className={classes.containerImage}><img src={Images.icGrainingIdeas} alt='' className={classes.imageWorks} /></div>
              <p className={classes.titleWorks}>Graining ideas</p>
              <p className={classes.descriptionWorks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Grid>
            <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.bodyHeadChild }}>
              <div className={classes.containerImage}><img src={Images.icCollaborate} alt='' className={classes.imageWorks} /></div>
              <p className={classes.titleWorks}>Collaborate</p>
              <p className={classes.descriptionWorks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Grid>
            <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.bodyHeadChild }}>
              <div className={classes.containerImage}><img src={Images.icVisualiseYourIdea} alt='' className={classes.imageWorks} /></div>
              <p className={classes.titleWorks}>Visualise your idea</p>
              <p className={classes.descriptionWorks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Grid>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="space-between" classes={{ root: classes.containerStartGaining }}>
          <Grid container item md={5} xs={12} classes={{ root: classes.containerStartGainingContent }}>
            <span className={classes.titleGaining}>Start gaining your ideas today</span>
            <p className={classes.contentGaining}>Sign Up for a free account</p>
            <Button classes={{ root: classes.button }} onClick={handleSignUp}>Sign Up</Button>
          </Grid>
          <Grid container item md={7} xs={12} classes={{ root: classes.containerImg }}>
            <img src={Images.icStartGaining} alt="" className={classes.imageArtboard1} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end" justify="center" classes={{ root: classes.footer }}>
        <Text size="mini">©CortiShare. All Right Reserved</Text>
      </Grid>
      {openLogin && 
        <Login 
          openLogin={openLogin} 
          handleClose={handleCloseLogin} 
          handleSignUp={handleSignUp}
          userSignUpSuccess={userSignUpSuccess}
        />
      }
      {
        // !openVerifyApp &&
        openSignUp &&
        <Signup
          // handleClickResentEmail={handleClickResentEmail}
          openSignUp={openSignUp}
          handleClose={handleCloseSignUp}
          // handleVerifyApp={handleVerifyApp}
          handleLogin={handleLogin}
          handleSubmitSignUp={handleSubmitSignUp}
        />
      }
      {/* {openVerifyApp && 
        <VerifyApp 
          verifyUserName={verifyUserName} 
          openVerifyApp={openVerifyApp} 
          handleVerifyApp={handleVerifyApp} 
          handleLogin={handleLogin} 
        />
      } */}
      {/* {openResentEmail && 
        <ResentEmail 
          openPopup={openResentEmail} 
          handleClose={handleCloseResentEmail} 
        />
      } */}
    </Grid>
  );
}

export default connect(mapStateToProps)(Public);