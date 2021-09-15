import React, { memo, useState, useEffect } from 'react';
import useStyles from './styles';
import Images from 'config/images'
import ReactPlayer from 'react-player'
import clsx from 'clsx'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux';

const VideoCustom = memo(({ data }) => {
  const classes = useStyles();
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const [state, setState] = useState({
    url: 'https://www.youtube.com/watch?v=HwCIGIvfEBU',
    pip: false,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    isShowDuration: true,
    src: '',
    errored: false,
    imageDefault: Images.icLoading,
  })

  useEffect(() => {
    setState({
      ...state,
      src: data[0].pathUrl
    })
  }, [data[0].pathUrl])

  useEffect(() => {
    if(!state.duration) return
    setState({
      ...state,
      light: true,
      playing: true,
    })
  }, [state.duration])

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
    setState({
      ...state,
      playing: state.loop
    })
  }

  const handleDuration = (duration) => {
    setState({
      ...state,
      duration
    })
  }

  // check image was errored
  const onError = () => {
    if (!state.errored) {
      setState({
        src: state.imageDefault,
        errored: true,
      });
    }
  }

  return (
    <Grid container alignItems="center" justify="center" className={classes.root}>
      <div className={clsx(classes.containerCard, widthSplit <= 600 && classes.containerCardReponsive, !state.duration && classes.hidden)}>
        {!state.errored  ?
          <>
            {state.duration ?
              // <div className={classes.showDuration}>{format(state.duration)}</div> 
              <></>
            :
              <Grid container alignItems="center" justify="center" className={classes.isLoading} >
                <img src={Images.icLoading}/>
              </Grid>
            }
            <div className={classes.containerImage}>
              <div className={classes.lazyLoad}>
                <ReactPlayer
                  className={classes.reactPlayer}
                  width='100%'
                  height='100%'
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
                  playIcon={<img src={Images.icPlay}/>}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        enablejsapi: 1,
                      }
                    },
                  }}
                />
              </div>
            </div>
          </>
        :
          <Grid container alignItems="center" justify="center" className={classes.isLoading} >
            <img src={Images.icLoading}/>
          </Grid>
        }
      </div>
    </Grid>
  );
})

export default VideoCustom;