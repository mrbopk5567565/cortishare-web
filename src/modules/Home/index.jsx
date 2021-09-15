import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Header, CardCustom, CardCustomFeed, Text, StackGridCustom, Layout, Loading, LoadingIconMore } from 'components'
import useStyles from './styles';
import Images from 'config/images'
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SizeMe } from 'react-sizeme'
import EditMap from 'modules/MyMap/EditMap'
import { useDispatch, connect, useSelector } from 'react-redux';
import { GET_ALL_MAP_REQUEST, GET_MY_FEED_REQUEST } from 'redux/reducers/home/actionTypes';
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import InfiniteScroll from 'react-infinite-scroll-component';
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const mapStateToProps = (state) => {
  return {
    recents: state.home.recents,
    myFeed: state.home.myFeed,
    // page: state.home.page,
    // size: state.home.size,
    // pageTotal: state.home.pageTotal,
    isLoading: state.global.isLoading,
  };
};

const Home = ({ isLoading, recents, myFeed }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const [flag, setFlag] = useState(false)
  const [widthMasonry, setWidthMasonry] = useState(0)
  const [widthColumn, setWidthColumn] = useState({ widthPercent: '', column: 0 })

  useEffect(() => {
    dispatch({
      type: GET_ALL_MAP_REQUEST,
      payload: {
        page: 1,
        size: 20,
      },
    })
    dispatch({
      type: GET_MY_FEED_REQUEST,
      payload: {
        page: 1,
        size: 20,
      },
      onSuccess: () => setFlag(true)
    })
    mixPanel.track(EventPage.ViewDashboard)
  }, [])

  // useEffect(() => {
  //   if (!flag) return
  //   const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
  //   const bodyHeight = document.getElementById('body-home') ? document.getElementById('body-home').clientHeight : 0
  //   if (window.innerHeight > (headerHeight + bodyHeight) && page < pageTotal) {
  //     loadMore()
  //   }
  // }, [myFeed])

  const Primary = {
    'Public': 0,
    'Open': 1,
    'Closed': 2,
    'Private': 3,
  }

  const handleResize = (width) => {
    let number = 6
    let widthPercent = `${(100 / 6).toFixed(3)}%`
    let maxWidth = '280px';
    let minWidth = '250px';
    let offsetWidth = 20 * 5 / 6
    if (width <= 400) {
      // number = 1
      // widthPercent = '100%'
    } else if (width <= 600) {
      widthPercent = `${(100 / 2).toFixed(3)}%`
      number = 2
      maxWidth = '280px'
      minWidth = '200px'
      offsetWidth = 20 * 1 / 2
    } else if (width <= 960) {
      widthPercent = `${(100 / 3).toFixed(3)}%`
      number = Math.floor((width) / 300);
      number = 2
      offsetWidth = 20 * 2 / 3
      maxWidth = '280px'
      minWidth = '200px'
    } else if (width <= 1280) {
      widthPercent = `${(100 / 4).toFixed(3)}%`
      number = 4
      offsetWidth = 20 * 3 / 4
    } else if (width < 1920) {
      widthPercent = `${(100 / 6).toFixed(3)}%`
      offsetWidth = 20 * 5 / 6
      number = 6
    }
    return { widthPercent, number, offsetWidth, maxWidth, minWidth }
  }

  const handleClickViewAll = () => {
    history.push('/recent')
  }

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  const getColumn = () => {
    return handleResize(getWidth())
  }

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const loadMore = () => {
    dispatch({
      type: GET_MY_FEED_REQUEST,
      payload: {
        page: myFeed.page + 1,
        size: myFeed.size,
      },
    })
  }

  const renderRecentList = (w, widthItem, widthDevice, col) => {
    // const widthDevice = getWidth()
    const boxDisplay = getColumn()
    let listDisplay = widthDevice <= 960 ? recents.data.slice(0, 10) : recents.data.slice(0, col - 1)

    // const classesCustom = () => {
    //   if (widthDevice <= 600) {
    //     return classes.widthCardMobile
    //   }
    //   return classes.widthCardDefault
    // }

    return (
      <>
        <div className={classes.wrapperRecent} style={{ width: `${w}px`, }}>
          {listDisplay && listDisplay.map((item, index) =>
            // <div key={index} className={classes.card} style={{width: `calc(${boxDisplay.widthPercent} - ${boxDisplay.offsetWidth}px)`}}>
            <div key={index} className={clsx(classes.card,)} style={{ width: widthItem }}>
              <CardCustom item={item} />
            </div>
          )}
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={clsx(classes.viewAll, listDisplay && listDisplay.length === 0 && classes.nonView)}
            // style={{width: `calc(${boxDisplay.widthPercent} - ${boxDisplay.offsetWidth}px)`}}
            style={{ width: widthItem }}
            onClick={handleClickViewAll}
          >
            <img src={Images.icMindMap} alt="" />
            <Text classes={{ root: classes.textViewAll }}><span>View All Recent Boards</span></Text>
          </Grid>
        </div>
      </>
    )
  }

  const renderDashboard = (widthDevice) => {
    if (widthDevice) {
      let containerMasonry = widthDevice - 30
      // let widthItem = widthDevice <= 600 ? 260 : 280
      let widthItem = 280
      let col
      if (widthDevice <= 650) {
        col = 2
        widthItem = Math.floor((containerMasonry - 20) / 2)
      } else {
        col = Math.floor((containerMasonry) / (widthItem + 20))
      }
      let gutter = (col - 1) * 20;
      let w = (widthItem * col + gutter)

      return (
        <>
          <Grid container justify="center">
            <div style={{ width: w }} className={classes.text}>
              <Text size="large">Recent Boards</Text>
            </div>
          </Grid>
          <Grid container justify="center">
            {renderRecentList(w, widthItem, widthDevice, col)}
          </Grid>
          <Grid container justify="center" classes={{ root: classes.containerText }}>
            <div style={{ width: w }} className={classes.text}>
              <Text size="large">My Feed</Text>
            </div>
          </Grid>
          <Grid container>
            <StackGridCustom data={myFeed.data} widthDevice={widthDevice} widthContainer={w} />
          </Grid>
        </>
      )
    }
  }

  const renderRecentList2nd = (col, paddingLayput, gutter) => {
    const widthDevice = getWidth()
    let widthItem = 280
    let listDisplay = widthDevice <= 960 ? recents.data.slice(0, 10) : recents.data.slice(0, col - 1)
    if (widthDevice > 425 && widthDevice <= 600) {
      widthItem = Math.floor((widthDevice - paddingLayput - ((col - 1) * gutter)) / 2)
    } else if (widthDevice <= 425) {
      widthItem = widthDevice - paddingLayput
    }
    if (widthDevice <= 600) {
      widthItem = 174
    }
    return (
      <>
        <div className={classes.wrapperRecent}>
          {listDisplay && listDisplay.map((item, index) =>
            <div key={index} className={clsx(classes.card,)} style={{ width: widthItem }}>
              <CardCustom item={item} />
            </div>
          )}
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={clsx(classes.viewAll, listDisplay && listDisplay.length === 0 && classes.nonView)}
            style={{ width: widthItem }}
            onClick={handleClickViewAll}
          >
            <img src={Images.icMindMap} alt="" />
            <Text classes={{ root: classes.textViewAll }}><span>View All Recent Boards</span></Text>
          </Grid>
        </div>
      </>
    )
  }
  // 1785
  const renderDashboard2nd = (widthDevice) => {
    let widthItem = 280
    let gutter = 20
    let paddingLayput = widthDevice <= 960 ? 50 : 120
    let containerMasonry = widthDevice - paddingLayput
    let col
    if (widthDevice <= 650) {
      col = 2
      widthItem = Math.floor((containerMasonry - 20) / 2)
    } else {
      col = Math.floor((containerMasonry) / (widthItem + 20))
    }
    if (containerMasonry - (col * widthItem + ((col - 1) * gutter)) >= (widthItem + gutter)) {
      col += 1
    }
    return (
      <>
        <Grid container justify="center">
          <div style={{ width: '100%' }} className={classes.text}>
            <Text size="large">Recent Boards</Text>
          </div>
        </Grid>
        <Grid container justify="center">
          {renderRecentList2nd(col, paddingLayput, gutter)}
        </Grid>
        {flag &&
          <InfiniteScroll
            className={classes.dropdown}
            dataLength={myFeed.data.length}
            next={loadMore}
            hasMore={myFeed.page < myFeed.pageTotal}
            loader={<LoadingIconMore />}
          >
            <Grid container justify="center" classes={{ root: classes.containerText }}>
              <div style={{ width: '100%' }} className={classes.text}>
                <Text size="large">My Feed</Text>
              </div>
            </Grid>
            <Grid container>
              <StackGridCustom data={myFeed.data} widthDevice={widthDevice} />
            </Grid>
          </InfiniteScroll>
        }
      </>
    )
  }

  return (
    <div id='body-home'>
      {isLoading && !flag && <Loading />}
      {/* {flag &&
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={myFeed.length}
          next={loadMore}
          hasMore={page < pageTotal}
          loader={<LoadingIconMore />}
        > */}
          <SizeMe>{({ size }) =>
            <Layout>
              <Grid container classes={{ root: classes.container }} direction="column">
                {/* {renderDashboard(size.width)} */}
                {renderDashboard2nd(size.width)}
              </Grid>

              {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
            </Layout>
          }
          </SizeMe>
        {/* </InfiniteScroll>
      } */}
    </div>
  );
}

export default connect(mapStateToProps)(Home);
