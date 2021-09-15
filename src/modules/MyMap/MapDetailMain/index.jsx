import React, { useEffect, useState, memo } from 'react';
import { Grid, Box } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import {
  Loading,
  Text,
  Follow,
  Modal,
  StackGridCustom,
  HelmetMetaData,
  Buttons,
  Tooltips,
  PopupDeleteMap,
  BreadcrumbsCustom,
} from 'components'
import PopupUpgrade from 'components/PopupUpgrade'
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx'
import {
  GET_POSTS_BY_MAP_ID_REQUEST,
  COUNT_VIEWER_TO_RECENT,
  SAVE_FOLLOW_MAP_REQUEST,
  GET_MAP_DETAIL_REQUEST,
  RESET_MAP_DETAIL,
} from 'redux/reducers/map/actionTypes'
import moment from 'moment'
import { formatArrayBreadCrumb, checkPaymentStatus } from 'helpers'
import { classesWidthSplit } from 'utils'
import EditMap from 'modules/MyMap/EditMap'
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import {
  // GET_DETAIL_POST_BY_ID_REQUEST,
  GET_POSTS_BY_NODE_ID_REQUEST,
  RESET_NODE_DETAIL,
  CREATE_POST_REQUEST,
} from 'redux/reducers/node/actionTypes';
import ShowMoreText from 'react-show-more-text';
import SelectExistingMap from 'modules/MyMap/SelectExistingMap'
import InfiniteScroll from 'react-infinite-scroll-component';
import ContinueViewing from '../ContinueViewing'
import { checkLongString } from 'helpers'
import { toast } from 'react-toastify';

