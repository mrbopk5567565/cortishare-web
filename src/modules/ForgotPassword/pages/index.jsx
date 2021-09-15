import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import clsx from 'clsx'
import Images from 'config/images'
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import { Text, Layout, Buttons, Loading } from 'components'
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';
import { CHANGE_PASSWORD_REQUEST } from 'redux/reducers/authentication/actionTypes'
import jwt_decode from "jwt-decode";
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons/';
import { validateError } from 'helpers';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, setValue, getValues, watch } = useForm();
  const isLoading = useSelector((state) => state.global.isLoading)
  const [info, setInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setshowRepassword] = useState(false);

  useEffect(() => {
    var url = window.location;
    var token = new URLSearchParams(url.search).get('token');
    if (!token) {
      history.push('/');
    } else {
      setInfo(jwt_decode(token))
    }
  }, [])

  const onSubmit = values => {
    const data = {
      email: info["Cortishare:Email"],
      password: values.password
    }
    const onSuccess = () => {
      setValue("password", "")
      setValue("repassword", "")
      history.push("/")
    }

    dispatch({ type: CHANGE_PASSWORD_REQUEST, payload: data, onSuccess })
  }

  const handleClick = (type) => {
    if (type == 'password') setShowPassword(!showPassword)
    else setshowRepassword(!showRepassword)
  }

  const handleGoBack = () => {
    localStorage.clear();
    history.push("/")
  }

  return (
    <Layout>
      <Grid container alignItems="center" justify="space-between">
        <img src={logoTextBlackHighRes} alt="" className={classes.logo} />
      </Grid>
      <div className={classes.buttonClose} onClick={handleGoBack}>
        <img src={Images.icCloseBig} />
      </div>
      <Grid classes={{ root: classes.WrapSection }}>
        <Grid classes={{ root: classes.formSection }}>
          <Grid
            container
            justify="center">
            {isLoading && <Loading />}
            <Text classes={{ root: classes.title }}>Change Your Password</Text>
          </Grid>
          <Grid classes={{ root: classes.form }}>
            <form
              className={classes.formLogin}
              onSubmit={handleSubmit(onSubmit)}>

              <Grid classes={{ root: classes.textField }}>
                <Text classes={{ root: classes.label }}>New Password</Text>
                <Grid className={classes.inputWrapper}>
                  <input
                    ref={register({
                      validate: value =>
                        validateError({ maximum: 16, minximum: 8, name: "password", value: value, isValidatePassword: true })
                    })}
                    className={classes.input}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />

                  <IconButton
                    className={classes.inputIcon}
                    aria-label="toggle password visibility"
                    onClick={() => handleClick('password')}
                  >
                    {!showPassword ? <Visibility /> : <img src={Images.icEyeClose} alt="eye-close" />}
                  </IconButton>
                </Grid>
                <span className={classes.textError}>{(errors.password && errors.password.type) === 'validate' && errors.password.message}</span>
                <span className={classes.textError}>{(errors.password && errors.password.type) === 'required' && "Your input is required"}</span>
              </Grid>

              <Grid classes={{ root: clsx(classes.textField) }}>
                <Text classes={{ root: classes.label }}>New Password Confirmation</Text>
                <Grid className={classes.inputWrapper}>
                  <input
                    ref={register({
                      validate: value =>
                        validateError({ maximum: 16, minximum: 8, name: "confirmPassword", value: value, isValidatePassword: true, password: getValues('password') })
                    })} className={classes.input}
                    placeholder="Password"
                    type={showRepassword ? 'text' : 'password'}
                    name="repassword"
                  />
                  <IconButton
                    className={classes.inputIcon}
                    aria-label="toggle password visibility"
                    onClick={() => handleClick('repassword')}
                  >
                    {!showRepassword ? <Visibility /> : <img src={Images.icEyeClose} alt="eye-close" />}
                  </IconButton>
                </Grid>
                <span className={classes.textError}>{(errors.repassword && errors.repassword.type) === 'validate' && errors.repassword.message}</span>
                <span className={classes.textError}>{(errors.repassword && errors.repassword.type) === 'required' && "Your input is required"}</span>

              </Grid>

              <Grid classes={{ root: classes.buttons }}>
                <div onClick={handleGoBack} className={classes.goBack}>Back to Home</div>
                <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">Submit</Buttons>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Layout >
  );
}

export default ForgotPassword;