import {
  Box, Checkbox, FormControlLabel, Grid, Hidden, NativeSelect, FormControl
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
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import {
  HANDLE_ADD_PAYMENT_METHOD,
  HANDLE_GET_INFO_DETAIL_REQUEST,
  HANDLE_CREATE_SUBSCRIPTION_REQUEST,
  HANDLE_GET_ALL_PLAN_REQUEST,
} from 'redux/reducers/profile/actionTypes'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const mapStateToProps = (state) => {
  return {
  };
};

const Payment = ({ handleClose, handleLogin, handleVerifyApp, handleSubmitSignUp }) => {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  const [termAndConditions, setTermAndConditions] = useState(false)
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: "onBlur"
  });
  const isLoading = useSelector((state) => state.global.isLoading)
  const termsAndConditionsRef = useRef();
  const [isShowSignUp, setisShowSignUp] = useState(true)

  //#signup
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

  const handleChangeTermAndConditions = e => {
    setTermAndConditions(!termAndConditions)
  }

  const handleShowTermsAndConditions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    termsAndConditionsRef.current.onOpen();
  }

  const handleOpenLogin = () => {
    setisShowSignUp(!isShowSignUp)
    // history.push('/login')
  }

  return (
    <Elements stripe={stripePromise}>

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
          {isShowSignUp ?
            <SignUpForm
              isShowSignUp={isShowSignUp}
              termAndConditions={termAndConditions}
              handleChangeTermAndConditions={handleChangeTermAndConditions}
              handleShowTermsAndConditions={handleShowTermsAndConditions}
            />
            :
            <LoginForm />
          }
          <Grid
            classes={{ root: classes.layoutFooter }}
            container
            justify="center"
            alignItems="center"
          >
            <Text size="large">
              {isShowSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
              <span className={classes.textLink} onClick={handleOpenLogin}>{isShowSignUp ? 'Login' : 'Sign Up'}</span>
            </Text>
          </Grid>
          <PopupTermsAndConditions ref={termsAndConditionsRef} />

          <Grid container classes={{ root: classes.containerFooter }}>
            <Grid container justify="center" classes={{ root: classes.containerImage1 }}>
              <img src={Images.icLockPayment1} alt="payment-cortishare" />
            </Grid>
            <Text classes={{ root: classes.textFooter }}>This is a 100% 30-day money back guarantee. No question asked. If you don’t like CortiShare for any reason, simply send it back to us and we’ll refund you 100% of your purchase price.</Text>
            <Grid container classes={{ root: classes.containerImage23 }}>
              <img src={Images.icLockPayment2} alt="payment-cortishare" />
              <img src={Images.icLockPayment3} alt="payment-cortishare" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Elements>
  );
}

export default connect(mapStateToProps)(Payment);

