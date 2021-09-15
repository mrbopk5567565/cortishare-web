import React, { useState, useEffect, useRef } from 'react';
import { Grid, Hidden, Popover, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import clsx from 'clsx'
import SplitPane, { Pane } from 'react-split-pane';
import Collaborators from '../Collaborators'
import MapDetailMain from '../MapDetailMain'
import Post from '../Post'
import FormPost from '../FormPost'
import MindMap from 'components/Map/TreeTidy'
import { Modal, Loading, MapToolBar, PopupUpgrade } from 'components';
import { SET_WIDTH_LEFT_SPLIT } from 'redux/reducers/global/actionTypes'
import { UPDATE_MAP_REQUESTED, GET_COLLABORATE_SUCCESS, REJECT_COLLABORATE_REQUEST, ACCEPT_COLLABORATE_REQUEST, UPDATE_STATUS_NOTIFICATION } from 'redux/reducers/notification/actionTypes'
import { 
  GET_INFO_INVITE_MAP, 
  RESET_MINDMAP, 
  REQUEST_PERMISSION, 
  SET_BLUR, 
  GET_PENDING_MAP_SHARING_REQUEST,
  REMOVE_PERMISSION,
} from 'redux/reducers/map/actionTypes'
import { RESET_NODE_POST } from 'redux/reducers/node/actionTypes'
import Images from 'config/images'
import RequestFollow from '../RequestFollow'
import RequiresCollaboration from '../RequiresCollaboration'
import backgroundBlur from 'asset/img/blur.png'
import backgroundBlurMobile from 'asset/img/blur-mobile.png';
import { checkPaymentStatus } from 'helpers'
import LeaveMap from '../LeaveMap'
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const useWindowWidth = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return widthWindow
}



