import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import { Buttons, Text, Loading, LayoutMap, Layout, MapEmpty, LoadingIconMore } from 'components'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { GET_ALL_BY_CUSTOMER_REQUEST } from 'redux/reducers/map/actionTypes'
import CreateMap from 'modules/Home/CreateMap'
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes';
import EditMap from 'modules/MyMap/EditMap'
import InfiniteScroll from 'react-infinite-scroll-component';
import useStylesCommon from 'utils/stylesCommon';

const MyMap = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)
  const isLoading = useSelector((state) => state.global.isLoading)
  const { maps, page, size, totalPage } = useSelector((state) => state.map)
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const [flag, setFlag] = useState(false)
  const classesCommon = useStylesCommon()

  useEffect(() => {
    dispatch({
      type: GET_ALL_BY_CUSTOMER_REQUEST,
      payload: {
        page: 1,
        size: 12,
      },
      onSuccess: () => setFlag(true)
    })
  }, [])

  useEffect(() => {
    if (!flag) return
    const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
    const bodyHeight = document.getElementById('body-mymap') ? document.getElementById('body-mymap').clientHeight : 0
    if (window.innerHeight > (headerHeight + bodyHeight) && page < totalPage) {
      loadMore()
    }
  }, [maps])

  const handleClickCreateMap = () => {
    setIsOpenCreateMap(true)
  }

  const handleCloseCreateMap = () => {
    setIsOpenCreateMap(false)
  }

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const loadMore = () => {
    dispatch({
      type: GET_ALL_BY_CUSTOMER_REQUEST,
      payload: {
        page: page + 1,
        size: size,
      },
    })
  }

  return (
    <div id='body-mymap'>
      {isLoading && !flag && <Loading />}
      {(flag && (maps && maps.length > 0)) ?
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={maps.length}
          next={loadMore}
          hasMore={page < totalPage}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid container classes={{ root: clsx(classes.container, classesCommon.layout) }}>
              <Text classes={{ root: classes.text }} size="large">My Boards</Text>
              <LayoutMap mapData={maps} />
            </Grid>
            {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
          </Layout>
        </InfiniteScroll>
        :
        <Layout>
          <MapEmpty title="My Boards" isProfile={false} isCreate={true} content="You don’t have any Boards yet" />
        </Layout>
      }
    </div>
  );
}

export default connect()(MyMap);