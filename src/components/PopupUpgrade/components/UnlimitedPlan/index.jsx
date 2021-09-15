import React, { useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  FormControl,
  Hidden,
  NativeSelect
} from '@material-ui/core';
import { Buttons, Text } from 'components'
import useStyles from './styles';
import Images from 'config/images'
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NoPaymentMethod from '../NoPaymentMethod'
import HavePaymentMethod from '../HavePaymentMethod'
import { HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_GET_ALL_PLAN_REQUEST } from 'redux/reducers/profile/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Loading'
import { checkPaymentStatus } from 'helpers'
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png'
import { ConversionsAPIFacebook } from 'services/CAPI'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChekoutForm = ({ handleClosePostPopup }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [unlimited, setUnlimited] = React.useState(1);
  const [price, setPrice] = React.useState(0);
  const [stripePriceId, setStripePriceId] = React.useState(null);
  const [stripePlanId, setStripePlanId] = React.useState(null);
  const [typeBilling, setTypeBilling] = React.useState(null);
  const dispatch = useDispatch();
  const { plan, info, payment, paymentMethod, plans } = useSelector((state) => state.profile)
  const isLoading = useSelector((state) => state.global.isLoading)
  const customer = JSON.parse(localStorage.getItem('customer'))

  useEffect(() => {
    dispatch(
      { type: HANDLE_GET_INFO_DETAIL_REQUEST }
    )
    dispatch(
      { type: HANDLE_GET_ALL_PLAN_REQUEST, isLoading: true }
    )
  }, [])

  // check if unlimite change ---
  useEffect(() => {
    if (plans.length == 0) return
    let object = plans.filter(item => item.id == unlimited)

    if (object.length == 0) return;
    setPrice(object[0] && object[0].price);
    setStripePriceId(object[0] ? object[0].stripePriceId : null);
    setStripePlanId(object[0] ? object[0].stripePlanId : null);
    setTypeBilling(object[0] ? object[0].typeBilling : null);
  }, [unlimited])

  useEffect(() => {
    if (plans.length == 0) return
    setPrice(plans[0].price);
    setStripePriceId(plans[0].stripePriceId);
    setStripePlanId(plans[0].stripePlanId);
    setTypeBilling(plans[0].typeBilling)
  }, [plans])

  useEffect(() => {
    if ([0,2,4].includes(checkPaymentStatus({ customer: info, payment: payment }))) return;
    setUnlimited(plan.id);
    setPrice(plan.price);
    setStripePriceId(plan.stripePriceId);
    setStripePlanId(plan.stripePlanId);
    setTypeBilling(plan.typeBilling)
  }, [plan])


  const handleChange = (event) => {
    setUnlimited(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);

    //CAPI
    const data = {
      event_name: 'InitiateCheckout',
      user_data: {
        email: [customer.email]
      },
      custom_data: {
        content_name: 'Open Subscribe',
      }
    }
    ConversionsAPIFacebook(data)
  };

  const handleClose = () => {
    if (handleClosePostPopup) {
      handleClosePostPopup()
    }
    setOpen(false);
  };

  const stripe = useStripe();
  const elements = useElements();


  return (
    <Elements stripe={stripePromise}>
      <div className={classes.root}>
        <Buttons btnType="large" onClick={handleClickOpen}>Subscribe Now</Buttons>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.PopupSection}>
          <Grid>
            <AppBar className={classes.appBar}>
              <Toolbar classes={{ root: classes.toolbar }}>
                <img src={logoTextBlackHighRes} alt="" />
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <img src={Images.icCloseBig} alt="" />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>

          <Grid classes={{ root: classes.container }}>
            <Hidden xsDown>
              <p className={classes.title}>Upgrade to Unlimited Plan</p>
            </Hidden>
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
                    onChange={handleChange}
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
            {!paymentMethod && <NoPaymentMethod
              stripePriceId={stripePriceId}
              unlimited={unlimited}
              plan={plan}
              handleClose={handleClose}
            />}
            {paymentMethod && <HavePaymentMethod
              typeBilling={typeBilling}
              stripePlanId={stripePlanId}
              stripePriceId={stripePriceId}
              paymentMethod={paymentMethod}
              handleClose={handleClose}
              plan={plan}
              info={info}
              unlimited={unlimited} />}

          </Grid>
        </Dialog>
      </div>
    </Elements>
  );
}

const UnlimitedPlan = ({ handleClosePostPopup }) => {
  return (
    <Elements stripe={stripePromise}>
      <ChekoutForm handleClosePostPopup={handleClosePostPopup} />
    </Elements>
  );
};

export default UnlimitedPlan;