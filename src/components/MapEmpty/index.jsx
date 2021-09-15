import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { Buttons, Text, PopupUpgrade } from 'components'
import CreateMap from 'modules/Home/CreateMap'
import clsx from 'clsx';
import { checkPaymentStatus } from 'helpers'
import { useSelector } from 'react-redux';

const MapEmpty = ({ 
  isProfile,
  isCreate,
  content,
  title,
  isFollowing,
  handleClickDiscoverMaps,
}) => {
  const classes = useStyles();
  const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const info = useSelector((state) => state.profile.info)
  const payment = useSelector((state) => state.profile.payment)
  const maps = useSelector((state) => state.profile.maps)

  const handleClickCreateMap = () => {
    if ([0,2,4].includes(checkPaymentStatus({ customer: info, payment: payment })) && maps.length >= 1) {
      handleOpenUpgrade();
    } else {
      setIsOpenCreateMap(true)
    }
  }

  const handleCloseCreateMap = () => {
    setIsOpenCreateMap(false)
  }

  // Upgrade Plan
  const handleOpenUpgrade = () => {
    setIsOpenUpgrade(true)
  }

  const handleCloseUpgrade = () => {
    setIsOpenUpgrade(false)
  }

  return (
    <Grid container classes={{ root: classes.container }}>
      {!!title && <Text classes={{ root: classes.text }} size="large">{title}</Text>}
      <Grid container justify="center" alignItems="center" direction="column" classes={{ root: clsx(classes.mapEmpty, isProfile && classes.isProfile) }}>
        <img src={Images.icMapEmpty} alt="" className={classes.image} />
        <p className={classes.description}>{content || "You don’t have any Boards yet"}</p>
        {isCreate && <Buttons btnType="medium" onClick={handleClickCreateMap}>Create Board</Buttons>}
        {isOpenCreateMap && <CreateMap openCreateMap={isOpenCreateMap} handleClose={handleCloseCreateMap} />}
        {!!isFollowing && isFollowing && <Buttons btnType="medium" onClick={handleClickDiscoverMaps}>Discover Boards</Buttons>}
        {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
      </Grid>
    </Grid>
  )
}

export default MapEmpty;
