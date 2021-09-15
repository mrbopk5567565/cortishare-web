import React, { memo } from 'react';
import { Dialog, DialogActions, Grid, } from '@material-ui/core';
import useStyles from './styles';
import DialogContent from '@material-ui/core/DialogContent';
import { Text, Buttons } from 'components';
import clsx from 'clsx';
import { DELETE_MAP_REQUEST, GET_ALL_BY_CUSTOMER_REQUEST } from 'redux/reducers/map/actionTypes'
import { GET_ALL_MAP_REQUEST } from 'redux/reducers/home/actionTypes'
import { HANDLE_GET_INFO_REQUEST } from 'redux/reducers/profile/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const PopupDeleteMap = memo(({ openDialogDelete, closeDialogDelete, item, isCard }) => {
  const classes = useStyles()
  const matchMyMap = useRouteMatch('/board');
  const matchDashboard = useRouteMatch('/');
  const matchMyProfile = useRouteMatch('/profile');
  const isLoading = useSelector((state) => state.global.isLoading)
  const matchLinkingMinds = useRouteMatch('/search/linking-minds');
  const dispatch = useDispatch()
  const history = useHistory()
  const { page, totalPage, size } = useSelector((state) => state.profile);

  const handleClose = () => {
    closeDialogDelete()
  };

  const handleDeleteMap = () => {
    if (item) {
      const onSuccess = () => {
        closeDialogDelete()
        if (isCard) {
          if (matchMyMap && matchMyMap.isExact) {
            dispatch({ type: GET_ALL_BY_CUSTOMER_REQUEST })
          }
          if (matchDashboard && matchDashboard.isExact) {
            dispatch({ type: GET_ALL_MAP_REQUEST })
          }
          if (matchMyProfile && matchMyProfile.isExact) {
            const customer = JSON.parse(localStorage.getItem('customer'));
            if (!customer || !customer.customerId) {
              toast.error('Id not found');
            } else {
              dispatch({
                type: HANDLE_GET_INFO_REQUEST,
                payload: {
                  customerId: customer.customerId,
                  page: page,
                  size: size,
                },
              })
            }
          }
          if(matchLinkingMinds?.isExact) {
            dispatch({
              type: 'DELETE_MAP_LINKINGMIND',
              payload: item.id
            })
          }
        } else {
          history.push('/board')
        }
      }
      dispatch({ type: DELETE_MAP_REQUEST, mapId: item.id, onSuccess, dispatch })
    }
  }

  return (
    <Dialog
    open={openDialogDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paperDialog }}
    >
      <DialogContent classes={{ root: classes.containerText }}>
        <Text size="large">Are you sure you want to delete this board?</Text>
        
      </DialogContent> 
      
      <Grid container justify="center" classes={{ root: classes.containerButton }}>
        <Buttons onClick={handleClose} btnType='medium' classes={{ root: classes.buttons }} >
          No
        </Buttons>
        <Buttons onClick={handleDeleteMap} disabled={isLoading} btnType='medium' classes={{ root: clsx(classes.buttons, classes.buttonDelete) }}>
          Yes
        </Buttons>
      </Grid>
    </Dialog>
  );
})

export default PopupDeleteMap;