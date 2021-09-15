import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Grid, Avatar, Box, Hidden } from '@material-ui/core';
import useStyles from './styles';
import { Text, Buttons, LoadingIconMore, Modal, PopupUpgrade } from 'components'
import { useDispatch, connect, useSelector } from 'react-redux';
import {
  GET_INFO_INVITE_MAP,
  GET_ALL_USER_TO_INVITE,
  ADD_USER_INVITE,
  REMOVE_USER_INVITE,
  UPDATE_USER_INVITE_PERMISSION,
  UPDATE_INVITE_USER,
  UPDATE_PERMISSION,
  REMOVE_PERMISSION,
  GENERATE_AND_REMOVE_LINK_REQUEST,
  RESET_LIST_USER_INVITE,
} from 'redux/reducers/map/actionTypes'
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close';
import Images from 'config/images'
import LeaveMap from '../LeaveMap'
import { toast } from 'react-toastify';
// import { checkPaymentStatus } from 'helpers'


const Collaborations = ({ openDialog, handleClose }) => {
  const classes = useStyles()
  // const text = window.location.href
  const dispatch = useDispatch()
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const { totalPage, pageSize, loadingUser, inviteUser, user, searchPatern, page, mapShareLink } = useSelector((state) => state.map.inviteCollab)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const [typingTimeout, setTypingTimeout] = useState(null)
  const [isOpenLeaveMap, setIsOpenLeaveMap] = useState(false)
  const [userValue, setUserValue] = useState('')
  const [customerInfo, setCustomerInfo] = useState()
  const [disabled, setDisabled] = useState(false)
  // const payment = useSelector((state) => state.profile.payment)
  // const maps = useSelector((state) => state.profile.maps)
  // const plan = useSelector((state) => state.profile.plan)
  // const info = useSelector((state) => state.profile.info)
  const [isCreateLink, setIsCreateLink] = useState(false);
  const [inviteLink, setInviteLink] = useState(mapShareLink.url)
  const { userOwner, userEdits, userViews, userPendings, userNew } = useSelector((state) => state.map.inviteCollab.listUsers)
  const [isFirstSearch, setIsFirstSearch] = useState(false)
  // const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_LIST_USER_INVITE })
    }
  }, [])

  useEffect(() => {
    if (mapShareLink.url) {
      setInviteLink(mapShareLink.url)
      setIsCreateLink(true)
    } else {
      setIsCreateLink(false)
      setInviteLink('')
    }
  }, [mapShareLink])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      console.log('Copied!');
    } catch (err) {
      console.log('Fail!');
    }
  }


  const callSuggest = (newValue) => {
    dispatch({
      type: GET_ALL_USER_TO_INVITE,
      payload: {
        type: 'newSearchPatern',
        data: {
          searchPatern: newValue,
          page: 1,
          pageSize: pageSize
        }
      }
    })
  }


  const handleClickOutside = e => {
    if ((!e.target.id || e.target.id !== 'input-search-user') && user.length !== 0) {
      callSuggest('')
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return (() => { window.removeEventListener('click', handleClickOutside) })
  }, [user])

  useEffect(() => {
    checkUpdated()
  }, [inviteUser])

  const handleInviteUser = () => {
    if (userNew.length === 0) {
      handleClose()
      return
    }
    const payload ={
      mapId: currentRootMap,
      onSuccess: () => {
        dispatch({
          type: GET_INFO_INVITE_MAP,
          payload: {
            mapId: currentRootMap
          }
        })
      }
    }
    payload.customerPermissions = userNew.map((item) => {
      if (item.customerId) {
        return {
          customerId: item.customerId,
          permission: item.permission
        }
      } else {
        return {
          email: item.customerEmail,
          permission: item.permission
        }
      }
    })
    // if(inviteUser.filter(item => item.permission !== 'Owner' && item.id === null).length)
    //   payload.customerPermissions = inviteUser.filter(item => item.permission !== 'Owner' && item.id === null).map(item => {
    //     if (item.customerId) {
    //       return {
    //         customerId: item.customerId,
    //         permission: item.permission
    //       }
    //     } else {
    //       return {
    //         email: item.customerEmail,
    //         permission: item.permission
    //       }
    //     }
    //   })

    dispatch({
      type: UPDATE_INVITE_USER,
      payload: payload
    })
    handleClose()
  }

  const checkUpdated = () => {
    if (dataMindMap.mapPermission !== 'Owner') {
      setDisabled(true)
      return
    } else {
      if (inviteUser.find(item => item.id === null)) {
        setDisabled(false)
        return
      }
      setDisabled(true)
    }
  }

  const handleChangeKeySearch = (e) => {
    if (dataMindMap.mapPermission !== 'Owner') return
    setIsFirstSearch(true)
    const newValue = e.target.value
    setUserValue(newValue)
    typingTimeout && clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => {
      callSuggest(newValue)
    }, 500))
  }

  const handleBlurKeySearch = () => {
    if (!userValue) {
      setIsFirstSearch(false)
    }
  }

  const selectUser = (suggestion) => {
    if (!inviteUser.find(item => (item.customerId === suggestion.customerId || item.customerEmail === suggestion.email))) {
      dispatch({
        type: ADD_USER_INVITE,
        payload: {
          customerId: suggestion.customerId,
          customerEmail: suggestion.email,
          customerFullName: suggestion.fullName,
          permission: "View",
          customerUserName: suggestion.userName,
          profilePicture: suggestion.profilePicture,
          id: null,
          status: "New",
        }
      })
      setUserValue('');
      setIsFirstSearch(false)
    } else {
      toast.warning('This email has added')
    }
  }

  const selectUserEmail = () => {
    // userValue
    if(!validateEmail(userValue)) {
      toast.warning('This is not email, Please you can input mail again')
      return
    }
    if (!inviteUser.find(item => item.customerEmail === userValue)) {
      dispatch({
        type: ADD_USER_INVITE,
        payload: {
          customerId: null,
          customerEmail: userValue,
          customerFullName: null,
          permission: "View",
          customerUserName: null,
          profilePicture: null,
          id: null,
          status: "New",
        }
      })
      setUserValue('');
      setIsFirstSearch(false)
    } else {
      toast.warning('This email has added')
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const loadMore = () => {
    dispatch({
      type: GET_ALL_USER_TO_INVITE,
      payload: {
        type: 'moreUser',
        data: {
          searchPatern: userValue,
          page: page + 1,
          pageSize: pageSize
        }
      }
    })
  }
  useEffect(() => {
    if (currentRootMap)
      dispatch({
        type: GET_INFO_INVITE_MAP,
        payload: {
          mapId: currentRootMap
        },
        isRefresh: true
      })
  }, [currentRootMap])

  // const handleOpenUpgrade = () => {
  //   setIsOpenUpgrade(true)
  // }

  // const handleCloseUpgrade = () => {
  //   setIsOpenUpgrade(false)
  // }

  const updateUserInvitePermission = (permission) => {
    // if ([0,2,4].includes(checkPaymentStatus({ customer: info, payment: payment })) && maps.length >= 1) {
    //   handleOpenUpgrade();
    // }
    if (userEdits.length >= 25) {
      toast.warning('This map has reached the limit of 25 editors')
      return;
    }
    dispatch({
      type: UPDATE_USER_INVITE_PERMISSION,
      payload: {
        customerId: customerInfo.customerId,
        customerEmail: customerInfo.customerEmail,
        customerFullName: customerInfo.customerFullName,
        permission: permission,
        customerUserName: customerInfo.customerUserName,
        profilePicture: customerInfo.profilePicture,
        id: null,
        status: "New",
      }
    })
  }

  const updatePermission = (permission) => {
    if (userEdits.length >= 25) {
      toast.warning('This map has reached the limit of 25 editors')
      return;
    }
    dispatch({
      type: UPDATE_PERMISSION,
      payload: {
        mapId: currentRootMap,
        permission: permission,
        mapSharingId: customerInfo.id || null,
        customerId: customerInfo.customerId || null,
        email: !customerInfo.id ? customerInfo.customerEmail : null,
      },
      onSuccess: () => {
        dispatch({
          type: GET_INFO_INVITE_MAP,
          payload: {
            mapId: currentRootMap
          }
        })
      }
    })
  }

  const removePermission = () => {
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
          isRefresh: dataMindMap.mapPermission === "Edit" || dataMindMap.mapPermission === "View" ,
          onSuccess: () => {
            if (dataMindMap.mapPermission === "Edit") handleClose()
          }
        })
      }
    })
  }

  const handleClickOption = (type) => {
    switch (type) {
      // case 'owner':
      //   if (customerInfo.permission !== 'Owner') {
      //     // updatePermission('Owner')
      //   }
      //   break;
      case 'canEdit':
        if (customerInfo.permission !== 'Edit') {
          if (customerInfo.status === "New") {
            updateUserInvitePermission('Edit')
          } else {
            updatePermission('Edit')
          }
        }
        break;
      case 'canView':
        if (customerInfo.permission !== 'View') {
          if (customerInfo.status === "New") {
            updateUserInvitePermission('View')
          } else {
            updatePermission('View')
          }
        }
        break;
      case 'Remove':
        if (customerInfo.status === "New") {
          dispatch({
            type: REMOVE_USER_INVITE,
            payload: customerInfo
          })
        } else {
          setIsOpenLeaveMap(true)
          // removePermission()
        }
        break;
      default: break;
    }
  }

  const listOption = [
    // {
    //   label: 'Owner',
    //   onClick: () => handleClickOption('owner'),
    // },
    {
      label: 'Can Edit',
      onClick: () => handleClickOption('canEdit'),
    },
    {
      label: 'Can View',
      onClick: () => handleClickOption('canView'),

    },
    {
      label: 'Remove',
      onClick: () => handleClickOption('Remove'),
    },
  ]

  const handleRemove = (item) => {
    setIsOpenLeaveMap(true)
    setCustomerInfo(item)
  }

  const handleCloseLeaveMap = () => {
    setIsOpenLeaveMap(false)
  }

  const handleAgreeLeaveMap = () => {
    removePermission()
    setIsOpenLeaveMap(false)
  }

  // next feature for cretae link 
  const handleClickLink = () => {
    setIsCreateLink(!isCreateLink)
    dispatch({
      type: GENERATE_AND_REMOVE_LINK_REQUEST,
      payload: {
        mapId: currentRootMap
      }
    })
  }

  return (
    <div>
      <Dialog
        // fullScreen
        // onClick={handleClickOutside}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.container }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        {/* <Grid container direction="column" classes={{ root: classes.containerHead }}>
          <div className={classes.wrapperHead}>
            <Grid classes={{ root: classes.containerTitle }}>
              <Text classes={{ root: classes.title }}>Invite Collaborators</Text>
            </Grid>
            { dataMindMap.mapPermission == 'Owner' && <>
            <Grid container alignItems="center" justify="space-between" classes={{ root: classes.containerTitleLink }}>
              <Text classes={{ root: classes.title }}>Invite Link</Text>
              <Text type="bold" classes={{ root: clsx(classes.title, classes.titleLink) }} handleClick={handleClickLink}>{isCreateLink ? 'Disable Link' : 'Create Link'}</Text>
            </Grid>
            <Grid container classes={{ root: clsx(classes.containerLink, !isCreateLink && classes.containerLinkHidden) }}>
              <Grid container className={classes.wrapperInpLink}>
                <input value={inviteLink} className={classes.getLink} readOnly={true} />
              </Grid>
              <Grid container className={classes.wrapperBtnCopy} justify="flex-end">
                <button onClick={handleCopy} className={classes.btnCopy}>Copy</button>
              </Grid>
            </Grid>
            </>
            }
            <img src={Images.icCloseBig} className={classes.iconCloseInvite} onClick={handleClose} />
          </div>
        </Grid> */}
        <Grid classes={{ root: classes.containerBottom }}>
          <Grid container justify="space-between" classes={{ root: classes.containerTitle }}>
            <Text size='medium'>Invite</Text>
            <img src={Images.icCloseBig} alt="cortishare" className={classes.iconCloseInvite} onClick={handleClose} />
          </Grid>
          <Grid container wrap="nowrap" direction="column" classes={{ root: classes.containerSearch }}>
            <input 
              id="input-search-user" 
              className={classes.inputSearch} 
              value={userValue} 
              onChange={handleChangeKeySearch} 
              placeholder="Enter E-mail address to send invite"
              onBlur={handleBlurKeySearch}
            />
            <InfiniteScroll
              dataLength={user.length}
              next={loadMore}
              hasMore={page < totalPage}
              loader={<LoadingIconMore />}
              height={user.length == 1 ? 80 : 250}
              className={classes.suggestion}
              style={{ 
                zIndex: user.length ? 1002 : -1,
                position: 'absolute',
                width: '100%',
                top: 69,
              }}
            >
              {user.map((suggestion, idx) => (
                <Box key={idx} onClick={(e) => selectUser(suggestion)} display="flex" padding={2} className={clsx(classes.suggestWrapper, "suggest-item")}>
                  <Avatar className={classes.suggestPicture} src={suggestion.profilePicture} />
                  <div className={classes.suggestContent} >
                    <Text size='medium'>{suggestion.fullName}</Text>
                    {/* <p className={classes.text}>{suggestion.email}</p> */}
                  </div>
                </Box>
              ))}
            </InfiniteScroll>
            {isFirstSearch && user.length === 0 &&
              <Grid container justify="space-between" wrap="nowrap">
                {validateEmail(userValue)
                  ?
                  <Text classes={{ root: classes.textQuantity }}>
                    {`User does not exist, do you want to add this email `}
                    <span onClick={selectUserEmail} className={classes.textAddMail}>{userValue}</span>
                  </Text>
                  :
                  <Text classes={{ root: classes.textQuantity }}>
                    {`No result, you can invite them by email`}
                  </Text>
                }
                <Text 
                  classes={{ root: clsx(
                    classes.textQuantity, 
                    validateEmail(userValue) && classes.textAddMail,
                  )}} 
                  handleClick={selectUserEmail}
                >
                  Add Email
                </Text>
              </Grid>
            }
          </Grid>

          <Grid container classes={{ root: classes.containerQuantityUser }} wrap="nowrap">
            <Text classes={{ root: classes.textQuantity}}>{`${userEdits.length}: Editor`}</Text>
            <Text classes={{ root: classes.textQuantity}}>{`${userViews.length}: Viewer`}</Text>
            <Text classes={{ root: classes.textQuantity}}>{`${userPendings.length}: Pending`}</Text>
            {userNew.length !== 0 &&
              <Text classes={{ root: clsx(classes.textQuantity, classes.textStatusNew)}}>{`${userNew.length}: New`}</Text>
            }
          </Grid>

          <div className={classes.inviteUser}>
            <Grid container direction="column" wrap="nowrap">
              {inviteUser && inviteUser.map((item, index) =>
                <Grid 
                  key={index} 
                  container 
                  alignItems="center" 
                  justify="space-between" 
                  wrap="nowrap" 
                  classes={{ root: classes.containerPeople }}
                  spacing={2}
                >
                  <Grid item container wrap="nowrap">
                    <Avatar src={item.profilePicture} alt="" classes={{ root: classes.avatar }} />
                    <Grid className={classes.inviteText}>
                      {item.status === 'Accepted' ?
                        <Text size='medium'>{item.customerUserName}</Text>
                        :
                        <>
                          <Text size='medium'>{item.customerUserName || item.customerEmail}</Text>
                          <Text 
                            classes={{ 
                              root: clsx(
                                classes.textStatus,
                                item.status === 'New' && classes.textStatusNew, 
                              ),
                            }}
                          >
                            {item.status}
                          </Text>
                        </>
                      }
                      {/* <p className={classes.text}>{item.customerEmail}</p> */}
                    </Grid>
                  </Grid>
                  <Grid 
                    item 
                    alignItems="center" 
                    container 
                    justify="flex-end" 
                    wrap="nowrap" 
                    classes={{ 
                      root: clsx(
                        item.permission !== 'Owner' && dataMindMap.mapPermission === 'Owner' && classes.containerPermission
                      )
                    }}
                  >
                    <p className={classes.text}>{item.permission === "Edit" ? "Editor" : item.permission}</p>
                    {
                      dataMindMap.mapPermission === 'Edit' && 
                      customer.customerId === item.customerId && 
                      <img 
                        src={Images.icCloseRed} 
                        alt="" 
                        className={classes.navigation} 
                        onClick={() => handleRemove(item)} 
                      />
                    }
                    {item.permission !== 'Owner' && dataMindMap.mapPermission === 'Owner' &&
                      <Modal
                        isOwner={true}
                        listDropDown={listOption}
                        type='dropdown'
                        item={[]}
                        isInvite={true}
                        handleSetCustomer={() => setCustomerInfo(item)}
                      />
                    }
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid container className={classes.buttonCreate} item justify="flex-end" alignItems="center" >
            <Buttons 
              btnType="large" 
              disabled={disabled} 
              onClick={handleInviteUser}
            >
              {userNew.length === 0 ? 'Cancel' : 'Invite'}
            </Buttons>
          </Grid>
          </div>
          
        </Grid>
      </Dialog>
      {isOpenLeaveMap && 
        <LeaveMap 
          open={isOpenLeaveMap} 
          handleClose={handleCloseLeaveMap} 
          confirm={handleAgreeLeaveMap}
          isOwner={dataMindMap.mapPermission === 'Owner'}
          customerInfo={customerInfo}
        />
      }
      {/* {isOpenUpgrade && 
        <PopupUpgrade 
          openUpgrade={isOpenUpgrade} 
          handleClose={handleCloseUpgrade}
        />
      } */}
    </div>
  );
}

export default connect()(Collaborations);