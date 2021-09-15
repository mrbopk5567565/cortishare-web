import React, { memo, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Hidden,
} from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Text, Modal, PopupDeleteMap, Tooltips } from 'components'
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import placeholderBoardHigh from 'asset/img/placeholderBoardHigh.png'

const CardCustom = memo(({ item, handlePopupEdit, handleCloseEdit }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [isHover, setIsHover] = useState(false)
  const imageDefault = placeholderBoardHigh;
  const [image, setImage] = useState(item.thumbnail)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const customer = JSON.parse(localStorage.getItem('customer'))
  // const isEditMap = useSelector((state) => state.global.isEditMap)
  const matchFollowing = useRouteMatch('/following');
  const matchSearch = useRouteMatch('/search');
  const matchLinkingMinds = useRouteMatch('/search/linking-minds');


  const handleClick = () => {
    history.push(`/board/${item.id}`)
  }

  const handleClickDropdown = (type) => {
    switch (type) {
      case 'editMap':
        if (item) {
          dispatch({ type: 'GET_MAP_DETAIL_REQUEST', payload: item.id })
        } else {
          toast.success("Map ID is not found!");
        }
        break;
      case 'delete':
        if (item) {
          setOpenDialogDelete(true)
        }
        break;
      default:
        break;
    }
  }

  const listDropDown = [
    {
      label: 'Edit Board Details',
      onClick: () => handleClickDropdown('editMap'),
    },
    {
      label: 'Delete',
      onClick: () => handleClickDropdown('delete'),
    },
  ]


  const handleMouseOver = () => {
    setIsHover(true)
  }

  const handleMouseOut = () => {
    setIsHover(false)
  }

  const onError = () => {
    setImage(imageDefault)
  }

  const closeDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  // const handleClosePopup = () => {
  //   dispatch({
  //     type: SET_IS_EDIT_MAP, payload: false
  //   })
  // }

  return (
    <Card className={classes.root}>
      <Grid classes={{ root: classes.containerCard }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut}>
        <Grid container alignItems="center" justify="flex-end" classes={{ root: classes.control }}>
          <div className={classes.iconControl} >
            <Modal
              item={item}
              type={'share'}
              isHover={isHover}
              isCard={true}
            />
          </div>
          {
            (customer.customerId === item.customerId || item.permission === 'Owner' || item.permission === 'Edit') &&
            // !(matchFollowing && matchFollowing.isExact) &&
            // !(matchDiscover && matchDiscover.isExact) &&
            // !(matchLinkingMinds && matchLinkingMinds.isExact) &&
            <div className={classes.iconControl} >
              <Modal
                listDropDown={listDropDown}
                type={'dropdown'}
                isHover={isHover}
                isCard={true}
              />
            </div>
          }
        </Grid>
        <div className={classes.containerImg}>
          <CardMedia
            classes={{
              img: classes.cardMediaImg
            }}
            onClick={handleClick}
            component="img"
            alt={item.title}
            // height="150"
            src={item.thumbnail ? item.thumbnail : imageDefault}
            // image={image}
            // title={item.title}
            // onError={onError}
          />
        </div>
        <CardContent classes={{ root: classes.cardContentContainer }} onClick={handleClick}>
          <Grid container>
            <Grid container direction="row" justify="flex-start" alignItems="stretch">
              <Grid container item xs={12} sm={9} className={classes.containerTitle} justify="flex-start" alignItems="flex-end">
                <Tooltips title={item.title || ''} leaveDelay={300}>
                  <Text classes={{ root: classes.titleCard }} size="medium">{item.title} </Text>
                </Tooltips>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={12} sm={3} container justify="flex-end" alignItems="flex-end">
                  {item.privacyName !== "Private" && <Text classes={{ root: classes.privacy}}><span>{item.privacyName}</span></Text>}
                  {item.privacyName === "Private" && <Hidden xsDown><Text size="mini" classes={{ root: classes.textEmpty }}><span>{''}</span></Text></Hidden>}
                  {item.privacyName !== "Private" && <Hidden smUp><span className={classes.icDot}><img src={Images.icDotSub} /></span></Hidden>}
                </Grid>
              </Hidden>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="stretch">
              <Grid item xs={12} sm={8}
                container justify="flex-start" alignItems="flex-end" classes={{ root: classes.containerInfo }}
              >
                <Tooltips title={item.createdBy || ''} leaveDelay={300}>
                  <span className={classes.textDisable} size="mini">by {item.createdBy}</span>
                </Tooltips>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={12} sm={4} container justify="flex-end" alignItems="flex-end">
                  <Text classes={{ root: classes.privacy}}>
                    <span className={item.privacyName === "Private" ? "private" : ""}> 
                      {item.privacyName === "Private" ? item.privacyName : `${item.followerCount} followers`}
                    </span>
                  </Text>
                </Grid>
              </Hidden>
            </Grid>

            <Hidden smUp>
              <Grid container>
                <Grid item style={{ display: 'flex' }}>
                  {item.privacyName !== "Private" && <Text classes={{ root: classes.privacy}}><span>{item.privacyName}</span></Text>}
                  {item.privacyName === "Private" && <Hidden xsDown><Text size="mini" classes={{ root: classes.textEmpty }}><span>{''}</span></Text></Hidden>}
                  {item.privacyName !== "Private" && <Hidden smUp><span className={classes.icDot}><img src={Images.icDotSub} /></span></Hidden>}
                </Grid>
                <Grid item>
                  <Text classes={{ root: clsx(classes.privacy) }}>
                    <span className={item.privacyName === "Private" ? "private" : ""}>
                      {item.privacyName === "Private" ? item.privacyName : `${item.followerCount} followers`}
                    </span>
                  </Text>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </CardContent>
      </Grid>
      {openDialogDelete && <PopupDeleteMap isCard={true} item={item} openDialogDelete={openDialogDelete} closeDialogDelete={closeDialogDelete} />}
      {/* {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />} */}
    </Card>
  );
});
export default connect()(CardCustom);
