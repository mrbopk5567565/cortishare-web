import React, { useState } from 'react';
import { Grid, Avatar, Box, Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { Text, PopupUpgrade } from 'components';
import { useDispatch, connect } from 'react-redux';
import {
  UPDATE_STATUS_NOTIFICATION,
  ACCEPT_COLLABORATE_REQUEST,
  REJECT_COLLABORATE_REQUEST,
  GET_COLLABORATE_REQUEST,
} from 'redux/reducers/notification/actionTypes';
import moment from 'moment';
import clsx from 'clsx';
import { getTimeZone } from 'helpers'


const NotificationItem = ({ item, index, handleSelectNotification }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)

  const handleOpenUpgrade = () => {
    setIsOpenUpgrade(true)
  }

  const handleCloseUpgrade = () => {
    setIsOpenUpgrade(false)
  }

  const handleAccept = (item) => {
    let onSuccess = (id) => {
      handleClickAcceptOrReject(id)
    }
    const onFail = () => {
      handleOpenUpgrade();
    }
    dispatch({
      type: ACCEPT_COLLABORATE_REQUEST,
      payload: {
        mapId: item.mapId,
        notificationId: item.id
      },
      onSuccess,
      onFail
    })
  }

  const handleReject = (item) => {
    let onSuccess = (id) => {
      handleClickAcceptOrReject(id)
    }
    dispatch({
      type: REJECT_COLLABORATE_REQUEST,
      payload: {
        mapId: item.mapId,
        notificationId: item.id
      },
      onSuccess
    })
  }

  const handleClickNotification = (item, link) => {
    if (!item.isRead)
      dispatch({
        type: UPDATE_STATUS_NOTIFICATION,
        payload: {
          NotificationId: item.id
        }
      })
    handleSelectNotification(false);
    if ((item.type === 'MapSharing' || item.type === 'RequestAccess' || item.type === 'RequestFollow') && item.status === 'Pendding') {
      dispatch({
        type: GET_COLLABORATE_REQUEST,
        payload: {
          mapId: item.mapId,
          notificationId: item.id,
        }
      })
    }
    history.push(link);
  }

  const handleClickAcceptOrReject = (id) => {
    dispatch({
      type: UPDATE_STATUS_NOTIFICATION,
      payload: {
        NotificationId: id
      }
    })
  }
  let description = '';
  let link = '';
  switch (item.type) {
    case 'MapSharing':
      description = `${item.userName} invited you to collaborate on`;
      link = `/board/${item.typeId}`;
      break;
    case 'Map':
      description = `${item.userName} created a board`;
      link = `/board/${item.typeId}`;
      break;
    case 'Post':
      description = `${item.userName} added a post`;
      link = `/board/${item.mapId}/post/${item.typeId}`;
      break;
    case 'PostComment':
      link = `/board/${item.mapId}/post/${item.typeId}`;
      if (item.description === "Commented on your post") {
        description = `${item.userName} commented on your post`;
      } else if (item.description === "Commented on the post that your following") {
        description = `${item.userName} commented on the post that you are following`;
      } else {
        return null;
      }
      break;
    case 'RequestAccess':
      description = `${item.userName} requested your permission to collaborate on`;
      link = `/board/${item.typeId}`;
      break;
    case 'RequestFollow':
      if (item.status === 'Accept') {
        description = `${item.userName} accepted your invitation to view`;
      } else if (item.status === 'Reject') {
        description = `${item.userName} rejected your invitation to view`;
      } else {
        description = `${item.userName} requested your permission to view`;
      }
      link = `/board/${item.typeId}`;
      break;
    case 'Invite':
      description = `${item.userName} ${item.status === 'Accept' ? 'accepted' : 'rejected'} your invitation to collaborate on`;
      link = `/board/${item.typeId}`;
      break;
    case 'Request':
      description = `${item.userName} ${item.status === 'Accept' ? 'accepted' : 'rejected'} your request to collaborate on`;
      link = `/board/${item.typeId}`;
      break;
    default: {
      description = `${item.userName} created a board`;
      break;
    }
  }

  return (
    <Grid
      key={index}
      container
      classes={{ root: clsx(classes.container, item.isRead ? classes.read : classes.unread) }}>
      <Grid className={classes.displayFlex}>
        <Grid>
          {item.profilePicture != null
            ?
            <Avatar src={item.profilePicture} alt="" classes={{ root: classes.avatar }} />
            :
            <Avatar alt="" classes={{ root: classes.avatar }} />
          }
        </Grid>
        <Grid className={classes.textNoti}>
          <Grid onClick={() => handleClickNotification(item, link)}>
            <Text classes={{ root: clsx(item.isRead ? classes.read : classes.unread) }}>{description} &#60;{item.title}&#62;</Text>
            {
              (item.type === 'MapSharing' || item.type === 'RequestAccess') &&
              (item.status === 'Pendding') &&
              <Text classes={{ root: classes.description }}>
                {`Click on the button below to access the board.`}
              </Text>
            }
            <Text classes={{ root: classes.description }}>{moment(item.creationTime).format('DD MMM YYYY[,] hh:mm A')}</Text>
          </Grid>
          {(item.type === 'MapSharing' || item.type === 'RequestAccess' || item.type === 'RequestFollow') &&
            (item.status === 'Pendding' ?
              <Grid>
                <Button onClick={() => handleAccept(item)} className={classes.btnAccept}>Accept</Button>
                <Button onClick={() => handleReject(item)} className={classes.btnReject}>Reject</Button>
              </Grid> :
              item.status === 'Accept' ?
                <div className={classes.textAccept}>Accepted</div> :
                <div className={classes.textReject}>Rejected</div>
            )
          }
        </Grid>
      </Grid>
      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
    </Grid>
  );
}

export default connect()(NotificationItem)
