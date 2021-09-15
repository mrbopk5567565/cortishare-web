import React, { useRef, useState, useEffect} from 'react';
import { Dialog, Grid, Typography, Hidden, DialogContent, DialogActions, Button } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import ReactPlayer from 'react-player'
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import {LoadingIconMore} from 'components'
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png'

const PopupHelper = ({isopenPopup, handleClose}) =>{
  const classes = useStyles()
  const [countDown,setCountDown]= useState(20)
  const video = useRef(null);
  const [playing,setPlaying] =useState(false)
  const [loading,setLoading] =useState(true)

  const handleProgressVideo = (infoProgress) =>{
    setCountDown(20 - Math.round(infoProgress.playedSeconds))
  }
  const handleClickDismiss = () =>{
    handleClose()
  }
  const handlePlay = () => {
    video.current.getInternalPlayer().play()
    setPlaying(true)
  }
  const handlePause = () => {
    setPlaying(false)
  }
  const handleReady = () => {
    setLoading(false)
  }
  return (
    <Dialog
      open={isopenPopup}
      onClose={handleClose}
      classes={{root: classes.helperDialogWrapper, paper: classes.paperWrapper}}
      maxWidth ='md'
      className={classes.roots}
      disableBackdropClick={true}
    >
      <DialogContent>
        <img className={classes.logoHelper} src={logoTextBlackHighRes}/>
        <p className={classes.descHelper}>Welcome to CortiShare, the best place to Build, Store and Share your Knowledge Bases.</p>
        <h2 classes= {classes.titleHelper}>IMPORTANT: WATCH THIS 2 MIN TUTORIAL</h2>
         <Grid className={classes.playerSection}>
         {loading && <Grid className={classes.loadingSection}><LoadingIconMore /></Grid> }
          <ReactPlayer
            width="100%"
            height="100%"
            ref={video}
            onPause={handlePause}
            onReady={handleReady}
            onProgress = { handleProgressVideo }
            url='https://www.dropbox.com/s/6hwel569xd2hvci/Reexportlowres2.mov?dl=0' />
          <div className={classes.btnPlaySection}>
            {!playing &&
            <img onClick={handlePlay} className={classes.btnPlay} src={Images.playIcon} /> }
          </div>
          </Grid>
      </DialogContent>
      <button className={classes.btnDismiss} disabled={countDown > 0} onClick={handleClickDismiss}>
        {countDown > 0 ? countDown + ' seconds' : 'Dismiss'}
      </button>
    </Dialog>

  )
}
export default PopupHelper