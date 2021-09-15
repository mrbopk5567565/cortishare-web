import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Avatar, Button, TextField } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Text, LayoutMap, Layout, Inputs, Buttons } from 'components'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form"
import moment from 'moment'
import clsx from 'clsx'
import Images from 'config/images'
import { HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_SAVE_INFO_REQUEST, HANDLE_DELETE_PAYMENT_METHOD, HANDLE_CANCEL_SUBSCRIPTION_REQUEST } from 'redux/reducers/profile/actionTypes';
import { toast } from 'react-toastify';
import ChangeCreditCard from '../../../components/ChangeCreditCard'
import DeactiveAccount from './DeactiveAccount'
import PopupUpgrade from 'components/PopupUpgrade'
import { numberWithCommas, validateError } from 'helpers'
import { Loading } from 'components'
import { PopupUnlinkCard } from 'components'
import { PopupCancelPlan } from 'components'
import BillingFree from './Components/BillingFreeUpgrade'
import ViewInvoices from './Components/ViewInvoices';
import { checkPaymentStatus } from 'helpers'
const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { handleSubmit, register, errors, setValue, getValues } = useForm();
  const { plan, info, payment, paymentMethod } = useSelector((state) => state.profile)
  const refToAvatar = useRef()
  const [changeCreditCard, setChangeCreditCard] = useState(false)
  const [deactiveAccount, setDeactiveAccount] = useState(false)
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const [isOpenCancelPlan, setIsOpenCancelPlan] = useState(false)
  const [isopenUnlinkCard, setIsUnlinkCard] = useState(false)
  const isLoading = useSelector((state) => state.global.isLoading)
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    description: "",
    profilePicture: ''
  })
  useEffect(() => {
    if (!info) return;
    let object = {
      userName: info.userName,
      description: info.description,
      profilePicture: info.profilePicture,
      email: info.email,
    }
    setFormData({ ...formData, ...object })
    setValue('userName', info.userName);
    setValue('description', info.description);
    setValue('email', info.email);
    plan.price = numberWithCommas(plan.price)
  }, [info, plan])

  useEffect(() => {
    dispatch(
      { type: HANDLE_GET_INFO_DETAIL_REQUEST })
  }, [])
  useEffect(() => {
    if (Object.keys(info).length !== 0 && !info.isActive) {
      handleLogout()
    }
  }, [info.isActive])

  // const handleCancelPlan = () => {
  //   dispatch({
  //     type: HANDLE_CANCEL_SUBSCRIPTION_REQUEST,
  //     onSuccess: handleOnSuccessCancelPlan,
  //     onFailure: handleOnFailureCancelPlan,
  //   }
  //   )
  // }

  // const handleOnSuccessCancelPlan = () => {
  //   dispatch(
  //     { type: HANDLE_GET_INFO_DETAIL_REQUEST })
  //   toast.success("Cancel Plan Sucessfully");
  // }
  // const handleOnFailureCancelPlan = () => {
  // }

  const onSubmit = values => {
    const bodyformData = new FormData()
    bodyformData.append("Email", values.email)
    bodyformData.append("UserName", values.userName)
    bodyformData.append("Description", values.description || '')
    const onSuccess = () => {
      history.push("/profile")
    }
    if (refToAvatar.current.files.length)
      bodyformData.append('ProfilePicture', refToAvatar.current.files[0])
    dispatch({
      type: HANDLE_SAVE_INFO_REQUEST,
      payload: bodyformData,
      callbackFunc: () => {
        let customer = JSON.parse(localStorage.getItem('customer'))
        customer = { ...customer, userName: values.userName, profilePicture: formData.profilePicture }
        localStorage.setItem('customer', JSON.stringify(customer));
        history.push('/profile')
        toast.success("Update Profile Success!");
      }
    })
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/")
  }

  const handleChangePayment = () => {
    setChangeCreditCard(true)
  }

  const handleChangeAccount = () => {
    setDeactiveAccount(true)
  }

  const handleChooseAvatar = () => {
    refToAvatar.current.click()
  }
  const handleChangeAvatar = (e) => {
    const fileList = e.target.files
    if (fileList.length) {
      setFormData({ ...formData, ...{ profilePicture: URL.createObjectURL(fileList[0]) } })
    }
  }
  // const handleOpenSubscription = () => {
  //   setIsOpenUpgrade(true)
  // }
  const formatYear = (year) => {
    if (year) {
      const strYear = year.toString()
      return strYear.slice(strYear.length - 2)
    }
    return ''
  }
  const renderDescription = () => {
    // Free plan
    if (checkPaymentStatus({ customer: info, payment: payment }) == 0) {
      return (
        <>
          {/* <ViewInvoices description="Your current have no plan" /> */}
          <BillingFree />
        </>
      )
    }
    // cancel
    if (checkPaymentStatus({ customer: info, payment: payment }) == 3) {
      return (
        <>
          <ViewInvoices description="You currently have no plan" />
          <BillingFree></BillingFree>
        </>
      )
    }
    // cancel free plan
    if (checkPaymentStatus({ customer: info, payment: payment }) == 3) {
      return (
        <>
          <BillingFree></BillingFree>
        </>
      )
    }
    // paymented
    if (checkPaymentStatus({ customer: info, payment: payment }) == 1) {
      return (
        <ViewInvoices description="Your next billing date is" date={moment(payment.nextBillingDatetime).format('DD MMMM YYYY')} />
      )
    }
    //expire
    if (checkPaymentStatus({ customer: info, payment: payment }) == 2) {
      return (
        <>
          <ViewInvoices description="Unable to process payment. Please update your payment method." />
        </>
      )
    }
  }

  const renderDescriptionDate = () => {
    //cancel
    if (checkPaymentStatus({ customer: info, payment: payment }) == 3) {
      return (
        <span className={classes.paymentDescription}>(Until { moment(payment.nextBillingDatetime).format('DD MMMM YYYY')})</span>
      )
    }
    // paymented
    if (checkPaymentStatus({ customer: info, payment: payment }) == 1) {
      return (
        <span className={classes.paymentDescription}>(Until { moment(payment.nextBillingDatetime).format('DD MMMM YYYY')})</span>
      )
    }
    //expired
    if (checkPaymentStatus({ customer: info, payment: payment }) == 2) {
      return (<> (Exired) </>)
    }
  }

  const renderButtonCancel = () => {
    // was paid
    if (checkPaymentStatus({ customer: info, payment: payment }) == 1) {
      return (
        <Button classes={{ root: clsx(classes.btn, classes.btnChange) }} onClick={handleCancelPlan}>Cancel Plan</Button>
      )
    }
    // expire
    if (checkPaymentStatus({ customer: info, payment: payment }) == 2) {
      return (
        <Button classes={{ root: clsx(classes.btn, classes.btnChange) }} onClick={handleCancelPlan}>Cancel Plan</Button>
      )
    }
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
  const renderTypeOfPlan = () => {
    if(checkPaymentStatus({ customer: info, payment: payment }) == 2) {
      return {name: payment.planName, price: payment.planPrice, description: payment.planName && payment.planName.split(' ')[1]}
    }else {
      return {name: plan.isUnlimitedPlan === true ? "Unlimited Plan" : "Free Plan", price: plan.price, description: plan.typeBilling === "free" ? "Month" : plan.typeBilling}
    }
  }
  const handleCancelPlan = () => {
    // if (plan.id !== 0) {
      setIsOpenCancelPlan(true)
      return;
    // }
    // dispatch({
    //   type: HANDLE_CANCEL_SUBSCRIPTION_REQUEST,
    //   callbackFunc: () => {
    //     toast.success("Cancel Plan Sucessfully");
    //   }
    // })
  }

  return (
    <Layout>
      {isLoading && <Loading />}
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid container item xs={12} sm={3} alignItems="center" justify="flex-start" direction="column">
          <input onChange={handleChangeAvatar} hidden type="file" accept="image/*" name="profilePicture" ref={refToAvatar}></input>
          <Avatar onClick={handleChooseAvatar} src={formData.profilePicture} alt="" classes={{ root: classes.avatar }} />
          <Text size="mini" handleClick={handleChooseAvatar}><span>Edit Photo</span></Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form
            id="formProfile"
            className={classes.formLogin}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid className={classes.formGroup}>
              <label className={classes.formLabel}>Username</label>
              <input
                className={classes.formInput}
                title="Username"
                placeholder="Username"
                name="userName"
                // ref={register({ required: true })}
                ref={register({
                  required: "Your username is required",
                  validate: value =>
                    validateError({ maximum: 20, minximum: 1, name: "username", value: value, isValidateUserName: true })
                })}
              />
              <span className={classes.textError}>{errors.userName && errors.userName.type === 'validate'  && errors.userName.message}</span>
            </Grid>
            <Grid className={classes.formGroup}>
              <label className={classes.formLabel}>Email</label>
              <input
                className={classes.formInput}
                placeholder="Email"
                name="email"
                ref={register({
                  required: "Your input is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
              />
              <span className={classes.textError}>{errors.email && errors.email.message}</span>
            </Grid>
            <Grid className={classes.formGroup}>
              <label className={classes.formLabel}>Describe Yourself</label>
              <textarea
                className={clsx(classes.formInput, classes.resizeNone)}
                placeholder="Describe Yourself"
                name="description"
                ref={register({
                  validate: value =>
                    validateError({ maximum:1500, name: "description", value: value })
                  })
                }
                rows={4}
              />
              <span className={classes.textError}>{errors.description && errors.description.type === 'validate' && errors.description.message}</span>
            </Grid>
          </form>
          <Grid container classes={{ root: classes.containerBilling }}>
            <Text type='bold' size='large'>Billing</Text>
            <Grid container alignItems="center" justify="space-between" classes={{ root: classes.itemBilling }}>
              <Grid>
                <Text type='bold' size='medium'>{renderTypeOfPlan().name}{renderDescriptionDate()}</Text>
                <Text size='small'><span className="description">${renderTypeOfPlan().price} <span className={classes.typeBilling}>{renderTypeOfPlan().description}</span></span></Text>
              </Grid>
              {renderButtonCancel()}
            </Grid>
          </Grid>
          {/* <Grid container alignItems="center" justify="space-between" classes={{ root: classes.nextBilling }}>
            <Grid classes={{ root: classes.nextBillingLeft }}>
              <Text size='medium' classes={{ root: classes.timeInvoices }}>Your next billing date is <span>24 November 2021</span></Text>
            </Grid>
            <Grid classes={{ root: classes.nextBillingRight }}>
              <Text type="bold" size='mini' handleClick={() => history.push('/profile/billing')} ><span className={classes.billingLink}>View Invoices</span></Text>
            </Grid>
          </Grid> */}
          {renderDescription()}
          <Grid container direction="column" classes={{ root: clsx(classes.containerItem, classes.paymentSection) }}>
            <Text type='bold' size='large'>Payment Method</Text>
            {paymentMethod &&
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
            }
            <Button variant="outlined" color="primary" classes={{ root: clsx(classes.btn, classes.payment) }} onClick={handleChangePayment}>Change Credit/Debit Card</Button>
          </Grid>
          <Grid container classes={{ root: classes.containerItem }}>
            <Text type='bold' size='large'>Account Changes</Text>
            <Grid container alignItems="center" justify="space-between" classes={{ root: classes.itemBilling }}>
              <Grid container item xs={8}>
                <Grid>
                  <Text classes={{ root: classes.deactiveAccount }} type='bold' size='medium'>Deactivate Account</Text>
                  <Text size='small'><span className="description">Delete your account and account data</span></Text>
                </Grid>
              </Grid>
              <Grid container item xs={4} justify="flex-end">
                <Button classes={{ root: clsx(classes.btn, classes.btnAccount) }} onClick={handleChangeAccount}>Deactivate Account</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} container alignItems="center" justify="flex-end" direction="column" classes={{ root: classes.containerButton }}>
          <Buttons form="formProfile" fullWidth btnType="medium">Save</Buttons>
          <Button fullWidth variant="outlined" color="primary" classes={{ root: classes.btn }} onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
      <ChangeCreditCard isShowAlertSumbit={true} isPopup={true} isReset={true} isOpen={changeCreditCard} handleClose={() => setChangeCreditCard(false)} />
      {deactiveAccount && <DeactiveAccount isOpen={deactiveAccount} handleClose={() => setDeactiveAccount(false)} ></DeactiveAccount>}
      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={() => setIsOpenUpgrade(false)} />}
      {isopenUnlinkCard && <PopupUnlinkCard isopenPopup={isopenUnlinkCard} handleClose={() => setIsUnlinkCard(false)} />}
      {isOpenCancelPlan && <PopupCancelPlan isopenPopup={isOpenCancelPlan} handleClose={() => setIsOpenCancelPlan(false)} />}
    </Layout >
  );
}

export default connect()(EditProfile);