const LoginForm = () => {
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const password = useRef({});
  password.current = watch("password", "");
  const [errorValidate, setErrorValidate] = useState('')
  const [errorNameOfCard, setErrorNameOfCard] = useState('')
  const [nameCard, setNameCard] = useState('')
  const [unlimited, setUnlimited] = useState(1);
  const [price, setPrice] = React.useState(0);
  const [stripePriceId, setStripePriceId] = React.useState(null);
  const [stripePlanId, setStripePlanId] = React.useState(null);
  const [typeBilling, setTypeBilling] = React.useState(null);

  const { plan, info, payment, paymentMethod, plans } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(
      { type: HANDLE_GET_ALL_PLAN_REQUEST, isLoading: false }
    )
  }, [])

  useEffect(() => {
    if (plans.length == 0) return
    setPrice(plans[0].price);
    setStripePriceId(plans[0].stripePriceId);
    setStripePlanId(plans[0].stripePlanId);
    setTypeBilling(plans[0].typeBilling)
  }, [plans])

  const handleChangeUnlimited = (event) => {
    setUnlimited(event.target.value);
  };

  useEffect(() => {
    if (plans.length == 0) return
    let object = plans.filter(item => item.id == unlimited)

    if (object.length == 0) return;
    setPrice(object[0] && object[0].price);
    setStripePriceId(object[0] ? object[0].stripePriceId : null);
    setStripePlanId(object[0] ? object[0].stripePlanId : null);
    setTypeBilling(object[0] ? object[0].typeBilling : null);
  }, [unlimited])

  const onSubmit = async (values) => {
    const { username, password } = values;

    // check-card
    const checkCard = await checkValidateCard()
    if (!checkCard) return

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
      },
      // login done 
      handleSubmitCard: (res) => handleSubmitCard(res.email)
    })
  };

  const handleTracking = (info) => {
    mixPanel.track(EventPage.Login, {
      [PropertyName.Login_UserEmail]: info.userName,
      [PropertyName.Login_UserEmail]: info.email
    })
  }

  const checkValidateCard = async () => {
    let validate = true

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      validate = false
      return validate;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    if (!nameCard) {
      setErrorNameOfCard('Empty Name')
      validate = false
      return validate
    } else {
      const cardElement = await elements.getElement(CardNumberElement)
      // Use your card Element with other Stripe.js APIs
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameCard,
        },
      })
      if (res.error) {
        let error = res.error;
        if (error.code === "card_number_in_name_field") {
          setErrorNameOfCard(error.message)
          validate = false
        }
        else if (error.code === "card_declined") {
          toast.error(error.message);
          validate = false
        }
        else {
          toast.error(error.message);
          validate = false
        }
        setErrorValidate(res.error.code)
        return validate
      } else {
        setErrorValidate('')
        validate = true
        return validate
      }
    }
  }

  const handleSubmitCard = async (mail) => {
    console.log('mailmail', mail)
    // Block native form submission.
    // event.preventDefault();
    setErrorNameOfCard('')
    setErrorValidate('')
    await dispatch({
      type: SET_IS_NOT_LOADING
    })
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    if (!nameCard) {
      setErrorNameOfCard('Empty Name')
    } else {
      const cardElement = await elements.getElement(CardNumberElement)
      // Use your card Element with other Stripe.js APIs
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameCard,
        },
      })
      if (res.error) {
        let error = res.error;
        if (error.code === "card_number_in_name_field") {
          setErrorNameOfCard(error.message)
        }
        else if (error.code === "card_declined") {
          toast.error(error.message);
        }
        else {
          toast.error(error.message);
        }
        setErrorValidate(res.error.code)
      } else {
        setErrorValidate('')
        await dispatch({
          type: HANDLE_ADD_PAYMENT_METHOD,
          payload: {
            paymentmethodId: res.paymentMethod.id
          },
          callbackFunc: () => {
            // handleClose()
            if (!res.paymentMethod) {
              toast.success("Create Card Was Wrong!");
              return;
            }
            // if (props.isReset) {
            //   dispatch(
            //     { type: HANDLE_GET_INFO_DETAIL_REQUEST }
            //   )
            // }
            if (onHandleCreateSubscription && res) {
              onHandleCreateSubscription(res.paymentMethod, mail);
            }
            // if (isShowAlertSumbit) {
            //   toast.success("Updated credit card");
            // }
          }
        })

      }
    }
  }

  const onHandleCreateSubscription = (res, mail) => {
    dispatch({
      type: HANDLE_CREATE_SUBSCRIPTION_REQUEST,
      payload: {
        "stripePaymentmethodId": res.id,
        "stripePriceId": stripePriceId
      },
      onSuccess: () => handleOnSuccessCreate(mail),
      onFailure: handleOnFailureCreate
    })
  }

  const handleOnSuccessCreate = (mail) => {
    dispatch({
      type: HANDLE_GET_INFO_DETAIL_REQUEST
    })

    //mixPanel
    mixPanel.track(EventPage.SuccessfulPayment)

    //CAPI
    const data = {
      event_name: 'Purchase',
      user_data: {
        email: [mail]
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

    // props.handleClose();
    // if (matchPayment && matchPayment.isExact) {
    //   history.push('/')
    // }
  }

  const handleOnFailureCreate = () => {
    // toast.error('Create Subscription is failure')
  }

  const renderError = (type) => {
    let errorMessage = ''
    switch (type) {
      case 'cardNumber':
        errorMessage = errorValidate === "invalid_number" ? "Card number you input is invalid" :
          errorValidate === "incomplete_number" ? "Please complete 16 number of input" :
            errorValidate === "incorrect_number" ? "Your Card Number Wrong" : ''
        break
      case 'expDate':
        errorMessage = errorValidate === "incomplete_expiry" ? "Please complete exp date" :
          errorValidate === "invalid_expiry_year_past" ? "Date you provided in the past" : ''
        break
      case 'CCV':
        errorMessage = errorValidate === "incomplete_cvc" ? "Please complete CCV" : ''
        break
      default:
        break;
    }
    if (errorMessage)
      return (<div className={classes.error}>{errorMessage}</div>)
    else
      return ''
  }

  const handleChangeNameCard = (e) => {
    let regexNumber = /[0-9]/;
    if (e.target.value != '' && regexNumber.test(e.target.value)) {
      setErrorNameOfCard('Name Card no number')
    } else {
      setErrorNameOfCard('')
    }
    setNameCard(e.target.value)
  }

  const handleChangeCard = (event, type) => {
    if (event.error || !event.complete) {
      if (event.error && event.error.code) {
        setErrorValidate(event.error.code)
      }
    } else {
      setErrorValidate('')
    }
  }

  return (
    <form
      className={classes.containerForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
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
      </Grid>

      <CardPayment
        unlimited={unlimited}
        handleChangeUnlimited={handleChangeUnlimited}
        handleChangeNameCard={handleChangeNameCard}
        price={price}
        handleChangeCard={handleChangeCard}
        renderError={renderError}
        errorNameOfCard={errorNameOfCard}
        plans={plans}
      />

      <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
        <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">
          {'Login'}
        </Buttons>
      </Grid>
    </form>
  )
}

const SignUpForm = ({
  isShowSignUp,
  termAndConditions,
  handleChangeTermAndConditions,
  handleShowTermsAndConditions,
}) => {
  const { handleSubmit, register, errors, watch, setError } = useForm({
    mode: "onBlur"
  });
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const password = useRef({});
  password.current = watch("password", "");
  const [errorValidate, setErrorValidate] = useState('')
  const [errorNameOfCard, setErrorNameOfCard] = useState('')
  const [nameCard, setNameCard] = useState('')
  const [unlimited, setUnlimited] = useState(1);
  const [price, setPrice] = React.useState(0);
  const [stripePriceId, setStripePriceId] = React.useState(null);
  const [stripePlanId, setStripePlanId] = React.useState(null);
  const [typeBilling, setTypeBilling] = React.useState(null);

  const { plan, info, payment, paymentMethod, plans } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(
      { type: HANDLE_GET_ALL_PLAN_REQUEST, isLoading: false }
    )
  }, [])

  useEffect(() => {
    if (plans.length == 0) return
    setPrice(plans[0].price);
    setStripePriceId(plans[0].stripePriceId);
    setStripePlanId(plans[0].stripePlanId);
    setTypeBilling(plans[0].typeBilling)
  }, [plans])

  const handleChangeUnlimited = (event) => {
    setUnlimited(event.target.value);
  };

  useEffect(() => {
    if (plans.length == 0) return
    let object = plans.filter(item => item.id == unlimited)

    if (object.length == 0) return;
    setPrice(object[0] && object[0].price);
    setStripePriceId(object[0] ? object[0].stripePriceId : null);
    setStripePlanId(object[0] ? object[0].stripePlanId : null);
    setTypeBilling(object[0] ? object[0].typeBilling : null);
  }, [unlimited])

  const onSubmit = async (values) => {
    if (isShowSignUp) {
      const { email, username, password } = values;

      // check-card
      const checkCard = await checkValidateCard()
      if (!checkCard) return

      if (termAndConditions) {
        await dispatch({
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

            // login done 
            handleSubmitCard(e.email)


            // history.push('/login')
          },
          history
        })
      }
    }
  }

  //#signup
  const handleSetErrorSignUp = ({ name, error }) => {
    setError(name, {
      message: error
    });
  }

  const handleTracking = (info) => {
    mixPanel.track(EventPage.Login, {
      [PropertyName.Login_UserEmail]: info.userName,
      [PropertyName.Login_UserEmail]: info.email
    })
  }

  const checkValidateCard = async () => {
    let validate = true

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      validate = false
      return validate;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    if (!nameCard) {
      setErrorNameOfCard('Empty Name')
      validate = false
      return validate
    } else {
      const cardElement = await elements.getElement(CardNumberElement)
      // Use your card Element with other Stripe.js APIs
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameCard,
        },
      })
      if (res.error) {
        let error = res.error;
        if (error.code === "card_number_in_name_field") {
          setErrorNameOfCard(error.message)
          validate = false
        }
        else if (error.code === "card_declined") {
          toast.error(error.message);
          validate = false
        }
        else {
          toast.error(error.message);
          validate = false
        }
        setErrorValidate(res.error.code)
        return validate
      } else {
        setErrorValidate('')
        validate = true
        return validate
      }
    }
  }

  const handleSubmitCard = async (mail) => {
    // Block native form submission.
    // event.preventDefault();
    setErrorNameOfCard('')
    setErrorValidate('')
    await dispatch({
      type: SET_IS_NOT_LOADING
    })
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    if (!nameCard) {
      setErrorNameOfCard('Empty Name')
    } else {
      const cardElement = await elements.getElement(CardNumberElement)
      // Use your card Element with other Stripe.js APIs
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameCard,
        },
      })
      if (res.error) {
        let error = res.error;
        if (error.code === "card_number_in_name_field") {
          setErrorNameOfCard(error.message)
        }
        else if (error.code === "card_declined") {
          toast.error(error.message);
        }
        else {
          toast.error(error.message);
        }
        setErrorValidate(res.error.code)
      } else {
        setErrorValidate('')
        await dispatch({
          type: HANDLE_ADD_PAYMENT_METHOD,
          payload: {
            paymentmethodId: res.paymentMethod.id
          },
          callbackFunc: () => {
            // handleClose()
            if (!res.paymentMethod) {
              toast.success("Create Card Was Wrong!");
              return;
            }
            // if (props.isReset) {
            //   dispatch(
            //     { type: HANDLE_GET_INFO_DETAIL_REQUEST }
            //   )
            // }
            if (onHandleCreateSubscription && res) {
              onHandleCreateSubscription(res.paymentMethod, mail);
            }
            // if (isShowAlertSumbit) {
            //   toast.success("Updated credit card");
            // }
          }
        })

      }
    }
  }

  const onHandleCreateSubscription = (res, mail) => {
    dispatch({
      type: HANDLE_CREATE_SUBSCRIPTION_REQUEST,
      payload: {
        "stripePaymentmethodId": res.id,
        "stripePriceId": stripePriceId
      },
      onSuccess: () => handleOnSuccessCreate(mail),
      onFailure: handleOnFailureCreate
    })
  }

  const handleOnSuccessCreate = (mail) => {
    dispatch({
      type: HANDLE_GET_INFO_DETAIL_REQUEST
    })

    //mixPanel
    mixPanel.track(EventPage.SuccessfulPayment)

    //CAPI
    const data = {
      event_name: 'Purchase',
      user_data: {
        email: [mail]
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

    // props.handleClose();
    // if (matchPayment && matchPayment.isExact) {
    //   history.push('/')
    // }
  }

  const handleOnFailureCreate = () => {
    // toast.error('Create Subscription is failure')
  }

  const renderError = (type) => {
    let errorMessage = ''
    switch (type) {
      case 'cardNumber':
        errorMessage = errorValidate === "invalid_number" ? "Card number you input is invalid" :
          errorValidate === "incomplete_number" ? "Please complete 16 number of input" :
            errorValidate === "incorrect_number" ? "Your Card Number Wrong" : ''
        break
      case 'expDate':
        errorMessage = errorValidate === "incomplete_expiry" ? "Please complete exp date" :
          errorValidate === "invalid_expiry_year_past" ? "Date you provided in the past" : ''
        break
      case 'CCV':
        errorMessage = errorValidate === "incomplete_cvc" ? "Please complete CCV" : ''
        break
      default:
        break;
    }
    if (errorMessage)
      return (<div className={classes.error}>{errorMessage}</div>)
    else
      return ''
  }

  const handleChangeNameCard = (e) => {
    let regexNumber = /[0-9]/;
    if (e.target.value != '' && regexNumber.test(e.target.value)) {
      setErrorNameOfCard('Name Card no number')
    } else {
      setErrorNameOfCard('')
    }
    setNameCard(e.target.value)
  }

  const handleChangeCard = (event, type) => {
    if (event.error || !event.complete) {
      if (event.error && event.error.code) {
        setErrorValidate(event.error.code)
      }
    } else {
      setErrorValidate('')
    }
  }

  return (
    <form
      className={classes.containerForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
        <Hidden mdUp>
          <Grid container classes={{ root: classes.containerLogoForm }} justify="center">
            <img src={logoTextBlackHighRes} alt="logo-cortishare" />
          </Grid>
        </Hidden>
        <Text classes={{ root: classes.wellcome }}>Create an unlimited account</Text>
        <Inputs
          title="Username"
          placeholder="e.g. James"
          name="username"
          register={register}
          required={true}
          errors={errors}
          handleSetError={handleSetErrorSignUp}
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
          handleSetError={handleSetErrorSignUp}
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
          handleSetError={handleSetErrorSignUp}
          errors={errors}
          password={password}
          showEyes={true}
          maximum={32}
          minximum={8}
        />

        <CardPayment
          unlimited={unlimited}
          handleChangeUnlimited={handleChangeUnlimited}
          handleChangeNameCard={handleChangeNameCard}
          price={price}
          handleChangeCard={handleChangeCard}
          renderError={renderError}
          errorNameOfCard={errorNameOfCard}
          plans={plans}
        />

        {/* <Grid
          container
          alignItems="center"
          justify="space-between"
          classes={{ root: classes.unlimited }}
        >
          {isLoading && <Loading />}
          <Grid>
            <Text size="medium">CortiShare Unlimited</Text>
            <FormControl classes={{ root: classes.rootFormControl }}>
              <NativeSelect
                value={unlimited}
                onChange={handleChangeUnlimited}
                id="select-plan"
                classes={{ root: classes.rootSelectFocus }}
                disableUnderline
                IconComponent={() => <ExpandMoreIcon />}
              >
                {plans &&
                  plans.map((item, index) => (
                    <option value={item.id}
                      key={index}>
                      {item.title}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Text size="big">
            <span>USD {price}</span>
          </Text>
        </Grid>

        <Grid container direction="column" wrap="nowrap">
          <div className={classes.parent}>
            {isLoading && <Loading />}
            <img className={classes.visaGrey} src={Images.icVisaGrey}></img>
            <div className={clsx(classes.groupInput, classes.groupInputHaveImg)}>
              <Text size="medium">Card Number</Text>
              <div className={classes.parent}>
                <img src={Images.icVisaBlue} className={classes.visaInput} />
                <CardNumberElement
                  options={{
                    placeholder: "8888-8888-8888-8888",
                    classes: {
                      base: classes.inputBase,
                      // invalid: classes.invalid,
                    }
                  }}
                  onChange={event => {
                    // console.log("CardNumberElement [change]", event);
                    handleChangeCard(event, "cardNumber");
                  }}
                />
                {renderError("cardNumber")}
              </div>
            </div>
          </div>
          <div className={classes.groupInput}>
            <Text size="medium">Name on Card</Text>
            <input onChange={handleChangeNameCard} className={classes.inputBase} placeholder="Name" ></input>
            <div className={classes.error}>{errorNameOfCard}</div>
          </div>
          <Box display='flex'>
            <Box width='50%' marginRight='17px'>
              <div className={classes.groupInput}>
                <Text size="medium">Expiry Date</Text>
                <CardExpiryElement options={{
                  placeholder: "MM/YY",
                  classes: {
                    base: classes.inputBase,
                    // invalid: classes.invalid,
                  }
                }} />
                {renderError("expDate")}
              </div>
            </Box>
            <Box width='50%' marginLeft='17px'>
              <div className={classes.groupInput}>
                <Box display="flex">
                  <Text size="medium">CVV</Text>
                  <img src={Images.icInfo} className={classes.imgInfo} />
                </Box>
                <CardCvcElement options={{
                  placeholder: "CVV",
                  classes: {
                    base: classes.inputBase,
                    // invalid: classes.invalid,
                  }
                }} />
                {renderError("CCV")}
              </div>
            </Box>
          </Box>
        </Grid> */}

        <FormControlLabel
          classes={{ root: classes.rootLabelRadio }}
          control={
            <Checkbox
              value={termAndConditions}
              name="conditions"
              checked={termAndConditions}
              classes={{ root: classes.rooCheckbox }}
              color="primary"
              onChange={handleChangeTermAndConditions}
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
      </Grid>

      <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
        <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">
          {isShowSignUp ? 'Sign Up' : 'Login'}
        </Buttons>
      </Grid>
    </form>

  )
}

const CardPayment = ({
  unlimited,
  handleChangeUnlimited,
  handleChangeNameCard,
  price,
  handleChangeCard,
  renderError,
  errorNameOfCard,
  plans,
}) => {
  const classes = useStyles()
  const isLoading = useSelector((state) => state.global.isLoading)

  return (
    <>
      <Grid container classes={{ root: classes.secureForm }}>
        <Text classes={{ root: classes.textSecure }}>Secure Checkout Form</Text>
        <img className={classes.lockForm} src={Images.icLockPayment} alt="lock-cortishare" />
      </Grid>

      <Grid
        container
        alignItems="center"
        justify="space-between"
        classes={{ root: classes.unlimited }}
      >
        {isLoading && <Loading />}
        <Grid>
          <Text size="medium">CortiShare Unlimited</Text>
          <FormControl classes={{ root: classes.rootFormControl }}>
            <NativeSelect
              value={unlimited}
              onChange={handleChangeUnlimited}
              id="select-plan"
              classes={{ root: classes.rootSelectFocus }}
              disableUnderline
              IconComponent={() => <ExpandMoreIcon />}
            >
              {plans &&
                plans.map((item, index) => (
                  <option value={item.id}
                    key={index}>
                    {item.title}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Text size="big">
          <span>USD {price}</span>
        </Text>
      </Grid>

      <Grid container wrap="nowrap" classes={{ root: classes.secureCredit }}>
        <img className={classes.lockCredit} src={Images.icLockPaymentCredit} alt="lock-cortishare" />
        <Text classes={{ root: classes.textSecureCredit }}>
          Secure credit card payment  - this is a secure 256-bit SSL encrypted payment
        </Text>
      </Grid>

      <Grid container direction="column" wrap="nowrap">
        <div className={classes.parent}>
          {isLoading && <Loading />}
          <img className={classes.visaGrey} src={Images.icVisaGrey}></img>
          <div className={clsx(classes.groupInput, classes.groupInputHaveImg)}>
            <Text size="medium">Card Number</Text>
            <div className={classes.parent}>
              <img src={Images.icVisaBlue} className={classes.visaInput} />
              <CardNumberElement
                options={{
                  placeholder: "8888-8888-8888-8888",
                  classes: {
                    base: classes.inputBase,
                    // invalid: classes.invalid,
                  }
                }}
                onChange={event => {
                  // console.log("CardNumberElement [change]", event);
                  handleChangeCard(event, "cardNumber");
                }}
              />
              {renderError("cardNumber")}
            </div>
          </div>
        </div>
        <div className={classes.groupInput}>
          <Text size="medium">Name on Card</Text>
          <input onChange={handleChangeNameCard} className={classes.inputBase} placeholder="Name" ></input>
          <div className={classes.error}>{errorNameOfCard}</div>
        </div>
        <Box display='flex'>
          <Box width='50%' marginRight='17px'>
            <div className={classes.groupInput}>
              <Text size="medium">Expiry Date</Text>
              <CardExpiryElement options={{
                placeholder: "MM/YY",
                classes: {
                  base: classes.inputBase,
                  // invalid: classes.invalid,
                }
              }} />
              {renderError("expDate")}
            </div>
          </Box>
          <Box width='50%' marginLeft='17px'>
            <div className={classes.groupInput}>
              <Box display="flex">
                <Text size="medium">CVV</Text>
                <img src={Images.icInfo} className={classes.imgInfo} />
              </Box>
              <CardCvcElement options={{
                placeholder: "CVV",
                classes: {
                  base: classes.inputBase,
                  // invalid: classes.invalid,
                }
              }} />
              {renderError("CCV")}
            </div>
          </Box>
        </Box>
        {/* <Box display="flex" justifyContent="flex-end">
            <Buttons btnType="height" disabled={!stripe}>PAY</Buttons>
          </Box> */}
      </Grid>
    </>
  )
}

// import React, { useEffect, useState } from 'react'
// import { Grid } from '@material-ui/core';
// import { Text } from 'components'
// import clsx from 'clsx'
// import useStyles from './styles';
// import Images from 'config/images'
// import { useHistory } from 'react-router-dom';
// import {isLoggedIn} from 'helpers';
// import UnlimitedPlan from 'components/PopupUpgrade/components/UnlimitedPlan';
// import { ConversionsAPIFacebook } from 'services/CAPI'

// export default function Payment() {
//   const classes = useStyles();
//   const history = useHistory();
//   const [isCheckLoggedIn] = useState(isLoggedIn)
//   const customer = JSON.parse(localStorage.getItem('customer'))

//   //CAPI
//   useEffect(() => {
//     if (customer) {
//       const data = {
//         event_name: 'PageView',
//         user_data: {
//           email: [customer.email]
//         },
//         custom_data: {
//           content_name: 'Open Upgrade',
//         }
//       }
//       ConversionsAPIFacebook(data)
//     }
//   }, [])

//   const handleSignUp = () => {
//     if (isCheckLoggedIn) {
//       return
//     } else {
//       history.push('/sign-up')
//     }
//   }

//   const handleClickHomePage = () => {
//     history.push('/')
//   }

//   return (
//     <Grid className={classes.mainContent}>
//       <img onClick={handleClickHomePage} className={classes.logo} src={Images.logo} alt="" />
//       <Grid className={classes.maintitle}>Get the CortiShare That’s For You!</Grid>

//       <Grid className={classes.container}>
//         <Grid classes={{ root: classes.containerBody }}>
//           <Grid container alignItems="center" justify="space-between" direction="column" classes={{ root: classes.layoutLeft }}>
//             <Text size="large"><span>Free Plan</span></Text>
//             <p className={classes.price}>$0 <span>Month</span></p>
//             <Grid container alignItems="center" direction="column">
//               <Text classes={{ root: classes.title }}>Number of Boards</Text>
//               <p className={classes.price}>1</p>
//             </Grid>
//             <Grid container alignItems="center" direction="column">
//               <Text classes={{ root: classes.title }}>Number of Collaborating Boards</Text>
//               <p className={classes.price}>1</p>
//             </Grid>
//             <Grid onClick={() => handleSignUp()}>
//               {
//                 isCheckLoggedIn && customer ?
//                 <Text classes={{ root: classes.signUp }} >Current Plan</Text>
//                 :
//                 <Text classes={{ root: classes.signUp }} >SIGN UP NOW!
//                   <img className={classes.iconSignUp} src={Images.icChevronBigDown} alt="Chevron Right" />
//                 </Text>
//               }
//             </Grid>
//           </Grid>
//           <Grid container alignItems="center" justify="space-between" wrap="nowrap" direction="column" classes={{ root: classes.layoutRight }}>
//             <Text size="large">Unlimited Plan</Text>
//             <Grid container alignItems="center" direction="column" justify="center">
//               <p className={classes.price}>4.99$ / month</p>

//               {/* <p className={classes.price}>$48 / Year</p> */}
//               {/* <Text size="small">or 4.99 / month</Text> */}
//             </Grid>
//             <Grid container alignItems="center" direction="column">
//               <img src={Images.icPostPopup} alt="" />
//               <Text size="small">Unlimited Boards and Collaborations</Text>
//             </Grid>
//             <Grid container alignItems="center" direction="column">
//               {isCheckLoggedIn && customer ?
//                 <UnlimitedPlan />
//                 :
//                 <button className={classes.btn} onClick={() => handleSignUp()}>SIGN UP NOW!
//                   <img className={classes.iconSignUp} src={Images.icChevronBigDown} alt="Chevron Right" />
//                 </button>
//               }
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   )
// }
