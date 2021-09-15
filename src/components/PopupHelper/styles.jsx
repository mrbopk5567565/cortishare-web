import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    helperDialogWrapper: {
      [themeDefault.breakpoints.down('sm')]: {
        padding: 'unset',
      },
      padding: 30,
      '& .MuiBackdrop-root': {
        backgroundColor: 'unset'
      }
    },
    paperWrapper:{
      textAlign: 'center'
    },
    logoHelper: {
      width: 270,
      height: 60
    },
    btnDismiss:{
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
      width: 150,
      border: 'unset',
      backgroundColor: 'unset',
      cursor: 'pointer',
      marginLeft: 'auto',
      marginRight: 10
    },
    btnPlay: {
      width: 60,
      height: 60,
      opacity: 0.8,
      // animation: `$myEffectDisable 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    // btnPause: {
    //   width: 60,
    //   height: 60,
    //   animation: `$myEffectDisable 1000ms ${theme.transitions.easing.easeOut}`,
    // },
    playerSection: {
      position: 'relative',
      '& >div': {
        with: '100%!important'
      }
    },
    loadingSection: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: '#fff',
      width: '100%',
      height: '100%',
      zIndex: 1000
    },
    '.btnPlaySection::hover': {
      '& > .btnPause': {
        display: 'block'
      }
    },
    btnPlaySection: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer'
    },
    "@keyframes myEffect": {
      "0%": {
        display: 'none',
        opacity: 0,
        transform: 'scale(1)',
        'animation-play-state': 'paused'
      },
      "25%": {
        opacity: 0.2,
        transform: 'scale(1.1)',
      },
      "50%": {
        opacity: 0.4,
        transform: 'scale(1.2)',
      },
      "75%": {
        opacity: 0.6,
        transform: 'scale(1.3)',
      },
      "100%": {
        opacity: 0.8,
        transform: 'scale(1.4)',
      }
    },
    "@keyframes myEffectDisable": {
      "0%": {
        opacity: 1,
        transform: 'scale(1)',
      },
      "25%": {
        opacity: 0.8,
        transform: 'scale(1.4)',
      },
      "50%": {
        opacity: 0.6,
        transform: 'scale(1.6)',
      },
      "75%": {
        opacity: 0.4,
        transform: 'scale(2)',
      },
      "100%": {
        opacity: 0,
      }
    },
  })
);

export default useStyles;
