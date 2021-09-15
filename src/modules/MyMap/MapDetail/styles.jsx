import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';
import Images from 'config/images'

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    containerMap: {
      position: 'relative',
      width: '100%',
      height: 'calc(var(--vh, 1vh) * 100 - 68px)'
    },
    hidden: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    imgBackground: {
      width: '100%',
      pointerEvents: 'none',
    },
    doNotPermission: {
      // filter: 'blur(10px)',
      opacity: 0,
      pointerEvents: 'none',
    },
    left: {
      // padding: '20px 50px',
      height: '100%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar':{
        display: 'none'
      }
    },
    noScroll: {
      overflow: 'hidden',
    },
    navigation: {
      marginLeft: '5%',
    },
    containerTitle: {
      '& > p': {
        color: theme.grayColor,
      },
      '& > p:nth-child(2)': {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
      }
    },
    description: {
      width: '90%',
      marginTop: '3%',
      marginBottom: '2%',
    },
    tags: {
      marginBottom: '3%',
      '& > button': {
        marginRight: '10px',
      }
    },
    icon: {
      position: 'absolute',
      right: -12,
      top: '50%',
      zIndex: 1,
    },
    right: {
      height: '100%',
      background: '#f6f6f6',
    },

    //splitPane
    splitPane: {
      // '& .Pane2': {
      //   height: '100%'
      // },
      // position: 'unset !important',
      '& > div:last-child': {
        background: theme.lightGray,
      },
      '& > span.Resizer': {
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1,
        '-moz-box-sizing': 'border-box',
        '-webkit-box-sizing': 'border-box',
        'box-sizing': 'border-box',
        '-moz-background-clip': 'padding',
        '-webkit-background-clip': 'padding',
        backgroundClip: 'padding-box',
        '&:hover': {
          '-webkit-transition': 'all 2s ease',
          transition: 'all 2s ease',
        },
        '&.vertical': {
          // // cursor: `url(${Images.icMoveHorizontal}), auto`,
          width: '14px',
          margin: '0 -7px',
          borderLeft: '7px solid rgba(255, 255, 255, 0)',
          borderRight: '7px solid rgba(255, 255, 255, 0)',
          cursor: 'col-resize',
        },
        '&.vertical:hover': {
          borderLeft: '7px solid rgba(0, 0, 0, 0.5)',
          borderRight: '7px solid rgba(0, 0, 0, 0.5)',
        },
        '&.disabled': {
          cursor: 'not-allowed',
        },
        '&.disabled:hover': {
          borderColor: 'transparent',
        },
      }
    },
    linkMapMobile: {
      width: 134,
      height: 37,
      background: theme.mainColor,
      borderRadius: '20px 20px 0px 0px',
      cursor: 'pointer',
      '& > img': {
        transform: 'rotate(90deg)',
      },
      position: 'fixed',
      right: 0,
      top: '50%',
      zIndex: 100,
      // "-ms-transform": "rotate(20deg)",
      transform: "rotate(-90deg) translate(10px, 49px)",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textLinkMap: {
      fontWeight: 500,
      fontSize: 18,
      color: theme.title,
      marginLeft: 10,
    },
    wrapperMapToolBar: {
      marginLeft: 'auto',
      overflowX: 'auto',
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%'
      },
    }
  }),
  {
    name: 'MapDetail',
    index: 1,
  }
);

export default useStyles
