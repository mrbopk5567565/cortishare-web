import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { useForm, Controller } from "react-hook-form"
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import { Buttons, Text, Inputs } from 'components'
import { RESET_PASSWORD_REQUEST } from 'redux/reducers/authentication/actionTypes'
import { Loading } from 'components'
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';

const ResetPassword = ({ handleClose }) => {
  const isLoading = useSelector((state) => state.global.isLoading)
  const dispatch = useDispatch();
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  const [isSubmit, setIsSubmit] = useState(false)
  const onSubmit = values => {
    const data = {
      email: values.email
    }
    const onSuccess = () => {
      setIsSubmit(!isSubmit);
    }
    dispatch({ type: RESET_PASSWORD_REQUEST, payload: data, onSuccess })
  }

  // const getHelpers = () => {
  //   dispatch({
  //     type: IS_HELPERS
  //   })
  // }

  const handleEditEmail = () => {
    setIsSubmit(!isSubmit)
  }

  const handleBack = () => {
    handleClose()
  }



  const renderResetPassword = () => {
    return (
      <Grid classes={{ root: classes.containerLogoLogin }}>
        <form
          className={classes.formSection}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid className={classes.formLogin}>
            <Text size="medium" classes={{ root: classes.textIntroduce }}>Enter your CortiShare email to reset your password</Text>
            <Inputs
              title="Email"
              placeholder="Email"
              name="email"
              register={register}
              required={true}
              errors={errors}
            />

            <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
              <Buttons btnType="large">Submit</Buttons>
            </Grid>

          </Grid>
          <Grid container alignItems="center" justify="center" classes={{ root: classes.layoutFooter }}>
            <Text size="large" handleClick={handleBack}>Back to Login</Text>
          </Grid>
        </form>
      </Grid>
    )
  }

  const renderNotification = () => {
    return (
      <Grid container alignItems="center" justify="center" classes={{ root: classes.containerLogoLogin }}>
        <form
       
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid className={classes.formLogin}>
            <Grid classes={{ root: classes.formTitleSection }}>
              <div className={classes.title}>An Email has been sent to reset your password</div>
              <div>Kindly check your email</div>
            </Grid>

            <Grid container item justify="space-between" alignItems="center" classes={{ root: classes.notificationButtons }}>
              <div className={classes.notificationBtn} onClick={handleEditEmail}>Edit email</div>
              <Buttons onClick={handleBack} btnType="medium">Back to Login</Buttons>
            </Grid>

          </Grid>
        </form>
      </Grid>
    )
  }

  return (
    <>

      <Grid
        container
        alignItems="center"
        direction="column"
        justify="space-between"
        classes={{ root: classes.layoutLogin }}
      >
        {isLoading && <Loading />}
        <Grid classes={{ root: classes.layoutContainer }}>
          <Grid classes={{ root: classes.layoutImage }}>
            <img src={logoTextBlackHighRes} className={classes.image}/>
          </Grid>
          {isSubmit ? renderNotification() : renderResetPassword()}
        </Grid>
      </Grid>
    </>


  );
}

export default connect()(ResetPassword);