import React, { useEffect } from 'react';
import { Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import 'react-tagsinput/react-tagsinput.css';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, connect, useSelector } from 'react-redux';
import { 
  GET_NOTIFICATION_REQUEST, 
  RESET_NOTIFICATION,
} from 'redux/reducers/notification/actionTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from 'components';
import { LoadingIconMore, Text } from 'components';
import NotificationItem from '../NotificationItem';


const MobileNotification = ({ openMobileNotification, handleClose, handleSelectNotification}) => {
  const classes = useStyles();
  const { page, size, notis, loading, totalPage } = useSelector((state) => state.notification)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
      payload: {
        page: page + 1,
        size: size,
        firstTime: true,
      }
    })
    return (() => {
      dispatch({
        type: RESET_NOTIFICATION
      })
    })
  }, [])

  const loadMore = () => {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
      payload: {
        page: page + 1,
        size: size,
        firstTime: false,
      }
    })
  }

  return (
    <Dialog
      open={openMobileNotification}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      <DialogContent id="wrapperScroll" classes={{ root: classes.containerBody }}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
          classes={{ root: classes.layoutLogin }}
        >
          <Grid className={classes.HeaderFixed}> 
            <Grid className={classes.HeaderSection}>
              <span className={classes.HeaderTitle}>Notifications</span>
              <CloseIcon onClick={handleClose} className={classes.icClose} />
            </Grid>
          </Grid>

          <InfiniteScroll
            scrollableTarget="wrapperScroll"
            className={classes.dropdown}
            dataLength={notis.length}
            // height={'100%'}
            next={loadMore}
            hasMore={page < totalPage}
            loader={<LoadingIconMore />}
          >
            {/* {loading && <Loading />}
            {(loading === false && notis.length === 0) && <Typography align="center">You have no notifications</Typography>} */}
        
            {(notis.length === 0 ?
              loading ?
                <Loading type="noti" />
              :
                <Grid container alignItems='center' justify="center" classes={{ root: classes.containerText }}>
                  <Text align="center">There is no notification.</Text>
                </Grid>
              :
              notis.map((item, index) =>
                <NotificationItem 
                  item={item}
                  index={index}
                  handleSelectNotification={handleSelectNotification}
                />   
              ))
            }
          </InfiniteScroll>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default connect()(MobileNotification)

