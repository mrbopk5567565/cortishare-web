import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { Text, Layout, Buttons } from 'components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { VERIFY_EMAIL_REQUEST } from 'redux/reducers/authentication/actionTypes';
import jwt_decode from "jwt-decode";
import Images from 'config/images';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';
const VerifyEmail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    var url = window.location;
    var token = new URLSearchParams(url.search).get('token');
    if (!token) {
      history.push('/');
    } else {
      const name = jwt_decode(token)['Cortishare:UserName'];
      setUserName(name);
      const customerId = jwt_decode(token)['Cortishare:CustomerId'];
      dispatch({ type: VERIFY_EMAIL_REQUEST, payload: token })
    }
  }, []);

  const handleOpenLogin = () => {
    localStorage.clear();
    history.push("/")
  }

  return (
    <Layout>
      <Grid classes={{ root: classes.WrapSection }}>
        <Grid classes={{ root: classes.formSection }}>
            <img src={logoTextBlackHighRes} className={classes.containerLogoLogin} />
          <Grid className={classes.textWelcome}>
            <Text>Welcome {userName}!</Text>
          </Grid>
          <Grid className={classes.textThank}>
            <Text size="medium">Thank you for confirming your email. Your account is ready and you can now login. Thank you for joining us at CortiShare! </Text>
          </Grid>
          <Grid container item justify="center" alignItems="center" className={classes.buttonLogin}>
            <Buttons classes={{ root: classes.textButton }} onClick={handleOpenLogin}>Back to Login</Buttons>
          </Grid>
        </Grid>
      </Grid>
    </Layout >
  );
}

export default VerifyEmail;