import React, { } from 'react';
import { Dialog, Grid, Typography, Hidden, DialogContent, DialogActions, Button } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import clsx from 'clsx'
import { Text } from 'components'
import { HANDLE_CANCEL_SUBSCRIPTION_REQUEST, HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_DELETE_PAYMENT_METHOD } from 'redux/reducers/profile/actionTypes';
import Loading from 'components/Loading'
import { SET_IS_LOADING } from 'redux/reducers/global/actionTypes'
import { toast } from 'react-toastify'
const PopupUnlinkCard = ({ isopenPopup, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isLoading = useSelector((state) => state.global.isLoading)
  const { paymentMethod } = useSelector((state) => state.profile)
  const handleOnSuccess = () => {
    dispatch({
      type: HANDLE_DELETE_PAYMENT_METHOD,
      payload: {
        paymentMethodId: paymentMethod.id
      },
      callbackFunc: () => {
        toast.success("Deleted credit card");
      }
    })
    handleClose();
  }
  const handleOnFailure = () => {
    handleClose();
  }
  const handleCancel = () => {
    dispatch({ type: SET_IS_LOADING })
    dispatch({
      type: HANDLE_CANCEL_SUBSCRIPTION_REQUEST,
      onSuccess: handleOnSuccess,
      onFailure: handleOnFailure,
    }
    )
  }

  return (
    <Dialog
      open={isopenPopup}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      {isLoading && <Loading />}
      <Hidden smUp>
        <img src={Images.icCloseCircleFill} alt="" className={classes.iconClose} onClick={handleClose} />
      </Hidden>

      <DialogContent classes={{ root: classes.containerText }}>
        <Text size="large">Are you sure you want to unlink your card?</Text>
        <Text size="large">Your current plan will be canceled.</Text>
        {/* <Text size="medium">Don’t hesitate to drop us an email by</Text> */}
      </DialogContent>
      <DialogActions classes={{ root: classes.containerButton}}>
        <Button classes={{ root: clsx(classes.buttons, classes.buttonYes) }} onClick={handleCancel} autoFocus>
          Yes
          </Button>
        <Button disabled={isLoading} classes={{ root: clsx(classes.buttons, classes.buttonNo) }} onClick={handleClose} >
          No
          </Button>
      </DialogActions>
    </Dialog>

  );
}

export default PopupUnlinkCard;