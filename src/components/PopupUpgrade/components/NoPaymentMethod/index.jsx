import React, { useState } from "react";
import { ChangeCreditCard } from 'components';
import { HANDLE_CREATE_SUBSCRIPTION_REQUEST, HANDLE_GET_INFO_DETAIL_REQUEST } from 'redux/reducers/profile/actionTypes';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ConversionsAPIFacebook } from 'services/CAPI'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const NoPaymentMethod = (props) => {
  const dispatch = useDispatch();
  const [changeCreditCard, setChangeCreditCard] = useState(false)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const matchPayment = useRouteMatch('/payment');
  const history = useHistory()

  const handleOnSuccessCreate = () => {
    dispatch({
      type: HANDLE_GET_INFO_DETAIL_REQUEST
    })

    //mixPanel
    mixPanel.track(EventPage.SuccessfulPayment)

    //CAPI
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

    props.handleClose();
    if (matchPayment && matchPayment.isExact) {
      history.push('/')
    }
  }

  const handleOnFailureCreate = () => {
    // toast.error('Create Subscription is failure')
  }


  const onHandleCreateSubscription = (res) => {
    dispatch({
      type: HANDLE_CREATE_SUBSCRIPTION_REQUEST,
      payload: {
        "stripePaymentmethodId": res.id,
        "stripePriceId": props.stripePriceId
      },
      onSuccess: handleOnSuccessCreate,
      onFailure: handleOnFailureCreate
    })
  }
  return (
    <>
      <ChangeCreditCard isShowAlertSumbit={false} isPopup={false} onHandleCreateSubscription={onHandleCreateSubscription} isOpen={true} handleClose={() => setChangeCreditCard(false)} />
    </>
  );
};

export default NoPaymentMethod;
