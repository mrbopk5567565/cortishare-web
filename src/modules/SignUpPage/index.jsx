import {
  Box, Checkbox, FormControlLabel, Grid, Hidden
} from '@material-ui/core';
import { Buttons, Inputs, Loading, Text } from 'components';
import Images from 'config/images';
import React, { useEffect, useRef, useState, lazy } from 'react';
import { useForm } from "react-hook-form";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REGISTER_REQUEST, LOGIN_REQUEST } from 'redux/reducers/authentication/actionTypes';
import useStyles from './styles';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png'
import Login from 'modules/LoginPage';
import PopupTermsAndConditions from 'modules/Authentication/SignUp/components/PopupTermsAndConditions';
import { ConversionsAPIFacebook } from 'services/CAPI'
import { mixPanel } from 'services/mixpanel';
import { EventPage, PropertyName } from 'constants/mixpanel';

const mapStateToProps = (state) => {
  return {
  };
};

const SignUpPage = ({ handleClose, handleLogin, handleVerifyApp, handleSubmitSignUp }) => {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false)
  const [termAndConditions, setTermAndConditions] = useState(false)
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: "onBlur"
  });
  const password = useRef({});
  const isLoading = useSelector((state) => state.global.isLoading)
  const termsAndConditionsRef = useRef();

  password.current = watch("password", "");

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
            isReload: false,
            history,
            onSuccess: (info) => {
              handleTracking(info)
            }
          })

          // history.push('/login')
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
    history.push('/login')
  }
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }
  const handleSetError = ({ name, error }) => {
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

      <Grid
        item sm={12} md={4}
        container
        classes={{ root: classes.containerRight }}
        justify="center"
        alignItems="center"
      >
        <form
          className={classes.formLogin}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Hidden mdUp>
            <Grid container classes={{ root: classes.containerLogoForm }} justify="center">
              <img src={logoTextBlackHighRes} alt="logo-cortishare" />
            </Grid>
          </Hidden>
          <Text classes={{ root: classes.wellcome }}>Create an account</Text>
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
        </Grid>
        {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} />}
        <PopupTermsAndConditions ref={termsAndConditionsRef} />
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps)(SignUpPage);