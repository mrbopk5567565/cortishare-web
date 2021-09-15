import React, { useEffect, useState } from 'react';
import { Grid, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { LayoutMap, Layout, Loading, LoadingIconMore, Tooltips, Text } from 'components'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx'
// import { handleCutText } from 'utils'
import { HANDLE_GET_INFO_REQUEST } from 'redux/reducers/profile/actionTypes';
import { toast } from 'react-toastify';
import { SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import EditMap from 'modules/MyMap/EditMap'
import ShowMoreText from 'react-show-more-text';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStylesCommon from 'utils/stylesCommon';
import { checkLongString } from 'helpers'

const MyProfile = () => {
  const { detailProfile } = useSelector((state) => state.profile);
  const { maps, page, totalPage, size ,info } = detailProfile
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLoading = useSelector((state) => state.global.isLoading)
  const isEditMap = useSelector((state) => state.global.isEditMap)
  const [flag, setFlag] = useState(false) 
  const customer = JSON.parse(localStorage.getItem('customer'));
  const classesCommon = useStylesCommon()

  useEffect(() => {
    if (!customer || !customer.customerId) {
      toast.error('Id not found');
    } else {
      dispatch({
        type: HANDLE_GET_INFO_REQUEST,
        payload: {
          customerId: customer.customerId,
          page: 1,
          size: 12,
        },
        onSuccess: () => setFlag(true)
      })
    }
  }, [])

  const handleClickEdit = () => {
    history.push('/profile/edit')
  }

  const handleClosePopup = () => {
    dispatch({
      type: SET_IS_EDIT_MAP, payload: false
    })
  }

  const loadMore = () => {
    dispatch({
      type: HANDLE_GET_INFO_REQUEST,
      payload: {
        customerId: customer.customerId,
        // page: size != 12 ? (size/12) + 1 : page + 1,
        // size: 12,
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
                  <Grid 
                    item 
                    xs={12} sm={10} md={5} lg={4} xl={3} 
                    container 
                    alignItems="center" 
                    justify="space-between" 
                    classes={{ root: clsx(classes.containerFollow) }}
                  >
                    {/* #1203 remove button follow user */}
                    {/* <Grid container item xs={12} sm={7} classes={{ root: classes.wrapperFollow }}>
                      <Grid item xs={6}>
                        <Text classes={{ root: classes.number }}>{info.followerCount}</Text>
                        <Text classes={{ root: classes.text }}>{`${info.followerCount > 1 ? 'Followers' : 'Follower'}`}</Text>
                      </Grid>
                      <Grid item xs={6}>
                        <Text classes={{ root: classes.number }}>{info.followingCount}</Text>
                        <Text classes={{ root: classes.text }}>{`${info.followingCount > 1 ? 'Followings' : 'Following'}`}</Text>
                      </Grid>
                    </Grid> */}
                    <Grid container item xs={12} sm={5}>
                      <Grid container>
                        <Button
                          variant="outlined"
                          color="primary"
                          classes={{ root: clsx(classes.btnEditProfile) }}
                          onClick={handleClickEdit}
                        >
                          {`Edit Profile`}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.description}>
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
              <Grid 
                container 
                className={clsx(
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

export default connect()(MyProfile);