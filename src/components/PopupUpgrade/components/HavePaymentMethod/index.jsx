import React, { useState } from "react";
import { Grid, Button } from '@material-ui/core';
import { Text } from 'components'
import useStyles from './styles';
import Images from 'config/images'
import clsx from 'clsx'
import ChangeCreditCard from 'components/ChangeCreditCard'
import { HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_DELETE_PAYMENT_METHOD } from 'redux/reducers/profile/actionTypes';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import PopupCancelPlan from 'components/PopupCancelPlan'
import { HANDLE_CREATE_SUBSCRIPTION_REQUEST } from 'redux/reducers/profile/actionTypes';
import PopupUnlinkCard from 'components/PopupUnlinkCard';
import { ConversionsAPIFacebook } from 'services/CAPI';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const HavePaymentMethod = ({ paymentMethod, plan, stripePriceId, handleClose }) => {
  const classes = useStyles();
  const [changeCreditCard, setChangeCreditCard] = useState(false)
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading)
  const [isOpenCancelPlan, setIsOpenCancelPlan] = useState(false)
  const [isopenUnlinkCard, setIsUnlinkCard] = useState(false)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const matchPayment = useRouteMatch('/payment');
  const history = useHistory()

  const handleChangePayment = () => {
    setChangeCreditCard(true)
  }

  const handleOnSuccessCreate = () => {
    dispatch({
      type: HANDLE_GET_INFO_DETAIL_REQUEST
    })

    //mixPanel
    mixPanel.track(EventPage.SuccessfulPayment)

    // //CAPI
    const data = {
      event_name: 'Purchase',
      user_data: {
        email: [customer.email]
      },
      custom_data: {
        content_name: 'Successful Payment',
      }
    }
    ConversionsAPIFacebook(data)

    dispatch({
      type: 'SET_IS_NOT_LOADING'
    })
    toast.success("Success! You've been upgraded.")
    
    handleClose();
    if (matchPayment && matchPayment.isExact) {
      history.push('/')
    }
  }

  const handleOnFailureCreate = () => {
    // toast.error('Create Subscription is failure')
  }

  const handlePayment = () => {
    dispatch({
      type: HANDLE_CREATE_SUBSCRIPTION_REQUEST,
      payload: {
        "stripePaymentmethodId": paymentMethod.stripePaymentMethodId,
        "stripePriceId": stripePriceId
      },
      onSuccess: handleOnSuccessCreate,
      onFailure: handleOnFailureCreate
    })
  }

  const formatMonth = (month) => {
    if (month) {
      if (month < 10)
        return '0' + month
      else
        return month
    }
    return ''
  }
  const formatYear = (year) => {
    if (year) {
      const strYear = year.toString()
      return strYear.slice(strYear.length - 2)
    }
    return ''
  }

  const handleDeletePayment = () => {
    // don't allow remove Method if have Plan
    if (plan.id !== 0) {
      setIsUnlinkCard(true)
      return;
    }
    dispatch({
      type: HANDLE_DELETE_PAYMENT_METHOD,
      payload: {
        paymentMethodId: paymentMethod.id
      },
      callbackFunc: () => {
        toast.success("Deleted credit card");
      }
    })
  }

  return (
    <Grid container direction="column" classes={{ root: clsx(classes.containerItem, classes.paymentSection) }}>
      <Grid container alignItems="center" justify="space-between" classes={{ root: classes.itemBilling }}>
        <Grid container classes={{ root: classes.paymentLeft }}>
          <img src={Images.icVisa} alt="" />
          <Grid>
            <Text type='bold' size='medium'>****-****-****-{paymentMethod.cardNumber}</Text>
            <Text size='small'><span className="description">{formatMonth(paymentMethod.expMonth)}/{formatYear(paymentMethod.expYear)}</span></Text>
          </Grid>
        </Grid>
        <img src={Images.icCloseRed} alt="" className={classes.close} onClick={handleDeletePayment} />
      </Grid>
      <Button onClick={handleChangePayment} disabled={isLoading} variant="outlined" color="primary" classes={{ root: clsx(classes.btn, classes.changeCredit) }}>Change Credit/Debit Card</Button>
      <Button onClick={handlePayment} disabled={isLoading} variant="contained" color="primary" classes={{ root: clsx(classes.payment) }}>Pay</Button>

      {changeCreditCard && <ChangeCreditCard isShowAlertSumbit={false}  isReset={true} isPopup={true} isOpen={true} handleClose={() => setChangeCreditCard(false)} />}
      {/* <PopupCancelPlan isopenPopup={isOpenCancelPlan} handleClose={() => setIsOpenCancelPlan(false)} /> */}
      <PopupUnlinkCard isopenPopup={isopenUnlinkCard} handleClose={() => setIsUnlinkCard(false)} />

    </Grid>
  );
};

export default HavePaymentMethod;
