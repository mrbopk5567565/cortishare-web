import React, { useState } from 'react';
import { Dialog, Grid, Hidden, DialogContent } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { Buttons, Text, Inputs } from 'components'
import { useDispatch, connect, useSelector } from 'react-redux';
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';
import { useForm, Controller } from "react-hook-form"
import { RESENT_EMAIL_REQUEST } from 'redux/reducers/authentication/actionTypes'

const ResentEmail = ({ openPopup, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
      const data = {
        email: values.email
      }
      const onSuccess = () => {
        handleClose()
      }
      dispatch({ type: RESENT_EMAIL_REQUEST, payload: data, onSuccess })
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={openPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.container,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        <DialogContent classes={{ root: classes.containerBody }}>
          <Hidden smUp>
            <div className={classes.buttonClose} onClick={handleClose}>
              <img src={Images.icCloseBig} />
            </div>
          </Hidden>

          <Grid
            container
            alignItems="center"
            direction="column"
            justify="space-between"
            classes={{ root: classes.layoutLogin }}
          >
            <Grid container alignItems="center" direction="column" justify="center" classes={{ root: classes.layoutContainer }} direction="column">
              <img src={logoTextBlackHighRes} className={classes.containerLogoLogin} />
              <Text size="medium" classes={{ root: classes.textIntroduce }}>Enter your CortiShare email to resend email confirmation</Text>

              <Grid container alignItems="flex-start" justify="center">
                <form
                  className={classes.formLogin}
                  onSubmit={handleSubmit(onSubmit)}
                >
                 <Inputs
                  title="Email"
                  placeholder="Email"
                  name="email"
                  register={register}
                  required={true}
                  errors={errors}
                />
                  <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
                    <Buttons classes={{ root: classes.buttonSubmit }} btnType="large">Submit</Buttons>
                  </Grid>
                </form>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResentEmail;