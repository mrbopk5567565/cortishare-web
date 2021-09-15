import React, { useState, useEffect, useMemo } from 'react';
import { CardContent, Grid, Hidden } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Text, Tooltips, Modal } from 'components'
import ReactPlayer from 'react-player'
import LazyLoad, { forceVisible } from 'react-lazyload';
import Images from 'config/images'
import useStyles from './styles';
import { pdfjs, Document, Page } from 'react-pdf';
import placeholderPost from 'asset/img/placeholderPost.png'
import { checkLongString } from 'helpers'
import { toast } from 'react-toastify';
import { GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST } from 'redux/reducers/map/actionTypes'
import MovePost from 'modules/MyMap/MovePost';
import { useDispatch, useSelector } from 'react-redux';
import DialogConfirmDeletePost from 'modules/MyMap/DialogConfirmDeletePost'
import {
  DELETE_POST_REQUEST,
} from 'redux/reducers/node/actionTypes';

// Bug of library react-player : when call api or url youtube
/*
  Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').
  https://github.com/CookPete/react-player/issues/508
*/
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CardCustomFeed = ({ item }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const matchHome = useLocation();
  const [isHover, setIsHover] = useState(false)
  const matchMapDetail = useRouteMatch('/board/:mapId')
  const matchNodeDetail = useRouteMatch('/board/:mapId/node/:nodeId')
  const [isOpenMovePost, setIsOpenMovePost] = useState(false)
  const [isOpenDialogConfirmDelete, setIsOpenDialogConfirmDelete] = useState(false)
  const [isPostOwner, setIsPostOwner] = useState(false)
  const isBlur = useSelector((state) => state.map.isBlur)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const selectNode = useSelector((state) => state.map.selectNode)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')
  const [pageNumber, setPageNumber] = useState(1);
  const [state, setState] = useState({
    url: 'https://www.youtube.com/watch?v=HwCIGIvfEBU',
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    isShowDuration: true,
    src: item.thumbnail || item.pathUrl || placeholderPost,
    errored: false,
    imageDefault: placeholderPost,
    height: 300
  })

  useEffect(() => {
    forceVisible()
  }, [])

  useEffect(() => {
    if (!state.duration) return
    setState({
      ...state,
      light: true,
      playing: true,
    })
  }, [state.duration])

  const load = url => {
    setState({
      ...state,
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  const handlePlay = () => {
    setState({
      ...state,
      playing: true,
      isShowDuration: false
    })
  }

  const format = (seconds) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handlePause = () => {
    setState({
      ...state,
      playing: false
    })
  }

  const handleProgress = item => {
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState({
        ...state,
        item
      })
    }
  }

  const handleEnded = () => {
    setState({ ...state, playing: state.loop })
  }

  const handleDuration = (duration) => {
    setState({
      ...state,
      duration,
      height: document.getElementById(`react-player-${item.postId}`) && document.getElementById(`react-player-${item.postId}`).clientHeight
    })
  }

  const renderLoadButton = (url, label) => {
    return (
      <button onClick={() => load(url)}>
        {label}
      </button>
    )
  }

  const handleClick = (item) => {
    let mapId = currentRootMap ? currentRootMap : item.mapId
    history.push(`/board/${mapId}/post/${item.postId}`)
  }

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(numPages);
  }

  // check image was errored
  const onError = () => {
    if (!state.errored) {
      setState({
        ...state,
        src: state.imageDefault,
        errored: true,
      });
    }
  }

  const checkRouteApplyLazyLoad = () => {
    // if (matchHome.pathname === '/') return false
    // if (matchMapDetail && matchMapDetail.isExact) return false
    return true
  }

  const handleCloseDialogDelete = () => {
    setIsOpenDialogConfirmDelete(false)
  }

  const handleMovePost = () => {
    if (!isBlur) setIsOpenMovePost(true)
  }

  const handleRemovePost = () => {
    const onSuccess = () => {
      if (selectNode.root) {
        history.push(`/board/${currentRootMap}`)
      } else {
        history.push(`/board/${currentRootMap}/node/${item.parentNodeId}`)
      }
    }

    dispatch({
      type: DELETE_POST_REQUEST,
      payload: {
        postId: item.postId,
        mapId: currentRootMap,
        nodeId: item.nodeId,
      },
      onSuccess: onSuccess
    })
    setIsOpenDialogConfirmDelete(false)
  }

  const handleClickDropdown = (type, isPostOwner) => {
    switch (type) {
      case 'edit':
        history.push(`/edit-post/${item.postId}/board/${item.mapId}/node/${item.parentNodeId}`)
        break;
      case 'remove':
        setIsOpenDialogConfirmDelete(true)
        setIsPostOwner(isPostOwner)
        break;
      case 'move':
        if (!item) return
        dispatch({
          type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
          payload: {
            id: item.mapId
          }
        });
        handleMovePost();
        break;
      default:
        break;
    }
  }

  const listDropDown = useMemo(() => {
    let postOwner
    let postLinkMove
    let postLinkNotMove
    let labelDelete
    let isPostOwner
    postOwner = !item.isLinkDirectly && !item.isLinkPost
    postLinkMove = item.isLinkDirectly && item.isLinkPost
    postLinkNotMove = !item.isLinkDirectly && item.isLinkPost
    // labelDelete = postOwner ? 'Delete' : 'Remove from Board'
    if (postOwner) {
      labelDelete = 'Delete'
      isPostOwner = true
    } else if (postLinkMove) {
      labelDelete = 'Remove from Board'
      isPostOwner = false
    }
    return [
      ...(postOwner ? [{
        label: 'Edit',
        onClick: () => handleClickDropdown('edit'),
      }] : []),
      {
        label: 'Move',
        onClick: () => handleClickDropdown('move'),
      },
      ...((postLinkMove || postOwner) ? [{
        label: labelDelete,
        onClick: () => handleClickDropdown('remove', isPostOwner),
      }] : []),
    ]
  }, [item])

  const handleMouseOver = () => {
    setIsHover(true)
  }

  const handleLoadError = (error) => {
    // toast.error('Error while loading document! ' + error.message);
  }

  const handleMouseOut = () => {
    setIsHover(false)
  }

  const renderContent = () => {
    return (
      <>
        {item.contentType && item.contentType === 'Website/Video URL' ?
          !state.errored ?
            <ReactPlayer
              id={`react-player-${item.postId}`}
              className={classes.reactPlayer}
              width='100%'
              height={state.height || '100%'}
              url={state.src}
              pip={state.pip}
              playing={state.playing}
              controls={state.controls}
              light={state.light}
              loop={state.loop}
              playbackRate={state.playbackRate}
              volume={state.volume}
              muted={state.muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={handlePlay}
              onPause={handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={handleEnded}
              onError={onError}
              onProgress={handleProgress}
              onDuration={handleDuration}
              playIcon={<img src={Images.icPlay} />}
              onClickPreview={(e) => e.stopPropagation()}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    enablejsapi: 1,
                    // origin: 'http://localhost:3000',
                  }
                },
              }}
            />
            :
            <img src={state.src} className={classes.image} alt={item.title} />
          :
          (item.contentType && item.contentType === 'Pdf') ?
            <Document onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={handleLoadError} onSourceError={handleLoadError} file={state.src} renderMode="svg" >
              <Page onLoadError={handleLoadError} onSourceError={handleLoadError} pageNumber={pageNumber} width={150} height={150} />
            </Document>
            :
            <img
              onError={onError}
              src={state.src}
              alt={item.title}
              // loading="lazy"
              className={classes.image}
            />
        }
      </>
    )
  }

  return (
    <Grid classes={{ root: classes.root }} onClick={() => handleClick(item)}>
      <div
        className={clsx(classes.containerCard, item.contentType && item.contentType === 'Website/Video URL' && classes.containerCardVideo)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        {
          (
            checkPermission &&
            ((matchNodeDetail && matchNodeDetail.isExact) || (matchMapDetail && matchMapDetail.isExact)) &&
            (!item.isLinkDirectly && !item.isLinkPost) || (item.isLinkDirectly && item.isLinkPost)
          ) &&
          <Hidden xsDown>
            <Grid container alignItems="center" justify="flex-end" classes={{ root: classes.control }}>
              <div className={classes.iconControl} >
                <Modal
                  isCard={true}
                  listDropDown={listDropDown}
                  isHover={isHover}
                  type={'dropdown'}
                />
              </div>
            </Grid>
          </Hidden>
        }
        {item.isDraft &&
          <div className={classes.showDraft}>{`Draft`}</div>
        }
        {item.contentType && item.contentType === 'Website/Video URL' && state.isShowDuration && !state.errored &&
          <>
            {state.duration ?
              <div className={classes.showDuration}>{format(state.duration)}</div>
              :
              <Grid container alignItems="center" justify="center" className={classes.isLoading} >
                <img src={Images.icLoading} />
              </Grid>
            }
          </>
        }
        <div className={classes.containerImage}>
          {checkRouteApplyLazyLoad() ?
            <LazyLoad>
              {renderContent()}
            </LazyLoad>
            :
            renderContent()
          }
        </div>
        <CardContent classes={{ root: classes.cardContentContainer }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            classes={{ root: classes.titleHeader }}
            wrap="nowrap"
          >
            <Grid item>
              <Tooltips title={item.title || ''} leaveDelay={300}>
                <Text classes={{ root: classes.titleCard }} size="medium">{item.title}</Text>
              </Tooltips>
              <Tooltips title={item.fullName || item.userName || item.createdBy || ''} leaveDelay={300}>
                <span className={classes.textDisable} size="mini">by {item.fullName || item.userName || item.createdBy}</span>
              </Tooltips>
            </Grid>
            <Grid item>
              {
                (
                  checkPermission &&
                  ((matchNodeDetail && matchNodeDetail.isExact) || (matchMapDetail && matchMapDetail.isExact)) &&
                  (!item.isLinkDirectly && !item.isLinkPost) || (item.isLinkDirectly && item.isLinkPost)
                ) &&
                <Hidden smUp>
                  <Grid container alignItems="center" justify="flex-end" classes={{ root: classes.controlMobile }}>
                    <div className={classes.iconControl} >
                      <Modal
                        isCard={true}
                        listDropDown={listDropDown}
                        isHover={isHover}
                        type={'dropdown'}
                      />
                    </div>
                  </Grid>
                </Hidden>
              }
            </Grid>
          </Grid>
          {item.description && item.description !== '<p><br></p>' &&
            <Grid container>
              <div className={clsx(classes.content, 'ql-editor')} dangerouslySetInnerHTML={{ __html: item.description }}></div>
            </Grid>
          }
        </CardContent>
      </div>
      {isOpenDialogConfirmDelete &&
        <DialogConfirmDeletePost
          open={isOpenDialogConfirmDelete}
          onClose={handleCloseDialogDelete}
          confirm={handleRemovePost}
          isPostOwner={isPostOwner}
        />
      }
      {isOpenMovePost &&
        <MovePost
          openMovePost={isOpenMovePost}
          handleClose={() => setIsOpenMovePost(false)}
          itemData={item}
        />
      }
    </Grid>
  );
}
export default CardCustomFeed;