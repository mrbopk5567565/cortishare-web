import React from 'react';
import { Dialog, DialogContent, Grid, Hidden } from '@material-ui/core';
import useStyles from './styles';
import { Buttons, Text } from 'components'
import Images from 'config/images'

const LeaveMap = ({ open, handleClose, confirm, isOwner, customerInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.container }}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Hidden smUp>
            <div className={classes.buttonClose} onClick={handleClose}>
              <img src={Images.icCloseBig} alt="close-dialog" />
            </div>
          </Hidden>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="center"
            classes={{ root: classes.layoutLogin }}
          >
            <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
              {isOwner ?
                <>
                  <Text classes={{root: classes.title}}>{`Are you sure to remove ${customerInfo.customerUserName || customerInfo.customerEmail || 'the user'} from the board?`}</Text>
                  <Text classes={{root: classes.description}}>This cannot be undone.</Text>
                </>
                :
                <>
                  <Text classes={{root: classes.title}}>Are you sure you want to leave the board?</Text>
                  <Text classes={{root: classes.description}}>You won’t be able to edit unless you are re-invited.</Text>
                </>
                
              }
              <Grid container item justify="center" alignItems="center" classes={{ root: classes.containerButton }}>
                <Buttons btnType="large" classes={{ root: classes.button }} onClick={confirm}>Yes</Buttons>
                <Buttons btnType="large" onClick={handleClose}>No</Buttons>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeaveMap;