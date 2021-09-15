import React, { useState, memo } from 'react';
import { Box, Dialog, Button } from '@material-ui/core';
import { Buttons, Text } from 'components'
import useStyles from './styles'
import Images from 'config/images'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_DEACTIVE_ACCOUNT } from 'redux/reducers/profile/actionTypes'

const DeactiveAccount = memo((props) => {
  const { isOpen,
    handleClose } = props
  const dispatch = useDispatch()
  const history = useHistory();

  const classes = useStyles()
  const [pass, setPass] = useState('')
  const isLoading = useSelector((state) => state.global.isLoading)

  const handleSubmit = (event) => {
    event.preventDefault();
    const onSuccess = () => {
      history.push('/');
    }

    dispatch({
      type: HANDLE_DEACTIVE_ACCOUNT,
      payload: {
        password: pass
      },
      onSuccess: onSuccess
    })
  }
  const handleChangePass = (event) => {
    setPass(event.target.value)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen} classes={{ root: classes.dialogPaper }}>
      <Text classes={{ root: classes.title }}>Are you sure to deactive your account?</Text>
      <Text classes={{ root: classes.description }}>Please enter your password below to confirm</Text>
      <form onSubmit={handleSubmit}>
        <div className={classes.groupInput}>
          <Text size="medium">Password</Text>
          <input onChange={handleChangePass} placeholder="Password" className={classes.inputBase} type="password" />
        </div>
        <Box display="flex" justifyContent="center" className={classes.groupButton}>
          <Button disabled={isLoading} className={clsx(classes.btn, classes.btnYes)} type="submit">Yes</Button>
          <Button className={clsx(classes.btn, classes.btnNo)} onClick={handleClose}>No</Button>
        </Box>
      </form>
    </Dialog>
  )
})

export default DeactiveAccount