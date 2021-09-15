import React, { useState, useEffect, memo } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Text, Layout, Loading, LayoutMap } from 'components'
import { GET_ALL_MAP_DISCOVER_REQUEST } from 'redux/reducers/discover/actionTypes';
import FilterMap from './components/FilterMap';
import { LoadingIconMore } from 'components'
import InfiniteScroll from 'react-infinite-scroll-component';
import useStylesCommon from 'utils/stylesCommon';
import clsx from 'clsx';

const Maps = memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const paramsMapDiscovery = useSelector((state) => state.discover.paramsMapDiscovery)
  const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const isLoading = useSelector((state) => state.global.isLoading)
  const [flag, setFlag] = useState(false)
  const classesCommon = useStylesCommon()

  // useEffect(() => {
  //   dispatch({
  //     type: GET_ALL_MAP_DISCOVER_REQUEST,
  //     // page discover only filter recommend NOT SEARCH
  //     payload: {
  //       data: { ...paramsMapDiscovery, search: '', tableType: 1, categoryId: 0 },
  //       loadMore: false
  //     },
  //     onSuccess: () => setFlag(true)
  //   })
  // }, [])

  // useEffect(() => {
  //   if(!flag) return
  //   if(!mapDiscover) return
  //   const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
  //   const bodyHeight = document.getElementById('body-discover') ? document.getElementById('body-discover').clientHeight : 0
  //   if(window.innerHeight > (headerHeight + bodyHeight) && paramsMapDiscovery.page < paramsMapDiscovery.pageTotal) {
  //     loadMore()
  //   }
  // }, [mapDiscover, flag])

  // const loadMore = () => {
  //   dispatch({
  //     type: GET_ALL_MAP_DISCOVER_REQUEST,
  //     payload: { 
  //       data: { 
  //         ...paramsMapDiscovery,
  //       },
  //       loadMore: true 
  //     },
  //   })
  // }

  return (
    <div id='body-discover'>
      {/* {isLoading && !flag && <Loading />}
      {flag &&
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={mapDiscover.length}
          next={loadMore}
          hasMore={paramsMapDiscovery.page < paramsMapDiscovery.pageTotal}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid container classes={{ root: clsx(classes.layout, classesCommon.layout) }}>
              <Text level='title'>Search Boards</Text>
              <FilterMap/>

              <Grid 
                container 
                classes={{ 
                  // root: clsx(classesCommon.layout)
                }}
              >
                <Grid classes={{ root: classes.MapTitle }}>
                  <Text level='title'>Recommend for You</Text>
                </Grid>
                <LayoutMap mapData={mapDiscover} />
              </Grid>
            </Grid>
          </Layout >
        </InfiniteScroll>
      } */}
      <Layout>
        <Grid container classes={{ root: clsx(classes.layout, classesCommon.layout) }}>
          <Text level='title'>Search Boards</Text>
          <FilterMap/>
        </Grid>
      </Layout >
    </div>
  );
})

export default connect()(Maps);