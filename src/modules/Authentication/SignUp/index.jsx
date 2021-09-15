import React, { useState, useRef, lazy, useEffect } from 'react';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  DialogContent,
  Dialog,
  Box,
  Hidden,
} from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { Buttons, Text, Inputs } from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import { Loading } from 'components';
import Login from '../Login'
import { REGISTER_REQUEST, LOGIN_REQUEST } from 'redux/reducers/authentication/actionTypes';
import VerifyApp from 'modules/Authentication/VerifyApp';
import { mixPanel, } from 'services/mixpanel';
import { EventPage, PropertyName } from 'constants/mixpanel';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';
import { ConversionsAPIFacebook } from 'services/CAPI'
const PopupTermsAndConditions = lazy(() => import('./components/PopupTermsAndConditions'));


const Signup = ({ openSignUp, handleClose, handleLogin, handleVerifyApp, handleSubmitSignUp, handleClickResentEmail }) => {
  const classes = useStyles()
  const [openLogin, setOpenLogin] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();
  const [termAndConditions, setTermAndConditions] = useState(false)
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: "onBlur"
  });
  const password = useRef({});
  const isLoading = useSelector((state) => state.global.isLoading)
  const termsAndConditionsRef = useRef();
  const matchDashboard = useRouteMatch('/');


  //CAPI
  useEffect(() => {
    const data = {
      event_name: 'PageView',
      user_data: {
        email: ['non_user@mail.com'],
      },
      custom_data: {
        content_name: 'Open SignUp',
      }
    }
    ConversionsAPIFacebook(data)
  }, [])


  password.current = watch("password", "");

  const passwordValue = watch("password");
  const confirmPassword = watch("confirmPassword");

  // useEffect(() => {
  //   if (passwordValue == confirmPassword) {
  //     setError("confirmPassword", {
  //       message: ""
  //     });
  //   }
  // }, [passwordValue, confirmPassword])
  const onSubmit = values => {
    const { email, username, password } = values;
    if (termAndConditions) {
      dispatch({
        type: REGISTER_REQUEST,
        payload: {
          email: email,
          userName: username,
          password: password,
        },
        callBack: (e) => {
          // handleVerifyApp();
          // handleSubmitSignUp(e);

          //mixPanel
          mixPanel.track(EventPage.SignUp)

          //CAPI
          const data = {
            event_name: 'Lead',
            user_data: {
              email: [e.email]
            },
            custom_data: {
              content_name: 'Successfully SignUp',
            }
          }
          ConversionsAPIFacebook(data)

          // login
          dispatch({
            type: LOGIN_REQUEST,
            payload: {
              usernameOrEmail: e.userName,
              password: e.password,
            },
            isReload: (matchDashboard && matchDashboard.isExact) ? false : true,
            history,
            onSuccess: (info) => {
              handleTracking(info)
            }
          })

          // handleClose()
        },
        history
      })
    }
  }

  const handleTracking = (info) => {
    mixPanel.track(EventPage.Login, {
      [PropertyName.Login_UserEmail]: info.userName,
      [PropertyName.Login_UserEmail]: info.email
    })
  }

  const handleChange = e => {
    setTermAndConditions(!termAndConditions)
  }

  const handleOpenLogin = () => {
    handleLogin()
    handleClose()
  }
  // const handleOpenResentMail =() => {
  //   handleClickResentEmail()
  //   handleClose()
  // }

  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  const handleSetError = ({ name, error}) => {
    setError(name, {
      message: error
    });
  }

  const handleShowTermsAndConditions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    termsAndConditionsRef.current.onOpen();
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={openSignUp}
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
              <img src={Images.icCloseBig} alt="close-dialog" />
            </div>
          </Hidden>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="space-between"
            classes={{ root: classes.layoutLogin }}
          >
            <Grid container classes={{ root: classes.layoutContainer }} direction="column">
              <img src={logoTextBlackHighRes} className={classes.containerLogoLogin} alt="logo" />
              <Grid container alignItems="flex-start" justify="center">
                {isLoading && <Loading />}
                <form
                  className={classes.formLogin}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box mb={2}>
                    <Text size="large">Create an account</Text>
                  </Box>
                  <Inputs
                    title="Username"
                    placeholder="e.g. James"
                    name="username"
                    register={register}
                    required={true}
                    errors={errors}
                    handleSetError={handleSetError}
                    maximum={20}
                    isValidateUserName={true}
                    minximum={1}
                  />
                  <Inputs
                    title="Email"
                    placeholder="Email"
                    name="email"
                    register={register}
                    required={true}
                    errors={errors}
                  />
                  <Inputs
                    title="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    register={register}
                    handleSetError={handleSetError}
                    required={true}
                    isValidatePassword={true}
                    errors={errors}
                    showEyes={true}
                    maximum={32}
                    minximum={8}
                  />
                  <Inputs
                    title="Confirm Password"
                    placeholder="Password"
                    name="confirmPassword"
                    type="password"
                    register={register}
                    required={true}
                    handleSetError={handleSetError}
                    errors={errors}
                    password={password}
                    showEyes={true}
                    maximum={32}
                    minximum={8}
                  />
                  <FormControlLabel
                    classes={{ root: classes.rootLabelRadio }}
                    control={
                      <Checkbox
                        value={termAndConditions}
                        name="conditions"
                        checked={termAndConditions}
                        classes={{ root: classes.rooCheckbox }}
                        color="primary"
                        onChange={handleChange}
                        icon={<img src={Images.icRadioButtonUnchecked} alt="checkbox" />}
                        checkedIcon={<img src={Images.icSelectOn} alt="checkbox-icon" className={classes.imageCheck} />}
                        inputRef={register({ required: 'You have to agree on Terms and Conditions' })}
                      />
                    }
                    label={
                      <Grid container classes={{ root: classes.containerText }}>
                        <Text size="large">I have read and agreed on</Text>
                        <Text classes={{ root: classes.termAndConditions }} handleClick={handleShowTermsAndConditions} size="large">Terms and Conditions</Text>
                      </Grid>}
                  />
                  {errors[`conditions`] && termAndConditions === false && <Text classes={{ root: classes.textError }}>{errors[`conditions`].message}</Text>}

                  <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
                    <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">Sign Up</Buttons>
                  </Grid>
                </form>
                <Grid
                  classes={{ root: classes.layoutFooter }}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Text size="large">Already have an account? <span className={classes.textLink} onClick={handleOpenLogin}>Login</span></Text>
                  {/* <Text size="large">Didn't receive your activation e-mail? Click here to  <span className={classes.textLink} onClick={handleOpenResentMail}>Resend</span></Text> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} />}
        <PopupTermsAndConditions ref={termsAndConditionsRef} />
      </Dialog>
    </div>
  );
}

export default Signup;