const MapDetailMain = memo((props) => {
  const { isMap } = props
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { mapId, nodeId } = useParams()
  // const [isViewMore, setIsViewMore] = useState(false);
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const viewMap = useSelector((state) => state.map.viewMap)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const isLoading = useSelector((state) => state.global.isLoading)
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const { viewMorePost, nodeDetail } = useSelector((state) => state.node)
  const viewMorePostByMap = useSelector((state) => state.map.viewMorePost)
  const selectNode = useSelector((state) => state.map.selectNode)
  const breadcrumbs = useSelector((state) => state.global.dataHeader.breadcrumbs)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const isBlur = useSelector((state) => state.map.isBlur)
  const { info, payment } = useSelector((state) => state.profile)
  // const [exceptCurrentMap, setExceptCurrentMap] = useState(false)
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')
  const checkPermissionFollow = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner' || dataMindMap.mapPermission === 'View')
  const checkPermissionAdd = dataMindMap && (dataMindMap.privacyName === 'Private' || dataMindMap.privacyName === 'Closed')
  const customer = JSON.parse(localStorage.getItem('customer'))
  const [isOpenAddPostToOtherMap, setIsOpenAddPostToOtherMap] = useState(false)
  const [height, setHeight] = useState('fit-content')
  const [openDialogViewing, setOpenDialogViewing] = useState(false)
  const [flag, setFlag] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [isShowMore, setIsShowMore] = useState(false)
  const loadingFollow = useSelector((state) => state.map.loadingFollow)

  const checkFreePlan = [0, 2, 4].includes(checkPaymentStatus({ customer: info, payment: payment }))
  useEffect(() => {
    setHeight('fit-content')
    // setOpenDialogViewing(false)
    if (isMap) {
      const onFail = () => {
        if (customer) history.push(`/board`)
      }
      dispatch({
        type: GET_POSTS_BY_MAP_ID_REQUEST,
        payload: {
          mapId: mapId,
          pageNumber: 1,
          pageSize: 20
        },
        onFail,
        onSuccess: () => setFlag(true),
        isAllowLoadMindmap: Object.keys(dataMindMap).length === 0 || currentRootMap.toString() !== mapId,
      })
      if (customer) {
        dispatch({
          type: COUNT_VIEWER_TO_RECENT,
          onSuccess: () => setFlag(true),
          payload: { mapId },
        })
      }
    } else {
      const onFail = () => {
        history.push(`/board/${mapId}`)
      }
      dispatch({
        type: GET_POSTS_BY_NODE_ID_REQUEST,
        payload: { nodeId, mapId: mapId },
        onFail,
        onSuccess: () => setFlag(true),
        mapId: mapId,
        isAllowLoadMindmap: Object.keys(dataMindMap).length === 0 || currentRootMap.toString() !== mapId,
      })
    }
    return () => {
      if (isMap) {
        dispatch({
          type: RESET_MAP_DETAIL,
        })
      } else {
        dispatch({
          type: RESET_NODE_DETAIL,
        })
      }
    }
  }, [mapId, nodeId])

  // useEffect(() => {
  //   if (Object.keys(viewMap).length !== 0) {
  //     let dataHeader = {
  //       privacy: viewMap.privacyName.toLowerCase(),
  //       breadcrumbs: [
  //         {
  //           label: viewMap.title ? viewMap.title : '',
  //           url: '',
  //         }
  //       ],
  //     }
  //     dispatch({
  //       type: SET_BREADCRUMBS,
  //       payload: dataHeader,
  //     })
  //   }
  //   console.log(viewMap);
  // }, [viewMap])

  // const handleClickViewMore = () => {
  //   setIsViewMore(!isViewMore)
  // }

  useEffect(() => {
    const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
    const bodyHeight = document.getElementById('body-post') ? document.getElementById('body-post').clientHeight : 0
    const bodyHeaderHeight = document.getElementById('body-header') ? document.getElementById('body-header').clientHeight : 0

    if (isMap) {
      if (Object.keys(viewMap).length === 0) return
      if (!viewMap.posts) return
      if (!viewMap.posts.data) return
      if (window.innerHeight > (headerHeight + bodyHeight) && viewMap.posts.page < viewMap.posts.pageTotal) {
        loadMorePostsByMap()
      }
    } else {
      if (Object.keys(nodeDetail).length === 0) return
      if (nodeDetail.posts && nodeDetail.posts.data.length === 0) return
      if (window.innerHeight > (headerHeight + bodyHeight) && nodeDetail.posts.page < nodeDetail.posts.pageTotal) {
        loadMorePostsByNode()
      }
    }
    // if (!customer && ((window.innerHeight) < (headerHeight + bodyHeight + 20))) {
    if (!customer) {
      setOpenDialogViewing(true)
      // if (isMap) {
      //   setHeight(`calc(${window.innerHeight}px - ${bodyHeaderHeight + headerHeight}px + 170px)`)
      // } else {
      //   setHeight(`calc(${window.innerHeight}px - ${bodyHeaderHeight + headerHeight}px + 128px)`)
      // }
      setHeight(`calc(100% - ${bodyHeaderHeight + headerHeight}px - 20px)`)
    }
  }, [viewMap, nodeDetail])

  const handleFollows = () => {
    if (checkPermissionFollow) {
      toast.warning("You are already the owner/collaborator");
      return
    }
    const formData = new FormData()
    formData.append("mapId", parseInt(mapId))
    dispatch({
      type: SAVE_FOLLOW_MAP_REQUEST,
      payload: formData,
      data: {
        mapId: mapId,
        pageNumber: viewMap.posts ? viewMap.posts.page : 1,
      },
      isRefresh: true,
    })
  }

  const closeDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  const handleClickDropdown = (type) => {
    switch (type) {
      case 'edit':
        dispatch({ type: GET_MAP_DETAIL_REQUEST, payload: viewMap.id })
        dispatch({
          type: SET_IS_EDIT_MAP, payload: true
        })
        console.log(`drop-down ${type}`)
        break;
      case 'delete':
        setOpenDialogDelete(true)
        console.log(`drop-down ${type}`)
        break;
      default:
        break;
    }
  }

  const listDropDown = [
    {
      label: 'Edit',
      onClick: () => handleClickDropdown('edit'),
    },
    // Add more Function Delete if have require
    {
      label: 'Delete',
      onClick: () => handleClickDropdown('delete'),
    },
  ]

  const handleClickProfile = (data) => {
    if (!data) return
    if (!customer) return
    if (customer.customerId === data.customerId) {
      history.push(`/profile`)
    } else {
      history.push(`/search/profile/${data.customerId}`)
    }
  }

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const handleAddPost = () => {
    if (checkFreePlan) {
      if (dataMindMap.totalPostCreated && dataMindMap.totalPostCreated >= 80) {
        setIsOpenUpgrade(true)
        return false
      }
    }
    const onSuccess = (new_post) => {
      history.push({
        // pathname: `/new-post/board/${selectNode.mapId}/node/${selectNode.nodeId}`,
        pathname: `/edit-post/${new_post.post.postId}/board/${selectNode.mapId}/node/${new_post.parentNodeId}`,
        // search: `?map=${selectNode.mapId}${!!selectNode.nodeId && `&parentNode=${selectNode.nodeId}`}`,
      })
    }

    let formDataPost = new FormData()
    formDataPost.append("ParentNodeId", selectNode.nodeId)
    formDataPost.append("Title", 'New Post')
    formDataPost.append("Description", '')
    formDataPost.append("Url", '')
    // formData.upload.filter(item => item.type === 'clientFile').map((item) => {
    //   if (formData.post === 'url') {
    //     formDataPost.append("PostMediaUrl", item.url)
    //   } else {
    //     formDataPost.append("PostMedia", item.url)
    //   }
    // })

    // isDraft
    formDataPost.append("isDraft", true)

    dispatch({
      type: CREATE_POST_REQUEST,
      payload: formDataPost,
      mapId: selectNode.mapId,
      onSuccess: onSuccess,
    })
  }

  // ticket #1225
  // const handleAddToOrtherMap = () => {
  //   if (checkPermissionAdd) {
  //     toast.warning("You Cannot Save this Content As This Board is Closed or Private");
  //     return
  //   }
  //   if (!isBlur) {
  //     setIsOpenAddPostToOtherMap(true)
  //   }
  // }

  // const handleAddToOrtherMapExceptCurrent = () => {
  //   if (!isBlur) {
  //     setExceptCurrentMap(true)
  //     setIsOpenAddPostToOtherMap(true)
  //   }
  // }

  const loadMorePostsByNode = () => {
    const onFail = () => {
      history.push(`/board/${mapId}`)
    }
    dispatch({
      type: GET_POSTS_BY_NODE_ID_REQUEST,
      payload: {
        nodeId,
        pageNumber: nodeDetail.posts.page + 1,
        pageSize: nodeDetail.posts.size,
        mapId: mapId
      },
      onFail,
      isAllowLoadMindmap: false,
    })
  }

  const loadMorePostsByMap = () => {
    const onFail = () => {
      history.push(`/board`)
    }
    dispatch({
      type: GET_POSTS_BY_MAP_ID_REQUEST,
      payload: {
        mapId: mapId,
        pageNumber: viewMap.posts.page + 1,
        pageSize: viewMap.posts.size
      },
      onFail,
      isAllowLoadMindmap: false,
    })
  }

  const handleShowMore = () => {
    setIsShowMore(!isShowMore)
  }

  const renderButtonAddOrFollow = () => {
    return (
      <Grid item classes={{ root: classes.containerContentRight }}>
        {isMap ?
          <Grid
            item
            classes={{
              root: clsx(
                checkPermission ? classes.containerFollowsMap : classes.containerFollows,
                // classes[`${classesWidthSplit(widthSplit)}`]
              )
            }}
          >
            <Follow
              customerId={isMap ? viewMap.customerId : nodeDetail.customerId}
              numberFollow={isMap ? viewMap.followerCount : nodeDetail.followerCount}
              // isFollow={isMap ? viewMap.followed : nodeDetail.followed}
              isFollow={dataMindMap && dataMindMap.followed}
              disabled={isLoading}
              handleClick={handleFollows}
              checkPermissionFollow={checkPermissionFollow}
            />
          </Grid>
          :
          customer &&
          <>
            {
              // (
              //   !(dataMindMap.privacyName === 'Private' || dataMindMap.privacyName === 'Closed') ||
              //   !(dataMindMap.mapPermission === 'Owner')
              // ) &&
              <Grid item classes={{ root: clsx(classes.containerFollows, classes.mind) }}>
                <Text size="medium" color='mainColor'>{nodeDetail.nodeLinkCount}</Text>
                <img src={Images.icLoading} alt="ImagesLogo" className={classes.iconLogoMap} />
                {/* ticket #1225 */}
                {/* <Buttons
                  classes={{
                    root: clsx(
                      classes.btnAdd,
                      checkPermissionAdd && classes.disabledBtnFollow,
                    ),
                  }}
                  onClick={handleAddToOrtherMap}
                >
                  Save Node
                </Buttons> */}
                <Buttons
                  disabled={loadingFollow}
                  onClick={handleFollows}
                  classes={{
                    root: clsx(
                      classes.btnFollow,
                      dataMindMap.followed && classes.btnFollowed,
                      checkPermissionFollow && classes.disabledBtnFollow,
                    ),
                  }}
                >
                  {dataMindMap.followed ? 'Unfollow Board' : 'Follow Board'}
                </Buttons>
              </Grid>
            }
          </>
        }
      </Grid>
    )
  }

  const renderTitle = () => {
    return (
      <>
        <Grid container>
          <Tooltips title={isMap ? (Object.keys(viewMap).length !== 0 ? viewMap.title : '') : (Object.keys(nodeDetail).length !== 0 ? nodeDetail.title : '')}>
            <Text classes={{ root: classes.title }}>
              {isMap ? viewMap.title : nodeDetail.title}
            </Text>
          </Tooltips>
        </Grid>
        <Text classes={{ root: classes.subTitle }}>
          {`Created by `}
          <Tooltips title={(isMap ? viewMap.createdBy : nodeDetail.createdBy) || ''}>
            <span className={clsx(classes.author, !customer && classes.notAuthor)} onClick={() => handleClickProfile(isMap ? viewMap : nodeDetail)}>
              {checkLongString(isMap ? viewMap.createdBy : nodeDetail.createdBy, 20, 20)}
            </span>
          </Tooltips>
          {` on ${moment(isMap ? viewMap.creationTime : nodeDetail.creationTime).format('DD MMM')}`}
        </Text>
      </>
    )
  }

  return (
    <>
      <HelmetMetaData title={isMap ? viewMap.title : nodeDetail.title}
        description="CortiShare"
        image=""
      ></HelmetMetaData>
      {isLoading && <Loading type="map" />}
      {((viewMap && Object.keys(viewMap).length !== 0) || (nodeDetail && Object.keys(nodeDetail).length !== 0)) &&
        <Grid
          container
          direction="column"
          classes={{
            root: clsx(
              classes.container,
              classes[`${classesWidthSplit(widthSplit)}`]
            )
          }}
          style={{
            // height: openDialogViewing ? `calc(${window.innerHeight}px + 175px)` : 'fit-content',
            height: openDialogViewing ? `calc(100% - 40px)` : 'fit-content',
            overflow: openDialogViewing ? 'hidden' : 'unset',
          }}
          id='body-post'
        >
          <div id="body-header" className={classes.wrapperNode}>
            <Grid container justify="space-between" wrap="nowrap" classes={{ root: classes.containerHeader }}>
              <Grid item classes={{ root: classes.containerHeaderContent }}>
                <Grid
                  container
                  wrap="nowrap"
                  justify="space-between"
                  classes={{ root: classes.containerContent }}
                >
                  <Grid item classes={{ root: classes.containerContentLeft }}>
                    <div className={classes.topTitle}>
                      {isMap
                        ?
                        <span>Board:</span>
                        :
                        <span>Node:</span>
                      }
                      <BreadcrumbsCustom classNameCustom="customBreadcrumb" data={formatArrayBreadCrumb(breadcrumbs)} type='breadcrumbLink' />
                    </div>
                    {widthSplit > 600 &&
                      <Grid container>
                        {renderTitle()}
                      </Grid>
                    }
                  </Grid>
                  {widthSplit > 600 &&
                    renderButtonAddOrFollow()
                  }
                </Grid>

              </Grid>
              <Grid item classes={{ root: classes.containerHeaderIcon }}>
                <div>
                  <Modal
                    isFollow={true}
                    item={{
                      id: isMap ? (viewMap && viewMap.id) : (nodeDetail && nodeDetail.nodeId),
                      title: isMap ? (viewMap && viewMap.title) : (nodeDetail && nodeDetail.title),
                    }}
                    type={'share'}
                  />
                </div>
                {isMap && checkPermission &&
                  <div>
                    <Modal
                      isFollow={true}
                      listDropDown={listDropDown}
                      type={'dropdown'}
                    />
                  </div>
                }
              </Grid>
            </Grid>
            {widthSplit <= 600 &&
              <Grid container classes={{ root: classes.containerTitleMobile }}>
                {renderTitle()}
              </Grid>
            }
            {widthSplit <= 600 &&
              <Grid container classes={{ root: clsx(classes.containerAddMobile) }}>
                {renderButtonAddOrFollow()}
              </Grid>
            }
            {/* {isMap && Object.keys(viewMap).length !== 0 &&
              <Grid container>
                <div className={classes.containerDescription}>
                  <span component="div" className={clsx(classes.description, isShowMore && classes.descriptionShow)}>
                    {viewMap.description} 
                  </span>
                  <span className={classes.viewMore} onClick={handleShowMore}>{`${isShowMore ? 'View Less' : 'View More'}`}</span>
                </div>
              </Grid>
            } */}

            {isMap && Object.keys(viewMap).length !== 0 &&
              <Grid container>
                <Grid container >
                  <Text component="div" >
                    {viewMap.description ?
                      <ShowMoreText
                        lines={3}
                        more="View More"
                        less="View Less"
                        keepNewLines={true}
                        className={classes.containerDescription}
                        expanded={false}
                        width={widthSplit - (widthSplit > 580 ? 100 : 40)}
                        more={(<span className={classes.viewMore} >View More</span>)}
                        less={(<span className={classes.viewMore} >View Less</span>)}
                      >
                        {viewMap.description}
                      </ShowMoreText>
                      : ''
                    }
                  </Text>
                </Grid>
              </Grid>
            }
            {isMap && viewMap.tags !== "null" &&
              <Grid container classes={{ root: classes.tags }}>
                {viewMap.tags && viewMap.tags.split(',').map((tag, idx) => (
                  <div key={idx} className={classes.tagsItem}>
                    <div className={classes.tagsItemText}>
                      {tag}
                    </div>
                  </div>
                ))}
              </Grid>
            }
          </div>
          {isMap && viewMap.posts && height &&
            <Grid container direction="column" alignItems="flex-start" justify="flex-start" style={{ height: height, overflow: openDialogViewing ? 'hidden' : 'unset' }}>
              <Grid container classes={{ root: classes.quantityPosts }}>
                <Text >
                  {`${!!viewMap.posts && viewMap.posts.totalCount && viewMap.posts.totalCount > 1 ? viewMap.posts.totalCount + ' Posts' : viewMap.posts.totalCount + ' Post'}`}
                </Text>
                {checkPermission &&
                  <span onClick={handleAddPost} className={classes.iconAddPost}>
                    <img src={Images.icAddPost2nd} />
                  </span>
                }
              </Grid>
              <Grid container style={{ height: openDialogViewing ? 'calc(100% - 20px - 35px)' : 'fit-content' }}>
                {viewMap.posts.data &&
                  <StackGridCustom
                    data={viewMap.posts.data || []}
                    checkPermission={checkPermission}
                    isLoadMore={viewMorePostByMap}
                    loadMorePostsByMap={loadMorePostsByMap}
                  />
                }
              </Grid>
            </Grid>
          }
          {isMap && !viewMap.posts &&
            <Grid container classes={{ root: classes.quantityPosts }}>
              <Text >
                0 Post
              </Text>
              {checkPermission &&
                <span onClick={handleAddPost} className={classes.iconAddPost}>
                  <img src={Images.icAddPost2nd} />
                </span>
              }
            </Grid>
          }
          {!isMap &&
            <div className={classes.spacing30}></div>
          }
          {!isMap && nodeDetail.posts && height &&
            <Grid container direction="column" alignItems="flex-start" justify="flex-start" style={{ height: height, overflow: openDialogViewing ? 'hidden' : 'unset' }}>
              <Grid container classes={{ root: classes.quantityPosts }}>
                <Text >
                  {`${!!nodeDetail.posts && nodeDetail.posts.totalCount && nodeDetail.posts.totalCount > 1 ? nodeDetail.posts.totalCount + ' Posts' : nodeDetail.posts.totalCount + ' Post'}`}
                </Text>
                {checkPermission && currentRootMap && currentRootMap === nodeDetail.mapId &&
                  <span onClick={handleAddPost} className={classes.iconAddPost}>
                    <img src={Images.icAddPost2nd} />
                  </span>
                }
              </Grid>
              <Grid container style={{ height: openDialogViewing ? 'calc(100% - 20px - 35px)' : 'fit-content' }}>
                {nodeDetail.posts.data &&
                  <StackGridCustom
                    isLoadMore={viewMorePost}
                    checkPermission={checkPermission && currentRootMap && currentRootMap === nodeDetail.mapId}
                    loadMorePostsByNode={loadMorePostsByNode}
                    data={nodeDetail.posts.data || []}
                  />
                }
              </Grid>
            </Grid>
          }
          {!isMap && !nodeDetail.posts &&
            <Grid container classes={{ root: classes.quantityPosts }}>
              <Text >
                0 Post
              </Text>
              {checkPermission && currentRootMap && currentRootMap === nodeDetail.mapId &&
                <span onClick={handleAddPost} className={classes.iconAddPost}>
                  <img src={Images.icAddPost2nd} />
                </span>
              }
            </Grid>
          }
          {isMap && isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
          {isOpenAddPostToOtherMap && <SelectExistingMap openSelectExistingMap={isOpenAddPostToOtherMap} handleClose={() => setIsOpenAddPostToOtherMap(false)} type="node" />}
          {openDialogViewing && <ContinueViewing open={openDialogViewing} />}
          {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={() => setIsOpenUpgrade(false)} />}
          {openDialogDelete && <PopupDeleteMap isCard={false} item={viewMap} openDialogDelete={openDialogDelete} closeDialogDelete={closeDialogDelete} />}
        </Grid>
      }
    </>

  );
})

export default connect()(MapDetailMain);
