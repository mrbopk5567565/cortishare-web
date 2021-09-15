import React, { useState, useEffect, useRef } from 'react';
import { Grid, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Loading, LayoutMap, Layout, LoadingIconMore, Tooltips, Text } from 'components'
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx'
import { handleCutText } from 'utils'
import { HANDLE_GET_INFO_REQUEST, HANDLE_FOLLOW_REQUEST } from 'redux/reducers/profile/actionTypes';
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import EditMap from 'modules/MyMap/EditMap'
import ShowMoreText from 'react-show-more-text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isAuthentication, checkLongString } from 'helpers';
import useStylesCommon from 'utils/stylesCommon';
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams()
  const showMore = useRef(null);
  const [isShowMore, setIsShowMore] = useState(false);
  const { detailProfile } = useSelector((state) => state.profile);
  const { maps, page, totalPage, size, info } = detailProfile
  const isLoading = useSelector((state) => state.global.isLoading)
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const loadingFollow = useSelector((state) => state.map.loadingFollow)
  const [flag, setFlag] = useState(false)
  const classesCommon = useStylesCommon()

  useEffect(() => {
    dispatch({
      type: HANDLE_GET_INFO_REQUEST,
      payload: {
        customerId: id,
        page: 1,
        size: 12,
      },
      onSuccess: () => setFlag(true)
    })
  }, [])

  useEffect(() => {
    if (showMore && showMore.current) {
      setIsShowMore(showMore.current.scrollHeight > 70);
    }
  }, [info, isLoading])

  const handleClickViewMore = () => {
    setIsShowMore(!isShowMore);
  }

  /* #1203 remove button follow user */
  // const handleClickFollow = (profileId) => {
  //   const onSuccess = () => {

  //     //mixPanel
  //     mixPanel.track(EventPage.FollowSomeone)

  //     dispatch({
  //       type: HANDLE_GET_INFO_REQUEST,
  //       payload: {
  //         customerId: profileId,
  //         page: page,
  //         size: size,
  //       },
  //       isNotLoadingPage: true,
  //     })
  //   }
  //   dispatch({
  //     type: HANDLE_FOLLOW_REQUEST,
  //     payload: profileId,
  //     onSuccess,
  //     isFollow: info.followed,
  //   })
  // }

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const loadMore = () => {
    dispatch({
      type: HANDLE_GET_INFO_REQUEST,
      payload: {
        customerId: id,
        page: page + 1,
        size: size,
      }
    })
  }

  return (
    <>
      {isLoading && !flag && <Loading />}
      {flag && Object.keys(info).length !== 0 &&
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={maps.length}
          next={loadMore}
          hasMore={page < totalPage}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid container classes={{ root: clsx(classes.layout) }}>
              <Grid container alignItems="center" classes={{ root: classes.container }}>
                <Avatar src={info.profilePicture} alt="" classes={{ root: classes.avatar }} />
                <Grid container item xs direction="column">
                  <Grid container>
                    <Tooltips title={info.fullName || info.userName || ''}>
                      <Text classes={{ root: classes.name }}>{checkLongString(info.fullName || info.userName, 30, 20)}</Text>
                    </Tooltips>
                  </Grid>
                  {/* #1203 remove button follow user */}
                  {/* <Grid item xs={12} sm={10} md={5} lg={4} xl={3} container alignItems="center" justify="space-between" classes={{ root: clsx(classes.containerFollow) }}>
                    <Grid container item xs={12} sm={7} classes={{ root: classes.wrapperFollow }}>
                      <Grid item xs={6}>
                        <Text classes={{ root: classes.number }}>{info.followerCount}</Text>
                        <Text classes={{ root: classes.text }}>{`${info.followerCount > 1 ? 'Followers' : 'Follower'}`}</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <Text classes={{ root: classes.number }}>{info.followingCount}</Text>
                        <Text classes={{ root: classes.text }}>{`${info.followingCount > 1 ? 'Followings' : 'Following'}`}</Text>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={5}>
                      <Grid container>
                        {!isAuthentication(info.id) && 
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={loadingFollow}
                          classes={{ root: clsx(classes.btnFollow, info.followed && classes.btnFollowed) }}
                          onClick={() => handleClickFollow(info.id)}
                        >
                          {`${info.followed ? 'Unfollow' : 'Follow'}`}
                        </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid className={classes.description}>
                {/* <div ref={showMore} className={clsx('description', isShowMore ? classes.showMore : classes.showLess)}>
                  {info.description}
                </div>
                {isShowMore && <>... <span onClick={handleClickViewMore}>View More</span></>} */}
                {info.description ?
                  <ShowMoreText
                    lines={2}
                    more="View More"
                    less="View Less"
                    keepNewLines={true}
                    expanded={false}
                    className={classes.viewMore}
                  >
                    {info.description}
                  </ShowMoreText>
                  : ''
                }
              </Grid>
              <Grid container className={clsx(
                classes.layoutMapSection,
                classesCommon.layout
              )}
              >
                <LayoutMap mapData={maps} />
              </Grid>
            </Grid>
            {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
          </Layout>
        </InfiniteScroll>
      }
    </>
  );
}

export default connect()(Profile);