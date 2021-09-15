import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { Text, Layout, Buttons } from 'components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UNSUBCRIBE_EMAIL_REQUEST } from 'redux/reducers/authentication/actionTypes';
import jwt_decode from "jwt-decode";
import Images from 'config/images';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';

const UnsubcribeEmail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [dataToken, setDataToken] = useState({
    customerEmail: '',
    mapTitle: '',
  });
  const customer = JSON.parse(localStorage.getItem('customer'))

  useEffect(() => {
    var url = window.location;
    var token = new URLSearchParams(url.search).get('token');
    if (!token) {
      history.push('/');
    } else {
      const customerEmail = jwt_decode(token)['Cortishare:CustomerEmail'];
      const mapTitle = jwt_decode(token)['Cortishare:MapTitle'];
      setDataToken({
        ...dataToken,
        customerEmail,
        mapTitle,
      });
      dispatch({ type: UNSUBCRIBE_EMAIL_REQUEST, payload: token, history })
    }
  }, []);

  const handleBack = () => {
    if (customer) {
    } else {
      localStorage.clear();
    }
    history.push("/")
  }

  return (
    <Layout>
      <Grid classes={{ root: classes.WrapSection }}>
        <Grid classes={{ root: classes.formSection }}>
            <img src={logoTextBlackHighRes} className={classes.containerLogoLogin} />
          <Grid className={classes.textWelcome}>
            <Text>Welcome {dataToken.customerEmail}!</Text>
          </Grid>
          <Grid className={classes.textThank}>
            <Text size="medium">You have successfully unsubcribed email this board: {dataToken.mapTitle}</Text>
          </Grid>
          <Grid container item justify="center" alignItems="center" className={classes.buttonLogin}>
            <Buttons 
              classes={{ root: classes.textButton }} 
              onClick={handleBack}
            >
              {customer ? `Back to Dashboard` : `Back to Login`}
            </Buttons>
          </Grid>
        </Grid>
      </Grid>
    </Layout >
  );
}

export default UnsubcribeEmail;