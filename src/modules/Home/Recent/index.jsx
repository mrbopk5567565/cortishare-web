import React, { useState, memo, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import { Buttons, Text, Loading, LayoutMap, Layout, LoadingIconMore } from 'components'
import { GET_ALL_MAP_REQUEST } from 'redux/reducers/home/actionTypes';
import EditMap from 'modules/MyMap/EditMap'
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import CreateMap from 'modules/Home/CreateMap'
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import useStylesCommon from 'utils/stylesCommon';

const MyMap = memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { recents , page, size, totalPage } = useSelector((state) => state.home)
  const isLoading = useSelector((state) => state.global.isLoading)
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)
  const [flag, setFlag] = useState(false)
  const classesCommon = useStylesCommon()

  useEffect(() => {
    dispatch({
      type: GET_ALL_MAP_REQUEST,
      payload: {
        page: 1,
        size: 30,
      },
      onSuccess: () => setFlag(true)
    })
  }, [])

  // useEffect(() => {
  //   if(!flag) return
  //   const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
  //   const bodyHeight = document.getElementById('body-recent') ? document.getElementById('body-recent').clientHeight : 0
  //   if(window.innerHeight > (headerHeight + bodyHeight) && page < totalPage) {
  //     loadMore()
  //   }
  // }, [recents])

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const handleClickCreateMap = () => {
    setIsOpenCreateMap(true)
  }

  const handleCloseCreateMap = () => {
    setIsOpenCreateMap(false)
  }

  const loadMore = () => {
    dispatch({
      type: GET_ALL_MAP_REQUEST,
      payload: {
        page: page + 1,
        size: size,
      },
    })
  }

  // required route Recent 
  // To keep the lasted 30 recently opened maps
  // Keep code for loading when nesscessary

  return (
    // <div id='body-recent'>
    //   {isLoading && !flag && <Loading />}
    //   {flag &&
    //     <InfiniteScroll
    //       className={classes.dropdown}
    //       dataLength={recents.length}
    //       next={loadMore}
    //       hasMore={page < totalPage}
    //       loader={<LoadingIconMore />}
    //     >
          <div>
            {isLoading && <Loading />}
            {recents.data && recents.data.length > 0 ?
              <Layout>
                <Grid container classes={{ root: clsx(classes.container, classesCommon.layout) }}>
                  <Text size="large">Recent Boards</Text>
                  <LayoutMap mapData={recents.data} />
                </Grid>
                {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
              </Layout>
              :
              <Grid container justify="center" alignItems="center" direction="column" classes={{ root: classes.mapEmpty }}>
                <img src={Images.icMapEmpty} alt="" className={classes.image} />
                <p className={classes.description}>You don’t have any Boards yet</p>
                <Buttons btnType="medium" onClick={handleClickCreateMap}>Create Board</Buttons>
                {isOpenCreateMap && <CreateMap openCreateMap={isOpenCreateMap} handleClose={handleCloseCreateMap} />}
              </Grid>
            }
          </div>
    //    </InfiniteScroll>
    //   }
    // </div>
  );
})

export default connect()(MyMap);