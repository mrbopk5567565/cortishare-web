import React, { useState, useEffect, useRef, } from 'react'
import { CHECK_NEW_NOTIFICATION, UPDATE_IS_NEW_NOTIFICATION } from 'redux/reducers/notification/actionTypes'
import { SET_SHOW_HELPER } from 'redux/reducers/global/actionTypes'
import {
  Grid,
  IconButton,
  ListItem,
  List,
  Drawer,
  FormControl,
  TextField,
  Button,
  ListItemIcon,
  ListItemText,
  Avatar,
  Hidden,
  ClickAwayListener,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import useStyles from './styles';
import Images from '../../config/images'
import DehazeIcon from '@material-ui/icons/Dehaze';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import {
  Text,
  Buttons,
  Notification,
  Tooltips,
  PopupHelper,
  LoadingIconMore,
} from 'components'
import Support from 'modules/Home/Support'
import CreateMap from 'modules/Home/CreateMap'
import MobileNotification from '../MobileNotification';
import MobileSearch from '../MobileSearch';
import PopupUpgrade from '../PopupUpgrade'
import Login from 'modules/Authentication/Login'
import Signup from 'modules/Authentication/SignUp'
import VerifyApp from 'modules/Authentication/VerifyApp'
// import SelectNode from 'modules/MyMap/SelectNode'
// import SelectExistingMap from 'modules/MyMap/SelectExistingMap'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SearchIcon from '@material-ui/icons/Search';
import logoTextWhiteHighRes from 'asset/img/ic-logoTextWhiteHighRes.png'
import {
  SET_PARAMS_SEARCH_ALL,
  SEARCH_ALL_REQUEST,
} from 'redux/reducers/discover/actionTypes';
import { HANDLE_GET_INFO_DETAIL_REQUEST, UPDATE_HELPER_USER_REQUEST } from 'redux/reducers/profile/actionTypes'
import { SEARCH_KEYMAP_REQUEST } from 'redux/reducers/map/actionTypes';
import { checkLongString, checkPaymentStatus } from 'helpers';
import ResentEmail from 'modules/Authentication/ResentEmail';
import { GET_FOLLOWING_MAPS_REQUEST } from 'redux/reducers/global/actionTypes'
import InfiniteScroll from 'react-infinite-scroll-component';

const signalR = require("@microsoft/signalr")

const Header = ({ isDark, privacy, dataBreadcrumbs, match }) => {
  const classes = useStyles();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)
  const [isOpenMobileNotification, setisOpenMobileNotification] = useState(false)
  const [isOpenMobileSearch, setisOpenMobileSearch] = useState(false)
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openVerifyApp, setOpenVerifyApp] = useState(false)
  const [verifyUserName, setVerifyUserName] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [openAvatarHeader, setOpenAvatarHeader] = useState(false);
  const [openAvatarNavbar, setOpenAvatarNavbar] = useState(false);
  const isMap = isDark ? true : false
  const history = useHistory();
  const matchCreatePost = useRouteMatch('/new-post/board/:mapId/node/:nodeId');
  const showHelper = useSelector((state) => state.global.showHelper)
  const dataHeader = useSelector((state) => state.global.dataHeader)
  const viewMap = useSelector((state) => state.map.viewMap)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const newNotification = useSelector((state) => state.notification.newNotification)
  const searchKeyWord = useSelector((state) => state.map.searchKeyWord)
  const loadingSearch = useSelector((state) => state.map.loadingSearch)
  const info = useSelector((state) => state.profile.info)
  const payment = useSelector((state) => state.profile.payment)
  const isWatchedTutorial = useSelector((state) => state.profile.isWatchedTutorial)
  const maps = useSelector((state) => state.profile.maps)
  const plan = useSelector((state) => state.profile.plan)
  const paramsSearchAll = useSelector((state) => state.discover.paramsSearchAll)
  const isBlur = useSelector((state) => state.map.isBlur)
  const searchKey = useSelector((state) => state.map.searchKey)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const matchLinkingMinds = useRouteMatch('/search/linking-minds');
  const customer = localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'))
  const dispatch = useDispatch()
  const [searchKeyMap, setSearchKeyMap] = useState('')
  const [openResentEmail, setOpenResentEmail] = useState(false)
  const [openInnerMenu1, setOpenInnerMenu1] = useState(true)
  const [openInnerMenu1Mobile, setOpenInnerMenu1Mobile] = useState(true)
  const [openInnerMenu2, setOpenInnerMenu2] = useState(true)
  const followingMaps = useSelector((state) => state.global.followingMaps)

  useEffect(() => {
    if (isOpenMenu) {
      dispatch({
        type: GET_FOLLOWING_MAPS_REQUEST,
        payload: {
          pageNumber: 1,
          pageSize: 10,
        },
      })
    }
  }, [isOpenMenu])

  const loadMore = () => {
    dispatch({
      type: GET_FOLLOWING_MAPS_REQUEST,
      payload: {
        pageNumber: followingMaps.pageNumber + 1,
        pageSize: followingMaps.pageSize,
      },
    })
  }

  const handleDrawer = isOpen => {
    setIsOpenMenu(isOpen);
  };

  const handleChangeKeymap = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearchKeyMap(value)
    if (isMap) {
      searchInBoard(value);
    }
  }

  // const handleSelected = (e, value) => {
  //   history.push(`board/${value.id}`);
  // }

  /*
    categoryId = 0 : get all caterogies
    tableType = 1 : Map
    tableType = 2 : POST
    tableType = 3 : User
  */

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    if (matchLinkingMinds && matchLinkingMinds.isExact) {
      dispatch({
        type: SEARCH_ALL_REQUEST,
        payload: {
          ...paramsSearchAll,
          "TableType": 1,
          Page: 1,
        },
        isLoading: true,
        isLoadMore: false,
      })
    }

    if (!isMap) history.push('/search/linking-minds')
    // history.push('/discover/linking-minds')
    // dispatch({
    //   type: 'SEARCH_MAP_BY_KEY_REQUEST',
    //   payload: text
    // })
  }

  const searchInBoard = (value) => {
    dispatch({
      type: SEARCH_KEYMAP_REQUEST,
      payload: {
        mapId: currentRootMap,
        keyWord: value ? value : searchKeyMap,
      },
    })
  }

  const handleOpenUpgrade = () => {
    setIsOpenUpgrade(true)
  }

  const handleToggleAvatarHeader = () => {
    setOpenAvatarHeader(!openAvatarHeader);
  }

  const handleToggleAvatarNavbar = () => {
    setOpenAvatarNavbar(!openAvatarNavbar);
  }

  const handleToggleNotificationHeader = () => {
    setIsOpenNotification(!isOpenNotification)
    !isOpenNotification && dispatch({
      type: UPDATE_IS_NEW_NOTIFICATION,
      payload: false
    })
  }

  const handleChangeSearch = (e) => {
    dispatch({
      type: SET_PARAMS_SEARCH_ALL,
      payload: { ...paramsSearchAll, Search: e.target.value }
    })
  }

  const listIcon = [
    <img src={Images.icDashboard} alt="" className={classes.imgDashboard} />,
    <img src={Images.icMap} alt="" />,
    <img src={Images.icStar} alt="" />,
    <img src={Images.icSearch} alt="" />,
    <img src={Images.helpIcon} alt="" />
  ]
  const listParentIcon = [
    <img src={Images.parentSideBar} alt="" />,
    <img src={Images.icStar} alt="" />,
  ]
  const boardByTheme = [
    {
      text: 'Places to go in SG',
      num: 189
    },
    {
      text: 'Collaborating Lecture No...',
      num: 189
    },
    {
      text: 'Food and Stuff',
      num: 189
    },

  ]
  const formatNum = (num) => {
    const formatNumber = num > 99 ? '99+' : '' + num
    return formatNumber
  }
  useEffect(() => {
    if (customer) {
      dispatch({
        type: 'HANDLE_GET_INFO_REQUEST',
        payload: {
          customerId: customer && customer.customerId,
        },
      })
      dispatch({
        type: CHECK_NEW_NOTIFICATION
      })
      dispatch(
        { type: HANDLE_GET_INFO_DETAIL_REQUEST }
      )
    }
  }, [])

  useEffect(() => {
    if (isWatchedTutorial === false)
      dispatch({
        type: SET_SHOW_HELPER,
        payload: true
      })
  }, [isWatchedTutorial])

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl("https://cortishare-dev-api.vinova.sg/signalr/notification-hub", { accessTokenFactory: () => localStorage.getItem('accessToken') })
  //     .build();
  //   const start = async () => {
  //     try {
  //       await connection.start()
  //       await connection.invoke("RegisterHub")
  //     }
  //     catch (error) {
  //       console.log(error, "rrrrrrrr")
  //     }
  //   }
  //   start()
  //   connection.on("Message", (signal) => {
  //     // console.log(event)
  //     if (signal && signal.event) {
  //       let newNoti
  //       if (signal.event === 'NotificationCheck')
  //         newNoti = false
  //       else if (signal.event === 'Notification') {
  //         newNoti = true
  //       }
  //       newNoti !== undefined && dispatch({
  //         type: UPDATE_IS_NEW_NOTIFICATION,
  //         payload: newNoti
  //       })
  //     }

  //   });

  //   // connection.on("Notification",  (message) => {
  //   //   console.log(message,"lllll")
  //   //   toast.success(message);
  //   // });
  // }, [])

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API}/signalr/notification-hub`)
      .build();
    const start = async () => {
      try {
        await connection.start()
        await connection.invoke("RegisterHub", localStorage.getItem('accessToken'))
      }
      catch (error) {
        console.log(error, "error")
      }
    }
    start()
    connection.on("Message", (signal) => {
      // console.log(signal,"llllll")
      // console.log(event)
      if (signal && signal.event) {
        let newNoti
        if (signal.event === 'NotificationCheck')
          newNoti = false
        else if (signal.event === 'Notification') {
          newNoti = true
        }
        newNoti !== undefined && dispatch({
          type: UPDATE_IS_NEW_NOTIFICATION,
          payload: newNoti
        })
      }
    });
    // connection.on("Notification",  (message) => {
    //   console.log(message,"lllll")
    //   toast.success(message);
    // });
  }, [])

  const handleClickItem = text => {
    switch (text) {
      case 'Dashboard': {
        history.push('/')
        break
      }
      case 'My Boards': {
        history.push('/board')
        break
      }
      case 'Following': {
        history.push('/following')
        break
      }
      case 'Search': {
        history.push('/search')
        break
      }
      case 'Help': {
        handleOpenPopupHelper()
      }
      default: history.push('/')
    }
    setIsOpenMenu(false)
    setOpenInnerMenu2(false)
    setOpenInnerMenu1Mobile(false)
    setOpenInnerMenu1(false)

  }
  const handleClickMenuItem1 = () => {
    // setOpenInnerMenu1(true)
    setOpenInnerMenu1(!openInnerMenu1)
  }
  const handleClickMenuItem1Mobile = () => {
    setOpenInnerMenu1Mobile(!openInnerMenu1Mobile)
  }
  const handleClickAwayInnerMenu1 = (e) => {
    setOpenInnerMenu1(false)
    e.preventDefault();

  }
  const handleClickMenuItem2 = () => {
    setOpenInnerMenu2(!openInnerMenu2)
  }
  const handleClickProfile = () => {
    handleClickAwayAvatar()
    setIsOpenMenu(false)
    history.push('/profile')
  }

  const handleClickCreateMap = () => {
    if ([0, 2, 4].includes(checkPaymentStatus({ customer: info, payment: payment })) && maps.length >= 1) {
      handleOpenUpgrade();
    }
    else {
      setIsOpenCreateMap(true)
    }
  }

  const handleClickAwayAvatar = () => {
    setOpenAvatarHeader(false);
  }

  const handleClickAwayNotification = () => {
    setIsOpenNotification(false)
  }

  const handleClickNavbar = () => {
    setOpenAvatarNavbar(false);
  }

  const handleCloseCreateMap = () => {
    setIsOpenCreateMap(false)
  }

  const handleClickMobileNotification = () => {
    setisOpenMobileNotification(true)
  }

  const handleCloseMobileNotification = () => {
    setisOpenMobileNotification(false)
  }

  const handleClickMobileSearch = () => {
    setisOpenMobileSearch(true)
  }

  const handleCloseMobileSearch = () => {
    setisOpenMobileSearch(false)
  }

  const isShowButtonUpgrade = () => {
    // plain == free plan
    if (info && info.currentPlanId === 0) return true;
    else if (info && info.currentPlanId !== 0) {
      // plain == cancel plan
      if (payment && payment.isPayment && payment.isCancelled) {
        return true;
      }
    }
    return false;
  }
  const handleOpenPopupHelper = () => {
    setIsOpenMenu(false)
    dispatch({
      type: SET_SHOW_HELPER,
      payload: true
    })
  }
  const handleClosePopupHelper = () => {
    dispatch({
      type: SET_SHOW_HELPER,
      payload: false
    })
    if (isWatchedTutorial === false)
      dispatch({
        type: UPDATE_HELPER_USER_REQUEST
      })
  }
  const handleClickUpgrade = () => {
    setIsOpenUpgrade(true)
  }

  const handleCloseUpgrade = () => {
    setIsOpenUpgrade(false)
  }

  const handleSingnOut = () => {
    localStorage.clear()
    history.push('/')
  }

  const handleSelectNotification = value => {
    setIsOpenNotification(value);
    setisOpenMobileNotification(value);
  }
  const handleClickTitle = (option) => {
    const checkMaporNode = option && option.parentNodeId !== null;
    if (!option) return
    if (option.type === 'Post') {
      history.push(`/board/${option.mapId}/post/${option.postId}`)
    } else if (option.type === 'Node' && !checkMaporNode) {
      history.push(`/board/${option.mapId}`)
    } else if (option.type === 'Node' && checkMaporNode) {
      history.push(`/board/${option.mapId}/node/${option.id}`)
    }
  }

  const handleLogin = () => {
    setOpenLogin(true)
  }

  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  const handleSignUp = () => {
    setOpenSignUp(true)
  }

  const handleSubmitSignUp = (e) => {
    setVerifyUserName(e.userName ? e.userName : 'You');
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  const handleVerifyApp = () => {
    setOpenVerifyApp(state => !state)
  }
  const handleClickResentEmail = () => {
    setOpenResentEmail(true)
  }
  const handleCloseResentEmail = () => {
    setOpenResentEmail(false)
  }

  return (
    <div className={clsx(classes.root, isMap ? classes.rootMap : classes.rootNotMap)} id="header-map">
      <Grid container alignItems="center" justify="space-between">
        <Grid container item xs={8} sm={8} md={5} alignItems="center" wrap='nowrap' classes={{ root: clsx(!customer && classes.containerLeftNoLog) }}>
          {customer &&
            <IconButton onClick={() => handleDrawer(true)}>
              <DehazeIcon className={clsx(isMap ? classes.icBarMap : classes.icBar)} />
            </IconButton>
          }
          {/* <img className={classes.imgLogo} src={Images.icLoading} alt="" /> */}
          {isMap ?
            <>
              {dataHeader.privacy === 'public' &&
                <>
                  <img src={Images.icLockOff} alt="" className={classes.imgPrivacy} />
                  <Text size="small" classes={{ root: classes.text }}>Public</Text>
                </>}
              {dataHeader.privacy === 'private' &&
                <>
                  <img src={Images.icLockOn} alt="" className={classes.imgPrivacy} />
                  <Text size="small" classes={{ root: classes.text }}>Private</Text>
                </>}
              {dataHeader.privacy === 'closed' &&
                <>
                  <img src={Images.icStarFull} alt="" className={classes.imgPrivacy} />
                  <Text size="small" classes={{ root: classes.text }}>Closed</Text>
                </>}
              {/* {dataHeader.breadcrumbs.length !== 0 &&
                <div className={classes.containerBreadcrumbs}>
                  <BreadcrumbsCustom classNameCustom="customBreadcrumb" data={dataHeader.breadcrumbs.slice(0, 1)} />
                </div>
              } */}
            </>
            :
            <>
              <span>
                <img className={classes.imgLogo} src={Images.icLoading} alt="" />
              </span>
              <Tooltips title={customer.fullName || customer.userName || ''}>
                <Typography
                  size="big"
                  className={classes.fontBold}
                >
                  {`Hi, ${Object.keys(customer).length !== 0 ? customer.fullName || customer.userName : ''}`}
                </Typography>
              </Tooltips>
            </>
          }
        </Grid>
        <Hidden smDown>
          {customer ?
            <Grid container item xs={4} sm={4} md={7} alignItems="center" justify="flex-end">
              <form className={classes.form} onSubmit={handleSubmitSearch}>
                {!isBlur &&
                  <FormControl variant="outlined" fullWidth classes={{ root: clsx(isMap && classes.formControlMap) }}>
                    {isMap ? (
                      <Autocomplete
                        classes={{
                          root: clsx(classes.rootTextField, classes.searchInput),
                          option: classes.option,
                          listbox: classes.listbox,
                          popupIndicatorOpen: classes.popupIndicatorOpen,
                          clearIndicator: classes.clearIndicator,
                          popupIndicator: classes.popupIndicator,
                        }}
                        options={searchKey}
                        getOptionLabel={option => option.title ? option.title : ''}
                        popupIcon={<SearchIcon></SearchIcon>}
                        onChange={(e, newValue) => handleClickTitle(newValue)}
                        renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <div className={classes.containerOption}>
                              <p className={classes.titleSearch}>{option.title}</p>
                              <p className={classes.descriptionSearch} style={{ color: '#B5B5B5' }}>{option.type}</p>
                            </div>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onChange={handleChangeKeymap}
                            placeholder={'Search in this board'}
                            // fullWidth={true}
                            // variant="outlined"
                            classes={{ root: classes.rootTextField }}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: classes.rootInputSearch,
                                input: classes.inputSearch
                              },
                              disableUnderline: true,
                              endAdornment: (
                                <React.Fragment>
                                  {loadingSearch ? (
                                    <CircularProgress
                                      style={{ color: 'inherit' }}
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        value={paramsSearchAll.Search}
                        placeholder={isMap ? 'Search in this board' : 'Search'}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        classes={{ root: classes.rootTextField }}
                        InputLabelProps={{ shrink: false }}
                        InputProps={{
                          classes: { input: classes.inputSearch },
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              classes={{ root: classes.rootInputAdornment }}
                            >
                              <IconButton onClick={handleSubmitSearch}>
                                {isMap ? (
                                  <img src={Images.icSearchWhite} alt="" />
                                ) : (
                                  <img src={Images.icSearch} alt="" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChangeSearch}
                      />
                    )}
                  </FormControl>
                }
              </form>
              {!isMap &&
                <Button
                  variant="outlined"
                  color="primary"
                  classes={{ root: clsx(classes.btn, isMap && classes.btnMap) }}
                  onClick={handleClickCreateMap}
                >
                  <AddRoundedIcon fontSize="inherit" />Create Board
                </Button>
              }

              <ClickAwayListener onClickAway={handleClickAwayNotification}>
                <div className={classes.containerNotify}>
                  {isMap ? <img src={Images.icNotificationWhite} onClick={handleToggleNotificationHeader} alt="" /> : <img src={Images.icNotification} onClick={handleToggleNotificationHeader} alt="" />}
                  {newNotification && <div className={clsx(classes.number, isMap && classes.numberMap)}></div>}
                  {isOpenNotification && <Notification open={isOpenNotification} handleSelectNotification={handleSelectNotification} />}
                </div>
              </ClickAwayListener>

              <ClickAwayListener onClickAway={handleClickAwayAvatar}>
                <div className={classes.rootAvatar}>
                  <Avatar onClick={handleToggleAvatarHeader} src={customer && customer.profilePicture ? customer.profilePicture : ''} alt="" classes={{ root: classes.avatar }} />
                  {openAvatarHeader ? (
                    <div className={classes.dropdown}>
                      <Text medium="small" handleClick={handleClickProfile}>Profile</Text>
                      <Support isClickAwayListener={true} openDialog={false} offDropdown={handleClickAwayAvatar} />
                      <Text medium="small" handleClick={handleSingnOut}>Sign Out</Text>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
            </Grid>
            :
            <Grid container item xs={4} sm={4} md={7} alignItems="center" justify="flex-end">
              <Button
                variant="outlined"
                color="primary"
                classes={{ root: classes.btnSignUp }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                color="primary"
                classes={{ root: clsx(classes.btnSignUp, classes.btnLogin) }}
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Grid>
          }


        </Hidden>
        <Hidden mdUp>
          {customer ?
            <Grid container item xs={4} sm={4} md={7} alignItems="center" justify="flex-end">
              {/* {!isMap &&
               <AddRoundedIcon fontSize="inherit" classes={{ root: classes.headerIconAdd }} onClick={handleClickCreateMap} />
             } */}

              <IconButton onClick={handleClickMobileSearch}>
                {!isBlur &&
                  <>
                    {isMap ? <img src={Images.icSearchBlue} alt="" className={classes.headerIconSearch} /> : <img src={Images.icSearchBlue} alt="" className={classes.headerIconSearch} />}
                  </>
                }
              </IconButton>

              <div className={classes.containerNotify} onClick={handleClickMobileNotification}>
                {isMap ? <img src={Images.icNotificationWhite} alt="" /> : <img src={Images.icNotification} alt="" />}
                {newNotification && <div className={clsx(classes.number, isMap && classes.numberMap)}></div>}
              </div>
            </Grid>
            :
            <Grid container item xs={8} sm={4} md={7} alignItems="center" justify="flex-end" className={classes.gridRightAuth}>
              <Text classes={{ root: classes.textLogin }} handleClick={handleLogin}>Login</Text>
              <Button
                variant="outlined"
                color="primary"
                classes={{ root: clsx(classes.btnSignUp, classes.btnLogin) }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Grid>
          }
        </Hidden>
      </Grid>
      {isOpenCreateMap && <CreateMap openCreateMap={isOpenCreateMap} handleClose={handleCloseCreateMap} handleOpenUpgrade={handleOpenUpgrade} />}
      {isOpenMobileNotification && <MobileNotification openMobileNotification={isOpenMobileNotification} handleClose={handleCloseMobileNotification} handleSelectNotification={handleSelectNotification} />}
      {isOpenMobileSearch && <MobileSearch isMap={isMap} openMobileSearch={isOpenMobileSearch} handleClose={handleCloseMobileSearch} />}
      <Drawer open={isOpenMenu} onClose={() => handleDrawer(false)} classes={{ paper: classes.drawer }}>
        <div className={classes.imgCortishare}>
          <img className={classes.imgicMenuText} src={logoTextWhiteHighRes} alt="" />
        </div>
        <Buttons btnType="large" onClick={handleClickCreateMap}><AddRoundedIcon />Create Board</Buttons>
        {isShowButtonUpgrade() && <Buttons btnType="large" onClick={handleClickUpgrade}>Upgrade</Buttons>}
        <List classes={{ root: classes.list }}>
          {/* {['Dashboard', 'My Boards', 'Following', 'Discover', 'Help'].map((text, index) => (
            <ListItem button key={text} classes={{ root: classes.listItem }} onClick={() => handleClickItem(text)}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>{listIcon[index]}</ListItemIcon>
              <ListItemText classes={{ primary: classes.primaryListItemText }} primary={text} />
            </ListItem>
          ))} */}
          {/* submenu 1 for desktop */}
          <Hidden smDown>
            <ListItem button classes={{ root: classes.listItem }} onClick={handleClickMenuItem1}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <img src={Images.parentSideBar1} alt="" />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primaryListItemText }} primary={
                <>
                  Menu
                  <img
                    style={{
                      transform: openInnerMenu1 ? 'rotate(0)' : 'rotate(90deg)',
                      transition: '0.5s',
                    }}
                    src={Images.dropdown}
                    alt="cortishare"
                  />
                </>
              } />
            </ListItem>
            <div className={clsx(classes.innerMenu1, openInnerMenu1 && classes.openInnerMenu1, (openInnerMenu1 && openAvatarNavbar) && classes.innerMenu1Profile)}>
              {openInnerMenu1 &&
                <>
                  {['Dashboard', 'My Boards', 'Following', 'Search'].map((text, index) => (
                    <ListItem button key={text} classes={{ root: classes.listItem }} onClick={() => handleClickItem(text)}>
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>{listIcon[index]}</ListItemIcon>
                      <ListItemText classes={{ primary: classes.primaryListItemText }} primary={text} />
                    </ListItem>
                  ))}
                  {/* <ClickAwayListener onClickAway={handleClickNavbar}> */}
                  <ListItem button key='Profile' classes={{ root: clsx(classes.NavbarProfile, openAvatarNavbar && classes.openAvatarNavbar) }} onClick={handleToggleAvatarNavbar}>
                    <ListItemIcon classes={{ root: classes.listItemIcon }}>
                      <Avatar src={customer && customer.profilePicture ? customer.profilePicture : ''} alt="" classes={{ root: classes.avatar }} />
                    </ListItemIcon>
                    {openAvatarNavbar ? (
                      <div className={clsx(classes.dropdown, classes.dropdownMobile)}>
                        <Text medium="small" handleClick={handleClickProfile}>Profile</Text>
                        <Support isClickAwayListener={false} openDialog={false} offDropdown={handleClickNavbar} />
                        <Text medium="small" handleClick={handleSingnOut}>Sign Out</Text>
                      </div>
                    ) : null}
                    <ListItemText primary="My Profile" />
                  </ListItem>
                  {/* </ClickAwayListener> */}
                </>
              }
            </div>
          </Hidden>
          {/* submenu 1 for mobile */}
          <Hidden mdUp>
            <ListItem button classes={{ root: classes.listItem }} onClick={handleClickMenuItem1Mobile}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <img src={Images.parentSideBar1} alt="" />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primaryListItemText }} primary={
                <>
                  Menu
                  <img
                    style={{
                      transform: openInnerMenu1Mobile ? 'rotate(90deg)' : 'rotate(0)',
                      transition: '0.5s',
                    }}
                    src={Images.dropdown}
                    alt="cortishare"
                  />
                </>
              } />
            </ListItem>
            {openInnerMenu1Mobile &&
              <div className={classes.innerMenu1}>
                {['Dashboard', 'My Boards', 'Following', 'Search'].map((text, index) => (
                  <ListItem button key={text} classes={{ root: classes.listItem }} onClick={() => handleClickItem(text)}>
                    <ListItemIcon classes={{ root: classes.listItemIcon }}>{listIcon[index]}</ListItemIcon>
                    <ListItemText classes={{ primary: classes.primaryListItemText }} primary={text} />
                  </ListItem>
                ))}
                {/* <ClickAwayListener onClickAway={handleClickNavbar}> */}
                <ListItem button key='Profile' classes={{ root: clsx(classes.NavbarProfile, openAvatarNavbar && classes.openAvatarNavbar) }} onClick={handleToggleAvatarNavbar}>
                  <ListItemIcon classes={{ root: classes.listItemIcon }}>
                    <Avatar src={customer && customer.profilePicture ? customer.profilePicture : ''} alt="" classes={{ root: classes.avatar }} />
                  </ListItemIcon>
                  {openAvatarNavbar ? (
                    <div className={clsx(classes.dropdown, classes.dropdownMobile)}>
                      <Text medium="small" handleClick={handleClickProfile}>Profile</Text>
                      <Support isClickAwayListener={false} openDialog={false} offDropdown={handleClickNavbar} />
                      <Text medium="small" handleClick={handleSingnOut}>Sign Out</Text>
                    </div>
                  ) : null}
                  <ListItemText primary="My Profile" />
                </ListItem>
                {/* </ClickAwayListener> */}
                {/* <ListItem button key='Profile' classes={{ root: clsx(classes.support, openAvatarNavbar && classes.openAvatarNavbar) }} >
                  <Support openDialog={false} offDropdown={handleClickNavbar} />
                </ListItem> */}
              </div>
            }
          </Hidden>
          <div>
            <ListItem button classes={{ root: classes.listItem }} onClick={handleClickMenuItem2}>
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <img src={Images.parentSideBar2} alt="" />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primaryListItemText }} primary={
                <>
                  Board Updates
                  <img
                    style={{
                      transform: openInnerMenu2 ? 'rotate(90deg)' : 'rotate(0)',
                      transition: '0.5s',
                    }}
                    src={Images.dropdown}
                    alt="cortishare"
                  />
                </>
              } />
            </ListItem>
            {openInnerMenu2 &&
              <InfiniteScroll
                className={classes.dropdownMapsFollowing}
                dataLength={followingMaps.data.length}
                next={loadMore}
                hasMore={followingMaps.pageNumber < followingMaps.pageTotal}
                loader={<LoadingIconMore className="drawer" />}
                height={400}
              >
                <div className={classes.innerMenu2}>
                  {followingMaps.data.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      classes={{ root: classes.listItem }}
                      onClick={() => { history.push(`/board/${item.mapId}`) }}
                    >
                      <ListItemText classes={{ primary: classes.primaryListItemText }} primary={
                        <>
                          {checkLongString(item.title, 20, 15)}
                          {item.newPostsSinceLastViewCount !== 0 &&
                            <span className={classes.numTheme}>{formatNum(item.newPostsSinceLastViewCount)}</span>
                          }
                        </>
                      } />
                    </ListItem>
                  ))}
                </div>
              </InfiniteScroll>
            }
          </div>

          {/* <Hidden mdUp>
            
          </Hidden> */}

        </List>
      </Drawer>
      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
      {openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} handleSignUp={handleSignUp} />}
      {!openVerifyApp && openSignUp && <Signup handleClickResentEmail={handleClickResentEmail} openSignUp={openSignUp} handleClose={handleCloseSignUp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} handleSubmitSignUp={handleSubmitSignUp} />}
      {openVerifyApp && <VerifyApp verifyUserName={verifyUserName} openVerifyApp={openVerifyApp} handleVerifyApp={handleVerifyApp} handleLogin={handleLogin} />}
      { <PopupHelper isopenPopup={false} handleClose={handleClosePopupHelper} />}
      {openResentEmail && <ResentEmail openPopup={openResentEmail} handleClose={handleCloseResentEmail} />}

    </div>
  );
}

export default Header
