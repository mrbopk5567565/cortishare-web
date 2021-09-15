import React, { } from 'react';
import { Dialog, Grid, Typography, Hidden, DialogContent, DialogActions, Button } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import clsx from 'clsx'
import { Text } from 'components'
import { HANDLE_CANCEL_SUBSCRIPTION_REQUEST, HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_DELETE_PAYMENT_METHOD } from 'redux/reducers/profile/actionTypes';
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes'
import Loading from 'components/Loading'
import { toast } from 'react-toastify'
const PopupCancelPlan = ({ isopenPopup, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isLoading = useSelector((state) => state.global.isLoading)
  const { paymentMethod } = useSelector((state) => state.profile)
  // const handleOnSuccess = () => {
  //   dispatch({
  //     type: HANDLE_GET_INFO_DETAIL_REQUEST,
  //     callbackFunc: () => {
  //       toast.success("Cancel Plan Sucessfully");
  //     }
  //   })
  //   handleClose();
  // }
  // const handleOnFailure = () => {
  //   handleClose();
  // }
  const handleCancelPlan = () => {
    dispatch({ type: SET_IS_LOADING })
    dispatch({
      type: HANDLE_CANCEL_SUBSCRIPTION_REQUEST,
      onSuccess: handleOnSuccessCancelPlan,
      onFailure: handleOnFailureCancelPlan,
    }
    )
  }

  const handleOnSuccessCancelPlan = () => {
    setTimeout(() => {
      dispatch(
        { type: HANDLE_GET_INFO_DETAIL_REQUEST })
      toast.success("Cancel Plan Sucessfully");
      handleClose();
    })
  }
  const handleOnFailureCancelPlan = () => {
    handleClose();
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
        <Text size="large">Are you sure you want to cancel your current plan?</Text>
      </DialogContent>
      <DialogActions classes={{ root: classes.containerButton}}>
        <Button classes={{ root: clsx(classes.buttons, classes.buttonYes) }} onClick={handleCancelPlan} autoFocus>
          Yes
          </Button>
        <Button disabled={isLoading} classes={{ root: clsx(classes.buttons, classes.buttonDelete) }} onClick={handleClose} >
          No
          </Button>
      </DialogActions>
    </Dialog>

  );
}

export default PopupCancelPlan;