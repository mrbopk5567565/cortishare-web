import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { Text } from 'components';
import { useDispatch, connect, useSelector } from 'react-redux';
import { LoadingIconMore } from 'components';
import { GET_NOTIFICATION_REQUEST, RESET_NOTIFICATION } from 'redux/reducers/notification/actionTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from 'components';
import NotificationItem from '../NotificationItem';
const Notification = ({ open, handleSelectNotification }) => {
  const classes = useStyles();
  const { page, size, notis, loading, totalPage } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
      payload: {
        page: page + 1,
        size: size
      }
    })
    return (() => {
      dispatch({
        type: RESET_NOTIFICATION,
      })
    })
  },[]);

  const loadMore = () => {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
      payload: {
        page: page + 1,
        size: size
      }
    })
  }

  return (
    <div>
      {open &&
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={notis.length}
          height={441}
          next={loadMore}
          hasMore={page < totalPage}
          loader={<LoadingIconMore />}
        >
          <Text size="medium">Notifications</Text>
          {
            (notis.length === 0 ?
              loading ?
                <Loading type="noti" />
              :
                <Grid container alignItems='center' justify="center" classes={{ root: classes.containerText }}>
                  <Text align="center">There is no notification.</Text>
                </Grid>
              :
              notis.map((item, index) => 
                <NotificationItem 
                  key={index}
                  item={item}
                  index={index}
                  handleSelectNotification={handleSelectNotification}
                />           
              )
            )
          }
        </InfiniteScroll>
      }
    </div>
  );
}

export default connect()(Notification)
