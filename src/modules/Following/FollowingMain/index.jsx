import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Text, LayoutMap, Layout, LoadingIconMore, MapEmpty } from 'components'
import { useHistory } from 'react-router-dom';
import { GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_REQUEST } from 'redux/reducers/map/actionTypes'
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import useStylesCommon from 'utils/stylesCommon';

const FollowingMain = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const classesCommon = useStylesCommon()
  const followingsMap = useSelector((state) => state.map.followingsMap)

  useEffect(() => {
    dispatch({
      type: GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_REQUEST,
      payload: {
        page: 1,
        size: 12,
      },
      isLoading: true,
      onSuccess: () => {
      }
    })
  }, [])

  // useEffect(() => {
  //   if (Object.keys(followingsMap).length === 0) return
  //   if (!flag) return
  //   const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
  //   const bodyHeight = document.getElementById('body-following') ? document.getElementById('body-following').clientHeight : 0
  //   if (window.innerHeight > (headerHeight + bodyHeight) && followingsMap.page < followingsMap.pageTotal) {
  //     loadMore()
  //   }
  // }, [followingsMap])

  const handleClickDiscoverMaps = () => {
    history.push('/search')
  }

  const loadMore = () => {
    dispatch({
      type: GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_REQUEST,
      payload: {
        page: followingsMap.page + 1,
        size: followingsMap.size,
      },
      isLoading: false,
    })
  }

  return (
    <div id='body-following'>
      {Object.keys(followingsMap).length !== 0 && followingsMap.data && followingsMap.data.length > 0 ?
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={followingsMap.data.length}
          next={loadMore}
          hasMore={followingsMap.page < followingsMap.pageTotal}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid container classes={{ root: clsx(classes.container, classesCommon.layout) }} direction="column">
              <Text classes={{ root: classes.text }} level='title'>{`Following ${followingsMap.totalCount} ${followingsMap.totalCount > 1 ? 'Boards' : 'Board'}`}</Text>
              <LayoutMap mapData={followingsMap.data} />
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
            content="You are not following any board"
          />
        </Layout>
      }
    </div>
  );
}

export default connect()(FollowingMain);