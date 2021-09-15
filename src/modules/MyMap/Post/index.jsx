import React, { useState, memo, useEffect, useCallback, useRef, useMemo } from 'react';
import { Grid, Avatar, Button, Hidden } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import {
  Buttons,
  Text,
  SliderCustom,
  VideoCustom,
  Loading,
  Modal,
  BreadcrumbsCustom,
  HelmetMetaData,
  Avatars,
  Tooltips
} from 'components'
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx'
import { classesWidthSplit } from 'utils';
import moment from 'moment';
import {
  GET_DETAIL_POST_BY_ID_REQUEST,
  ADD_COMMENT_POST,
  DELETE_POST_REQUEST,
  RESET_POST_DETAIL,
} from 'redux/reducers/node/actionTypes';
import { GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST, SAVE_FOLLOW_MAP_REQUEST } from 'redux/reducers/map/actionTypes'
import { GET_COMMENT_BY_MAP_ID_REQUEST } from 'redux/reducers/node/actionTypes'
import DialogConfirmDeletePost from 'modules/MyMap/DialogConfirmDeletePost'
import SelectExistingMap from 'modules/MyMap/SelectExistingMap'
import { checkLongString, formatArrayBreadCrumb } from 'helpers'
import { CallMissedSharp } from '@material-ui/icons';
import ClickAway from 'components/ClickAwayListeners';
import MovePost from 'modules/MyMap/MovePost'
import { LoadingIconMore } from 'components'
import ContinueViewing from '../ContinueViewing'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const Post = memo(({ size }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles(size);
  const { mapId, postId } = useParams()
  const [isOpenMovePost, setIsOpenMovePost] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const [isOpenDialogConfirmDelete, setIsOpenDialogConfirmDelete] = useState(false)
  const [isOpenAddPostToOtherMap, setIsOpenAddPostToOtherMap] = useState(false)
  const [errorComment, setErrorComment] = useState('');
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const viewMap = useSelector((state) => state.map.viewMap)
  const selectNode = useSelector((state) => state.map.selectNode)
  const postDetail = useSelector((state) => state.node.postDetail)
  const comments = useSelector((state) => state.node.comments)
  const { totalCountComment, currentPageComment, viewMoreComment } = useSelector((state) => state.node)
  // const isLoading = useSelector((state) => state.global.isLoading)
  const isLoadingPost = useSelector((state) => state.node.isLoadingPost)
  const titleNode = useSelector((state) => state.node.titleNode)
  const loadingComment = useSelector((state) => state.node.loadingComment)
  const loadingFollow = useSelector((state) => state.map.loadingFollow)
  const breadcrumbs = useSelector((state) => state.global.dataHeader.breadcrumbs)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')
  const checkPermissionFollow = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner' || dataMindMap.mapPermission === 'View')
  const checkPermissionAdd = dataMindMap && (dataMindMap.privacyName === 'Private' || dataMindMap.privacyName === 'Closed')
  const isBlur = useSelector((state) => state.map.isBlur)
  const [openDialogViewing, setOpenDialogViewing] = useState(false)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const observer = useRef()
  const postOwner = postDetail.post && !postDetail.post.isLinkDirectly && !postDetail.post.isLinkPost

  const lastCommentRef = useCallback(node => {
    if (isLoadingPost) return;

    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && viewMoreComment) {
        loadMoreComments();
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoadingPost, viewMoreComment, currentPageComment])

  useEffect(() => {
    dispatch({
      type: GET_DETAIL_POST_BY_ID_REQUEST,
      payload: {
        mapId: mapId,
        postId: postId,
      }
    })

    dispatch({
      type: GET_COMMENT_BY_MAP_ID_REQUEST,
      payload: {
        postId: postId,
      }
    })
    return () => {
      dispatch({ type: RESET_POST_DETAIL })
    }
  }, [postId])

  useEffect(() => {
    if (!customer) setOpenDialogViewing(true)
  }, [postDetail])

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > 300) {
      setErrorComment('Your Comment field is more than 300 characters long!')
    } else {
      setErrorComment(null)
    }
    setCommentValue(value)

  }

  const loadMoreComments = () => {
    dispatch({
      type: GET_COMMENT_BY_MAP_ID_REQUEST,
      payload: {
        postId: postId,
        pageNumber: currentPageComment + 1,
        pageSize: 10
      }
    })
  }
  // useEffect(() => {
  //   if (Object.keys(postDetail).length !== 0) {
  //     dispatch({
  //       type: SET_SELECT_NODE,
  //       payload: {
  //         nodeId: postDetail.id,
  //         mapId: postDetail.mapId
  //       },
  //     })
  //   }
  // }, [postDetail])

  // useEffect(() => {
  //   if (Object.keys(postDetail).length !== 0) {
  //     let dataHeader = {
  //       privacy: postDetail.privacyName ? postDetail.privacyName.toLowerCase() : '',
  //       breadcrumbs: [
  //         {
  //           label: postDetail.mapTitle ? postDetail.mapTitle : '',
  //           url: `/board/${postDetail.mapId}`,
  //         },
  //         {
  //           label: postDetail.title ? postDetail.title : '',
  //           url: '',
  //         },
  //       ],
  //     }
  //     dispatch({
  //       type: SET_BREADCRUMBS,
  //       payload: dataHeader,
  //     })
  //   }
  // }, [postDetail])
  const handleAddComment = () => {
    const onSuccess = () => {
      dispatch({
        type: GET_COMMENT_BY_MAP_ID_REQUEST,
        payload: {
          postId: postId,
        }
      })
    }
    commentValue && dispatch({
      type: ADD_COMMENT_POST,
      payload: {
        postId: postDetail.post.postId,
        mapName: postDetail.mapTitle,
        onwerPostId: postDetail.customerId,
        content: commentValue,
        mapId: postDetail.mapId,
      },
      onSuccess: onSuccess
    })
    setCommentValue('')
  }

  const handleCloseDialogDelete = () => {
    setIsOpenDialogConfirmDelete(false)
  }

  const handleRemovePost = () => {
    let mapId, nodeId = null;
    if (Object.keys(postDetail).length !== 0 && postDetail.post.isLinkPost) {
      mapId = postDetail.post.mapId
      nodeId = postDetail.post.nodeId
    } else {
      mapId = postDetail.mapId
      nodeId = postDetail.nodeId
    }

    const onSuccess = () => {
      if (Object.keys(postDetail).length !== 0 && postDetail.post.isLinkPost) {
        history.push(`/board/${currentRootMap}`)
      } else {
        if (selectNode.root) {
          history.push(`/board/${currentRootMap}`)
        } else {
          history.push(`/board/${currentRootMap}/node/${postDetail.parentNodeId}`)
        }
      }
    }

    dispatch({
      type: DELETE_POST_REQUEST,
      payload: {
        postId: postId,
        mapId: currentRootMap,
        nodeId: nodeId,
      },
      onSuccess: onSuccess
    })
    setIsOpenDialogConfirmDelete(false)
  }

  const handleClickDropdown = (type) => {
    switch (type) {
      case 'edit':
        // console.log(`drop-down ${type}`)
        history.push(`/edit-post/${postId}/board/${postDetail.mapId}/node/${postDetail.parentNodeId}`)
        break;
      case 'remove':
        setIsOpenDialogConfirmDelete(true)
        break;
      case 'move':
        if (!postDetail) return
        dispatch({
          type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
          payload: {
            id: postDetail.post.mapId
          }
        });
        handleMovePost();
        break;
      default:
        break;
    }
  }

  const listDropDown = useMemo(() => {
    return [
      ...(!(Object.keys(postDetail).length !== 0 && postDetail.post.isLinkPost) ? [{
        label: 'Edit',
        onClick: () => handleClickDropdown('edit'),
      }] : []),
      {
        label: 'Move',
        onClick: () => handleClickDropdown('move'),
      },
      {
        label: 'Delete',
        onClick: () => handleClickDropdown('remove'),
      },
    ]
  }, [postDetail])

  const listShare = [
    {
      icon: Images.icFacebook,
      onClick: () => handleClickDropdown('facebook'),
    },
    {
      icon: Images.icWhatsapp,
      onClick: () => handleClickDropdown('whatsapp'),
    },
    {
      icon: Images.icTwitter,
      onClick: () => handleClickDropdown('twitter'),
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

  const handleAddToOrtherMap = () => {
    if (checkPermissionAdd) {
      toast.warning("You Cannot Save this Content As This Board is Closed or Private");
      return
    }
    if (!isBlur) setIsOpenAddPostToOtherMap(true)
  }

  const handleMovePost = () => {
    if (!isBlur) setIsOpenMovePost(true)
  }

  const handleFollows = () => {
    if (checkPermissionFollow) {
      toast.warning("You are already the owner/collaborator");
      return
    }
    const formData = new FormData()
    formData.append("mapId", parseInt(currentRootMap))
    dispatch({
      type: SAVE_FOLLOW_MAP_REQUEST,
      payload: formData,
      data: {
        mapId: currentRootMap,
        pageNumber: viewMap.posts ? viewMap.posts.page : 1,
      },
      isRefresh: true,
    })
  }

  const renderButtonAddNode = () => {
    return (
      <>
        {
          // (
          //   !(dataMindMap.privacyName === 'Private' || dataMindMap.privacyName === 'Closed') ||
          //   !(dataMindMap.mapPermission === 'Owner')
          // ) &&
          <Grid item classes={{ root: classes.containerContentRight }}>
            <Grid container>
              <Grid item classes={{ root: clsx(classes.containerAddToOrtherMap, classes.mind) }}>
                <Text size="medium" color='mainColor'>{postDetail.post.postLinkCount}</Text>
                <img src={Images.icLoading} alt="ImagesLogo" className={classes.iconLogoMap} />
                <Buttons
                  classes={{
                    root: clsx(
                      classes.btnAdd,
                      checkPermissionAdd && classes.disabledBtnFollow,
                    )
                  }}
                  onClick={handleAddToOrtherMap}
                >
                  Save Post
                </Buttons>
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
            </Grid>
          </Grid>
        }
      </>
    )
  }

  const renderTitle = () => {
    return (
      <>
        <Grid container>
          <Tooltips title={postDetail.title || ''}>
            <Text classes={{ root: classes.title }}>{postDetail.title}</Text>
          </Tooltips>
        </Grid>
        <Text size="medium" classes={{ root: clsx(classes.info, !customer && classes.notAuthor) }}>Added by
          <Tooltips title={postDetail.createdBy || ''}>
            {/* Added by <span onClick={handleClickProfile}>{`${viewMap.createdBy}`}</span>{` on ${moment(viewMap.creationTime).format('DD MMM')}`} */}
            <span onClick={() => handleClickProfile(postDetail)}> {checkLongString(postDetail.createdBy, 10, 7)}</span>
          </Tooltips>
          {` on ${moment(postDetail.creationTime).format('DD MMM')}`}
        </Text>
      </>
    )
  }

  return (
    <>
      <HelmetMetaData title={postDetail.title}
        description="CortiShare"
        image=""
      ></HelmetMetaData>
      {isLoadingPost && <Loading type="map" />}
      {!isLoadingPost && postDetail && Object.keys(postDetail).length !== 0 &&
        <Grid container direction="column" classes={{ root: clsx(classes.container, classes[`${classesWidthSplit(widthSplit)}`]) }}>
          <Grid container direction="row" justify="space-between">
            <Grid container justify="space-between" wrap="nowrap" classes={{ root: classes.containerHeader }}>
              <Grid item classes={{ root: classes.containerHeaderContent }}>
                <Grid container wrap="nowrap" justify="space-between" classes={{ root: classes.containerContent }}>
                  <Grid item classes={{ root: classes.containerContentLeft }}>
                    <Grid container direction="column" classes={{ root: classes.containerHeaderLeft }}>
                      {/* <Text container direction="row" size="medium" classes={{ root: classes.postTitle }}> */}
                      <div className={classes.subTitle}>
                        <span>Post:</span>
                        <BreadcrumbsCustom classNameCustom="customBreadcrumb" data={formatArrayBreadCrumb(breadcrumbs)} type='breadcrumbPost' />
                      </div>
                      {/* </Text> */}
                      {/* Post:<BreadcrumbsCustom data={formatArrayBreadCrumb(breadcrumbs)} type='breadcrumbPost'/> */}
                      {widthSplit > 600 &&
                        <Grid container>
                          {renderTitle()}
                        </Grid>
                      }
                    </Grid>
                  </Grid>
                  {widthSplit > 600 &&
                    // <Hidden xsDown>
                    renderButtonAddNode()
                    // </Hidden>
                  }
                </Grid>
              </Grid>
              <Grid item classes={{ root: classes.containerHeaderIcon }}>
                {customer &&
                  <>
                    {
                      postDetail && postDetail.url ?
                        <div className={classes.icLinkPost}>
                          <ClickAway postDetail={postDetail} />
                        </div>
                        : null
                    }
                    <Grid item classes={{ root: clsx(classes.containerDropdown, checkPermission && customer ? classes.containerShare : classes.containerDropdownMind) }} >
                      <Modal
                        isFollow={true}
                        listShare={listShare}
                        item={{
                          id: customer ? (viewMap && viewMap.id) : (postDetail && postDetail.postId),
                          title: customer ? (viewMap && viewMap.title) : (postDetail && postDetail.title),
                        }}
                        type={'share'}
                      />
                    </Grid>
                    {checkPermission && postOwner ?
                      <>
                        <Grid item classes={{ root: classes.containerDropdown }} >
                          <Modal
                            isFollow={true}
                            listDropDown={listDropDown}
                            type={'dropdown'}
                          />
                        </Grid>
                      </>
                      : ''
                    }
                  </>
                }
              </Grid>
            </Grid>
          </Grid>
          {widthSplit <= 600 &&
            <Grid container classes={{ root: classes.containerTitleMobile }}>
              {renderTitle()}
            </Grid>
          }
          {widthSplit <= 600 &&
            // <Hidden smUp>
            <Grid container classes={{ root: clsx(classes.containerAddMobile) }}>
              {renderButtonAddNode()}
            </Grid>
            // </Hidden>
          }
          {postDetail.post.postMedias.length && postDetail.post.postMedias[0].contentType === 'Website/Video URL' && postDetail.post.postMedias[0].pathUrl ?
            <VideoCustom data={postDetail.post.postMedias} />
            :
            <SliderCustom data={postDetail.post.postMedias} url={postDetail.url}/>
          }
          <Grid classes={{ root: classes.containerBottom }}>
            {postDetail.post.description && postDetail.post.description !== '<p><br></p>' &&
              <div dangerouslySetInnerHTML={{ __html: postDetail.post.description }} className="ql-editor"></div>
            }
            <Text classes={{ root: classes.info }}>{totalCountComment} {totalCountComment > 1 ? 'Comments' : 'Comment'}</Text>

            {customer && <Grid>
              <Grid container classes={{ root: classes.commentUser }} alignItems="center" justify="space-between">
                <Grid item xs={1}>
                  <Avatars />
                </Grid>
                <Grid item xs={8}>
                  <input value={commentValue} className={classes.input} placeholder="Write comments" onChange={handleChange} />
                </Grid>
                <Grid item xs={2}>
                  <Button classes={{ root: classes.buttonPost }} disabled={loadingComment || !!errorComment} onClick={handleAddComment}>Post</Button>
                </Grid>
              </Grid>
              <Grid className={classes.textError}>
                {errorComment && errorComment}
              </Grid>
            </Grid>
            }

            <Grid classes={{ root: classes.containerComment }}>
              {comments && comments &&
                comments.map((item, idx) => {
                  if (comments.length === idx + 1) {
                    return (
                      <Grid ref={lastCommentRef} key={idx} classes={{ root: classes.comment }}>
                        <Avatar src={item.profilePicture} alt="" classes={{ root: classes.avatar }} />
                        <Grid container classes={{ root: classes.commentInfo }} alignItems="center">
                          <Text size="mini">{item.customerFullName}</Text>
                          <Text size="mini">{item.content}</Text>
                          <Text size="mini">{moment(item.creationTime).format('DD MMM YYYY, hh:mma')}</Text>
                        </Grid>
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid key={idx} classes={{ root: classes.comment }}>
                        <Avatar src={item.profilePicture} alt="" classes={{ root: classes.avatar }} />
                        <Grid container classes={{ root: classes.commentInfo }} alignItems="center">
                          <Text size="mini">{item.customerFullName}</Text>
                          <Text size="mini">{item.content}</Text>
                          <Text size="mini">{moment(item.creationTime).format('DD MMM YYYY, hh:mma')}</Text>
                        </Grid>
                      </Grid>
                    )
                  }
                })
              }
              <Grid className={classes.commentLoadingSection}>
                {loadingComment && <LoadingIconMore />}
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      }
      {isOpenDialogConfirmDelete && <DialogConfirmDeletePost open={isOpenDialogConfirmDelete} onClose={handleCloseDialogDelete} confirm={handleRemovePost} isPostOwner={postOwner} />}
      {isOpenAddPostToOtherMap && <SelectExistingMap openSelectExistingMap={isOpenAddPostToOtherMap} handleClose={() => setIsOpenAddPostToOtherMap(false)} type="post" />}
      {openDialogViewing && <ContinueViewing open={openDialogViewing} />}
      {isOpenMovePost &&
        <MovePost
          openMovePost={isOpenMovePost}
          handleClose={() => setIsOpenMovePost(false)}
          itemData={postDetail.post}
        // type="post"
        // formData={formData}
        // description={description}
        // fileServerDelete={fileServerDelete}
        />
      }
    </>
  );
})

export default connect()(Post);