const MapDetail = () => {
  const defaultMinwidth = window.innerWidth * 1 / 3 // old: 50% 470
  const defaultMinwidthPercent = (defaultMinwidth/window.innerWidth * 100) + '%'
  const history = useHistory();
  const classes = useStyles();
  const [openInvite, setOpenInvite] = useState(false);
  const [itemShare, setItemShare] = useState(false)
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const map_item = useRef(null);
  const params = useParams()
  const [sizePane, setSizePane] = useState(defaultMinwidth)
  const [defaulSize, setDefaultSize] = useState(defaultMinwidthPercent)
  const [value, setValue] = useState('Half / Half')
  const matchMindMapDetail = useRouteMatch('/board/:mapId');
  // const matchMindMapDetailRequest = useRouteMatch('/board/:mapId/RequestAccess');
  const matchNodeDetail = useRouteMatch('/board/:mapId/node/:nodeId');
  const matchPostDetail = useRouteMatch('/board/:mapId/post/:postId');
  const matchCreatePost = useRouteMatch('/new-post/board/:mapId/node/:nodeId');
  const matchEditPost = useRouteMatch('/edit-post/:postId/board/:mapId/node/:nodeId');
  const mapId = useSelector((state) => state.map.selectNode.mapId)
  const dispatch = useDispatch()
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const pendingMapSharing = useSelector((state) => state.map.pendingMapSharing)
  const dataHeader = useSelector((state) => state.global.dataHeader)
  const [allowResize, setAllowResize] = useState(true)
  const [minSizePane, setMinSizePane] = useState(window.innerWidth * 3 / 100)
  const [maxSizePane, setMaxSizePane] = useState(window.innerWidth * 97 / 100)
  const [showMapMobile, setShowMapMobile] = useState(false)
  const stateWindowWidth = useWindowWidth()
  const { inviteUser, numberOfCollaborators, inviteByLink } = useSelector((state) => state.map.inviteCollab)
  const isLoading = useSelector((state) => state.global.isLoading)
  const isLoadingCreatePost = useSelector((state) => state.node.isLoading)
  const mapRequested = useSelector((state) => state.notification.mapRequested)
  const [isTagUI,setIsTagUI] =useState(false)
  const [isOpenRequestFollow, setIsOpenRequestFollow] = useState(false)
  const [isOpenRequiresCollaboration, setIsOpenRequiresCollaboration] = useState(false)
  const [isBlur, setIsBlur] = useState(true)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')
  const rightViewRef = useRef()
  const [isFullScreen, setIsFullScreen] = useState(false)
  const info = useSelector((state) => state.profile.info)
  const maps = useSelector((state) => state.profile.maps)
  const payment = useSelector((state) => state.profile.payment)
  const [isOpenLeaveMap, setIsOpenLeaveMap] = useState(false)
  // const [customerInfo, setCustomerInfo] = useState()

  function checkInfullScreen() {
    return (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null)
  }

  const handleSize = (size) => {
    setSizePane(size)
    dispatch({
      type: SET_WIDTH_LEFT_SPLIT,
      widthSplit: size,
    })
  }

  useEffect(() => {
    //mixPanel
    mixPanel.track(EventPage.ViewBoard)
  }, [])

  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_MINDMAP,
      })
      dispatch({
        type: RESET_NODE_POST,
      })
    }
  }, [params.mapId])

  useEffect(() => {
    if (params.mapId && customer) {
      dispatch({
        type: GET_PENDING_MAP_SHARING_REQUEST,
        payload: {
          mapId: params.mapId
        }
      })
    }
  }, [params.mapId, dataMindMap])

  useEffect(() => {
    if(!dataHeader.privacy) return
    if(Object.keys(dataMindMap).length === 0) return
    if(dataMindMap.mapPermission !== 'Owner') {
      if(!dataMindMap.mapPermission && dataHeader.privacy !== 'public') {
        setIsBlur(true)
        dispatch({
          type: SET_BLUR,
          payload: true,
        })
        if (!pendingMapSharing) {
          setIsOpenRequestFollow(true)
        }
        return
      }
    } 
    setIsBlur(false)
    dispatch({
      type: SET_BLUR,
      payload: false,
    })
    setIsOpenRequestFollow(false)
  }, [dataHeader, dataMindMap, pendingMapSharing])

  useEffect(() => {
    if(!mapRequested) return
    if(!matchMindMapDetail) return
    if(mapRequested.mapId === Number(matchMindMapDetail.params.mapId)) {
      setIsOpenRequiresCollaboration(true)
      setIsBlur(true)
    }
  }, [mapRequested])

  useEffect(() => {
    if (stateWindowWidth <= 600) {
      setDefaultSize('100%')
      setAllowResize(false)
      setShowMapMobile(false)
      setMinSizePane(0)
      setMaxSizePane(stateWindowWidth)
      handleSize(stateWindowWidth)
    }
    else {
      setDefaultSize(defaultMinwidthPercent)
      setAllowResize(true)
    setMinSizePane(defaultMinwidth)
      setMaxSizePane(stateWindowWidth * 97 / 100)
    }
  }, [stateWindowWidth])

  useEffect(() => {
    let item = {
      id: dataMindMap && dataMindMap.nodeData && dataMindMap.nodeData.id,
      title: dataMindMap && dataMindMap.title,
    };
    setItemShare(item);
  }, [dataMindMap])

  useEffect(() => {
    if (mapId)
      dispatch({
        type: GET_INFO_INVITE_MAP,
        payload: {
          mapId: mapId
        }
      })
  }, [mapId, dataMindMap])

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  },[])

  useEffect(() =>{
    if(rightViewRef.current) {
      const funcFullScreen = (event)  => {
        setIsFullScreen(checkInfullScreen())
      }
      rightViewRef.current.addEventListener('fullscreenchange', funcFullScreen)
      return () =>{
        rightViewRef.current.removeEventListener('fullscreenchange', funcFullScreen)
      }
    }
  }, [rightViewRef.current])

  const handleShowMapMobile = () => {
    setShowMapMobile(true)
    handleSize(0)
  }

  // Remove function
  // const handleClickScale = (type) => {
  //   switch (type) {
  //     case 'hideMap':
  //       // setDefaultSize('97%')
  //       setSizePane(window.innerWidth * 97 / 100)
  //       dispatch({
  //         type: SET_WIDTH_LEFT_SPLIT,
  //         widthSplit: window.innerWidth * 97 / 100,
  //       })
  //       setValue('Hide map')
  //       break;
  //     case 'hidePost':
  //       // setDefaultSize('3%')
  //       setSizePane(window.innerWidth * 3 / 100)
  //       dispatch({
  //         type: SET_WIDTH_LEFT_SPLIT,
  //         widthSplit: window.innerWidth * 3 / 100,
  //       })
  //       setValue('Hide Post')
  //       break;
  //     case 'haftHaft':
  //       // setDefaultSize('50%')
  //       setSizePane(window.innerWidth * 50 / 100)
  //       dispatch({
  //         type: SET_WIDTH_LEFT_SPLIT,
  //         widthSplit: window.innerWidth * 50 / 100,
  //       })
  //       setValue('Half / Half')
  //       break;
  //     case 'oneColumnPost':
  //       // setDefaultSize('20%')
  //       setSizePane(window.innerWidth * 20 / 100)
  //       dispatch({
  //         type: SET_WIDTH_LEFT_SPLIT,
  //         widthSplit: window.innerWidth * 20 / 100,
  //       })
  //       setValue('1 Column Post')
  //       break;
  //     case 'fiveColumnPost':
  //       // setDefaultSize('72%')
  //       setSizePane(window.innerWidth * 72 / 100)
  //       dispatch({
  //         type: SET_WIDTH_LEFT_SPLIT,
  //         widthSplit: window.innerWidth * 72 / 100,
  //       })
  //       setValue('5 Column Post')
  //       break;
  //     default: break;
  //   }
  // }

  const goToPostMobile = () => {
    setShowMapMobile(false)
    handleSize(stateWindowWidth)
  }

  // Remove function
  // const listScale = [
  //   {
  //     label: 'Hide map',
  //     onClick: () => handleClickScale('hideMap'),
  //     click: value === 'Hide map' ? true : false
  //   },
  //   {
  //     label: 'Hide Post',
  //     onClick: () => handleClickScale('hidePost'),
  //     click: value === 'Hide Post' ? true : false

  //   },
  //   {
  //     label: 'Half / Half',
  //     onClick: () => handleClickScale('haftHaft'),
  //     click: value === 'Half / Half' ? true : false

  //   },
  //   {
  //     label: '1 Column Post',
  //     onClick: () => handleClickScale('oneColumnPost'),
  //     click: value === '1 Column Post' ? true : false
  //   },
  //   {
  //     label: '5 Column Post',
  //     onClick: () => handleClickScale('fiveColumnPost'),
  //     click: value === '5 Column Post' ? true : false
  //   },
  // ]

  const checkStylesPane = (indexPane) => {
    const width = indexPane === 1 ? sizePane : window.innerWidth - sizePane
    if (width === 0)
      return {
        width: `${width}px`,
      }
    else
      return {
        width: `${width}px`
      }
  }
  
  function fullscreen(docElm) {
    var isInFullScreen = checkInfullScreen()
    // var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  const handleToCenter = () => {
    map_item.current && map_item.current.handleToCenter()
  }
  const handleTreeView = () => {
    map_item.current && map_item.current.handleTreeView()
  }
  const handleFullScreen = () => {
    // map_item.current && map_item.current.handleFullScreen()
    // setIsFullScreen(!isFullScreen)
    rightViewRef.current && fullscreen(rightViewRef.current)

  }
  const handleZoomOut = () => {
    map_item.current && map_item.current.handleZoomOut()
  }
  const handleZoomIn = () => {
    map_item.current && map_item.current.handleZoomIn()
  }
  
  const handleClosenRequiresCollaboration = () => {
    setIsOpenRequiresCollaboration(false)
    setIsBlur(false)
  }

  const handleCloseRequestFollow = () => {
    setIsOpenRequestFollow(false)
    history.goBack()
  }

  const handleSendRequest = () => {
    dispatch({
      type: REQUEST_PERMISSION,
      payload: {
        mapId: mapId
      },
    })
    setIsOpenRequestFollow(false)
  }

  const updateMapRequeted = () => {
    setIsOpenRequiresCollaboration(false)
    setIsBlur(false)
    dispatch({
      type: GET_COLLABORATE_SUCCESS,
      payload: null
    })
  }

  const handleOpenUpgrade = () => {
    setIsOpenUpgrade(true)
  }

  const handleCloseUpgrade = () => {
    setIsOpenUpgrade(false)
  }

  const handleReject = () => {
    const onSuccess = (id) => {
      handleClickAcceptOrReject(id)
    }
    let formPayload = {
      mapId: null,
      notificationId: null
    }
    if (pendingMapSharing) {
      formPayload = {
        ...formPayload,
        mapId: pendingMapSharing.mapId,
        notificationId: pendingMapSharing.notificationId,
      }
    } else {
      formPayload = {
        ...formPayload,
        mapId: mapRequested.mapId,
        notificationId: mapRequested.id
      }
    }
    dispatch({
      type: REJECT_COLLABORATE_REQUEST,
      payload: formPayload,
      onSuccess
    })
    updateMapRequeted()
    history.goBack()
  }

  const handleAccept = () => {
    if ([0,2,4].includes(checkPaymentStatus({ customer: info, payment: payment })) && maps.length >= 1) {
      handleOpenUpgrade();
    } else {
      const onSuccess = (id) => {
        handleClickAcceptOrReject(id)
      }
      let formPayload = {
        mapId: null,
        notificationId: null
      }
      if (pendingMapSharing) {
        formPayload = {
          ...formPayload,
          mapId: pendingMapSharing.mapId,
          notificationId: pendingMapSharing.notificationId,
        }
      } else {
        formPayload = {
          ...formPayload,
          mapId: mapRequested.mapId,
          notificationId: mapRequested.id
        }
      }
      dispatch({
        type: ACCEPT_COLLABORATE_REQUEST,
        payload: formPayload,
        isRefresh: true,
        onSuccess
      })
      updateMapRequeted()
      setIsBlur(false)
    }
  }

  const handleClickAcceptOrReject = (id) => {
    dispatch({
      type: UPDATE_STATUS_NOTIFICATION,
      payload: {
        NotificationId: id
      }
    })
  }

  const handleLeaveMap = () => {
    setIsOpenLeaveMap(true)
  }

  const handleCloseLeaveMap = () => {
    setIsOpenLeaveMap(false)
  }
  
  const removePermission = () => {
    let customerInfo;
    inviteUser.map(item => {
      if (item.customerId === customer.customerId) {
        customerInfo = item
        // setCustomerInfo(item)
      }
      return
    })
    if (!customerInfo) return
    dispatch({
      type: REMOVE_PERMISSION,
      payload: {
        mapId: currentRootMap, 
        email: customerInfo.customerEmail,
        mapSharingId: customerInfo.id
      },
      onSuccess: () => {
        dispatch({
          type: GET_INFO_INVITE_MAP,
          payload: {
            mapId: currentRootMap,
          },
          isRefresh: dataMindMap.mapPermission === "Edit" || dataMindMap.mapPermission === "View",
        })
      }
    })
  }

  const handleAgreeLeaveMap = () => {
    removePermission()
    setIsOpenLeaveMap(false)
  }
  
  return (
    <>
      {/* {dataMindMap.mapPermission !== 'Owner' && dataHeader.privacy !== 'public' && isBlur && */}
      {/* {dataHeader.privacy !== 'public' && isBlur && */}
      {isBlur &&
        <div className={classes.hidden}>
          <Hidden smUp>
            <img 
              style={{ height: `calc(100vh - ${document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0}px)`}} 
              className={classes.imgBackground} 
              src={backgroundBlurMobile} 
              alt=""
            />
          </Hidden>
          <Hidden xsDown>
            <img 
              style={{ height: `calc(100vh - ${document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0}px)`}} 
              className={classes.imgBackground} 
              src={backgroundBlur} 
              alt=""
            />
          </Hidden>
        </div>
      }
      <div className={clsx(classes.containerMap, dataHeader.privacy !== 'public' && isBlur && classes.doNotPermission)}>
        {(!showMapMobile && !allowResize) &&
          <div className={classes.linkMapMobile} onClick={handleShowMapMobile}>
            <img src={Images.icMapMobile}></img>
            <div className={classes.textLinkMap}>Map</div>
          </div>
        }
        {isLoadingCreatePost && <Loading />}
        <SplitPane
          className={clsx(classes.splitPane)}
          minSize={minSizePane}
          maxSize={maxSizePane}
          defaultSize={defaulSize}
          onChange={(sizeLeft) => handleSize(sizeLeft)}
          split="vertical"
          allowResize={allowResize}
          pane1Style={checkStylesPane(1)}
          pane2Style={checkStylesPane(2)}
        >
          <Grid container classes={{ root: clsx(classes.left, matchPostDetail && !customer && classes.noScroll) }} >
            {!isLoading && allowResize &&
              <Modal
                isScale={true}
                isScaleLeft={true}
                listDropDown={[]}
                type='dropdown'
                item={itemShare}
                customStyle={sizePane < 180 ? { left: 166 } : {}}
              />
            }
            {!isLoading && allowResize &&
              <Modal
                isScale={true}
                isScaleLeft={false}
                listDropDown={[]}
                type='dropdown'
                item={itemShare}
                customStyle={sizePane < 180 ? { left: 166 } : {}}
              />
            }
            {matchMindMapDetail && matchMindMapDetail.isExact && <MapDetailMain isMap={true} />}
            {matchNodeDetail && matchNodeDetail.isExact && <MapDetailMain isMap={false} />}
            {matchPostDetail && matchPostDetail.isExact && <Post />}
            {((matchCreatePost && matchCreatePost.isExact) || (matchEditPost && matchEditPost.isExact)) && <FormPost />}
            {/* {matchCreatePost && matchCreatePost.isExact && <NewPost />} */}
          </Grid>
          <Grid container classes={{ root: classes.right }} ref={rightViewRef}>
            <div className={classes.wrapperMapToolBar}>
              <MapToolBar 
                handleMindMapSide = {map_item.current ? map_item.current.handleMindMapSide : null}
                handleTreeView = {handleTreeView}
                handleToCenter = {handleToCenter}
                handleZoomIn = {handleZoomIn}
                handleZoomOut = {handleZoomOut}
                handleFullScreen = {handleFullScreen}
                isFullScreen={isFullScreen}
                showIconGoToPostMobile ={true}
                goToPostMobile = {goToPostMobile}
                showCollab ={true}
                titleCollab = {`${numberOfCollaborators} ${numberOfCollaborators > 1 ? 'editors': 'editor'}`}
                permission={checkPermission}
                fnForPermisstion={() => {checkPermission && setOpenInvite(true)}}
                exitCollabrator={handleLeaveMap}
              />
            </div>
            {/* {!allowResize &&
              <div onClick={goToPostMobile}>Go to post</div>
            } */}
            {openInvite && <Collaborators openDialog={openInvite} handleClose={() => setOpenInvite(false)} />}
            {isOpenRequestFollow && <RequestFollow open={isOpenRequestFollow} handleClose={handleCloseRequestFollow} confirm={handleSendRequest}/>}
            {isOpenRequiresCollaboration && <RequiresCollaboration open={isOpenRequiresCollaboration} handleClose={handleClosenRequiresCollaboration} reject={handleReject} accept={handleAccept}/>}
            {/* {(window.innerWidth - sizePane) && <MindMap handleToPost={goToPostMobile} handleTagUI ={(value) => setIsTagUI(value)}  ref={map_item} data={Object.keys(dataMindMap).length !== 0 ? dataMindMap : {}} />} */}
            <MindMap handleToPost={goToPostMobile} handleTagUI ={(value) => setIsTagUI(value)}  ref={map_item} data={Object.keys(dataMindMap).length !== 0 ? dataMindMap : {}} />
          </Grid>
        </SplitPane>
        {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
        {isOpenLeaveMap &&
          <LeaveMap
            open={isOpenLeaveMap}
            handleClose={handleCloseLeaveMap}
            confirm={handleAgreeLeaveMap}
            isOwner={dataMindMap.mapPermission === 'Owner'}
            // customerInfo={customerInfo}
          />
        }
      </div>
    </>
  );
}

export default connect()(MapDetail);