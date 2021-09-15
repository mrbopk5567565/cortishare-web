import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Text, Layout, LoadingIconMore, MapEmpty, CardAccount } from 'components'
import { useHistory } from 'react-router-dom';
import { GET_FOLLOWING_CUSTOMERS_REQUEST } from 'redux/reducers/map/actionTypes'
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import useStylesCommon from 'utils/stylesCommon';


const Follower = ({ setDefault }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const classesCommon = useStylesCommon()
  const followingsCustomer = useSelector((state) => state.map.followingsCustomer)
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    dispatch({
      type: GET_FOLLOWING_CUSTOMERS_REQUEST,
      payload: {
        PageNumber: 1,
        PageSize: 12,
      },
      onSuccess: () => {
        setDefault(true)
        setFlag(true)
      }
    })
  }, [])

  useEffect(() => {
    if (Object.keys(followingsCustomer).length === 0 &&
      Object.keys(followingsCustomer.data).length === 0
    ) return
    if (!flag) return
    const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
    const bodyHeight = document.getElementById('body-follower') ? document.getElementById('body-follower').clientHeight : 0
    if (window.innerHeight > (headerHeight + bodyHeight) && followingsCustomer.page < followingsCustomer.pageTotal) {
      loadMore()
    }
  }, [followingsCustomer])

  const handleClickDiscoverMaps = () => {
    history.push('/search')
  }

  const loadMore = () => {
    dispatch({
      type: GET_FOLLOWING_CUSTOMERS_REQUEST,
      payload: {
        PageNumber: followingsCustomer.page + 1,
        PageSize: followingsCustomer.size,
      },
    })
  }

  return (
    <div id='body-follower'>
      {flag && Object.keys(followingsCustomer).length !== 0 && followingsCustomer.data && followingsCustomer.data.length > 0 ?
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={followingsCustomer.data.length}
          next={loadMore}
          hasMore={followingsCustomer.page < followingsCustomer.pageTotal}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid container classes={{ root: clsx(classes.container, classesCommon.layout) }} direction="column">
              <Text classes={{ root: classes.text }} level='title'>{`Following ${followingsCustomer.totalCount} ${followingsCustomer.totalCount > 1 ? 'Users' : 'User'}`}</Text>
              <Grid
                classes={{
                  root: classes.containerMap,
                }}
                container
                spacing={2}
                classes={{ root: clsx(classes.card, classes.containerItem) }}
              >
                {followingsCustomer?.data.map((item, index) => {
                  return (
                    <CardAccount item={item} index={index} key={index} />
                  )
                })}
              </Grid>
            </Grid>
          </Layout>
        </InfiniteScroll>
        :
        <Layout>
          <MapEmpty
            title=''
            isProfile={false}
            isCreate={false}
            isFollowing={true}
            handleClickDiscoverMaps={handleClickDiscoverMaps}
            content="You are not following any user"
          />
        </Layout>
      }
    </div>
  );
}

export default connect()(Follower);