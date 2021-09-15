import React, { useState, useEffect, useCallback } from 'react';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box, Dialog, Grid } from '@material-ui/core';
import { Buttons, Text } from 'components'
import useStyles from './styles'
import Images from 'config/images'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { HANDLE_ADD_PAYMENT_METHOD, HANDLE_GET_INFO_DETAIL_REQUEST } from 'redux/reducers/profile/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes'
import Loading from 'components/Loading'
import CloseIcon from '@material-ui/icons/Close';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const ChangeCreditCard = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <FormEditProfile {...props} />
    </Elements>
  );
};

const useWindowWidth = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return widthWindow
}

const FormEditProfile = (props) => {
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const {
    isOpen,
    handleClose,
    isShowAlertSumbit,
    onHandleCreateSubscription } = props
  const classes = useStyles()
  const [errorValidate, setErrorValidate] = useState('')
  const [errorNameOfCard, setErrorNameOfCard] = useState('')
  const [nameCard, setNameCard] = useState('')
  const isLoading = useSelector((state) => state.global.isLoading)

  const handleChangeNameCard = (e) => {
    let regexNumber = /[0-9]/;
    if (e.target.value != '' && regexNumber.test(e.target.value)) {
      setErrorNameOfCard('Name Card no number')
    } else {
      setErrorNameOfCard('')
    }
    setNameCard(e.target.value)
  }
  const stateWindowWidth = useWindowWidth()

  const handleSubmitCard = async (event) => {
    // Block native form submission.
    event.preventDefault();
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
            handleClose()
            if (!res.paymentMethod) {
              toast.success("Create Card Was Wrong!");
              return;
            }
            if (props.isReset) {
              dispatch(
                { type: HANDLE_GET_INFO_DETAIL_REQUEST }
              )
            }
            if (onHandleCreateSubscription && res) {
              onHandleCreateSubscription(res.paymentMethod);
            }
            if (isShowAlertSumbit) {
              toast.success("Updated credit card");
            }
          }
        })

      }
    }
  }

  const handleChange = (event, type) => {
    if (event.error || !event.complete) {
      if (event.error && event.error.code) {
        setErrorValidate(event.error.code)
      }
    } else {
      setErrorValidate('')
    }
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

  const renderForm = () => {
    return (
      <Grid>
        {props.isPopup &&
          < CloseIcon onClick={handleClose} className={classes.buttonClose} />
        }
        <form onSubmit={handleSubmitCard}>
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
                    handleChange(event, "cardNumber");
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
          <Box display="flex" justifyContent="flex-end">
            <Buttons btnType="height" disabled={!stripe}>PAY</Buttons>
          </Box>
        </form>
      </Grid>
    )
  }

  return (
    <>
      {!props.isPopup && renderForm()}
      {props.isPopup && (<Dialog onClose={handleClose} open={isOpen} classes={{ root: classes.dialogSection, paper: stateWindowWidth <= 600 ? classes.dialogPaperMobile : classes.dialogPaper }}>
        {renderForm()}
      </Dialog>)}

    </>
  )
}


export default ChangeCreditCard

