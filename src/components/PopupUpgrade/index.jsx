import React, { useEffect } from 'react';
import { Dialog, DialogContent, Grid, Hidden } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx'
import PostPopupMobile from 'modules/Subscription/PostPopupMobile'
import { Text } from 'components'
import UnlimitedPlan from './components/UnlimitedPlan'
import { ConversionsAPIFacebook } from 'services/CAPI'

const PopupUpgrade = ({ openUpgrade, handleClose }) => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const classes = useStyles();
  const customer = JSON.parse(localStorage.getItem('customer'))

  //CAPI
  useEffect(() => {
    if (customer && openUpgrade) {
      const data = {
        event_name: 'PageView',
        user_data: {
          email: [customer.email]
        },
        custom_data: {
          content_name: 'Open Upgrade',
        }
      }
      ConversionsAPIFacebook(data)
    }
  }, [])

  // const handleSubscribe = e => {

  // }

  return (
    <Dialog
      open={openUpgrade}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ root: classes.container }}
    >
      <Hidden smDown>
        <img src={Images.icCloseCircleFill} alt="" className={classes.iconClose} onClick={handleClose} />
        <DialogContent classes={{ root: classes.containerBody }}>
          <Grid container alignItems="center" justify="space-between" direction="column" classes={{ root: classes.layoutLeft }}>
            <Text size="large"><span>Free Plan</span></Text>
            <p className={classes.price}>$0.00 <span>Month</span></p>
            <Grid container alignItems="center" direction="column">
              <Text classes={{ root: classes.title }}>Number of Boards</Text>
              <p className={classes.price}>1</p>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <Text classes={{ root: classes.title }}>Number of Collaborating Boards</Text>
              <p className={classes.price}>1</p>
            </Grid>
            <Text classes={{ root: classes.title }}>Current Plan</Text>
          </Grid>
          <Grid container alignItems="center" justify="space-between" wrap="nowrap" direction="column" classes={{ root: classes.layoutRight }}>
            <Text size="large">Unlimited Plan</Text>
            <Grid container alignItems="center" direction="column" justify="center">
              <p className={classes.price}>$48 / Year</p>
              <Text size="small">or 4.99 / month</Text>
            </Grid>
            <Grid container alignItems="center" direction="column">
              <img src={Images.icPostPopup} alt="" />
              <Text size="small">Unlimited Boards and collaborations</Text>
            </Grid>
            <UnlimitedPlan handleClosePostPopup={handleClose} />
          </Grid>
        </DialogContent>
      </Hidden>
      <Hidden mdUp>
        <PostPopupMobile handleClose={handleClose} />
      </Hidden>
    </Dialog>

  );
}

export default PopupUpgrade;