import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 'fit-content',
      // marginBottom: '20px',
      breakInside: 'avoid',
      width: '100%',
      cursor: 'pointer',
      maxWidth: '100%',
      // display: 'inline-block',
      '&:hover': {
        '& $control': {
          display: 'flex',
        }
      }
    },
    isLoading: {
      // height: '150px',
      // position: 'absolute',
      // left: 0,
      // top: 0,
      height: '302px',
      position: 'absolute',
      left: -1,
      top: -1,
      width: '101%',
      background: '#FFFFFF'
    },
    containerCard: {
      position: 'relative',
      width: '100%',
      // width: 'fit-content',
      borderRadius: 10,
      boxShadow: '0px 8px 8px rgba(202, 202, 202, 0.25)',
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
    },
    containerCardVideo: {
      position: 'relative',
      // overflow: 'hidden',
    },
    control: {
      display: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
      marginTop: 7,
      zIndex: 11,
    },
    controlMobile: {

    },
    textDisable: {
      color: '#333333',
      fontSize: 14,
      cursor: 'pointer',
      '-webkit-line-clamp': '1',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      },
    },
    containerImage: {
      background: '#D7D7D7',
      borderRadius: '10px 10px 0 0',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      '& > .lazyload-wrapper': {
        width: '100%',
        display: 'contents'
      },
      '& .react-pdf__Document': {
        width: '100%',
        '& .react-pdf__Page .react-pdf__Page__svg': {
          margin: 'auto',
        },
      }
    },
    reactPlayer: {
      opacity: 1,
      '& > div': {
        borderRadius: '10px 10px 0 0',
        '& iframe': {
          borderRadius: '10px 10px 0 0',
          minWidth: '100%',
          width: '100%',
        },
      },
      '& .fb-video,div': {
        '& > span': {
          width: '100% !important',
          height: 'unset !important',
        }
      },
      '& >.react-player__preview': {
        height: '100% !important',
      }
    },
    cardContentContainer: {
      // minHeight: 90,
      padding: '18px 25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '&:last-child': {
        paddingBottom: 18,
      },
      '& .ql-editor': {
        fontSize: 14,
        color: '#333333',
        // marginBottom: 10,
        marginTop: 10,
        height: 'fit-content',
        padding: 0,
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        overflow: 'hidden',
        maxHeight: '7.5em',
        lineHeight: '1.5em',
        '& img': {
          width: '100%',
          display: 'none',
        },
        '& a': {
          textDecoration: 'none',
          color: '#333333',
          pointerEvents: 'none',
        },
        '& *:not(li):not(u)': {
          '-webkit-line-clamp': '5',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          fontSize: '14px !important',
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: 12,
        }
      },
      [theme.breakpoints.down("xs")]: {
        minHeight: 'fit-content',
      },
    },
    titleHeader: {
      // paddingTop: 10,
      // paddingBottom: 10,
    },
    content: {
      
    },
    time: {
      background: 'rgba(0, 0, 0, 0.25)',
      borderRadius: 50,
      padding: 5,
      color: 'white',
      width: 'fit-content',
      position: 'absolute',
      right: 17,
      top: 20,
      margin: 0,
    },
    image: {
      maxWidth: '100%',
      // width: '100%',
      height: 'auto',
      // objectFit: 'none',
      // borderRadius: '10px 10px 0 0',
    },
    showDuration: {
      background: 'rgba(0, 0, 0, 0.25)',
      borderRadius: '50px',
      padding: '5px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      color: '#fff',
      justifyContent: 'center',
      top: '265px',
      right: '15px',
      zIndex: 10,
    },
    showDraft: {
      background: 'rgba(0, 0, 0, 0.25)',
      borderRadius: '50px',
      padding: '5px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      color: 'red',
      justifyContent: 'center',
      top: '20px',
      left: '20px',
      zIndex: 10,
    },
    titleCard: {
      fontSize: 18,
      fontWeight: 'bold',
      cursor: 'pointer',
      '-webkit-line-clamp': '2',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      [theme.breakpoints.down("xs")]: {
        // fontSize: '14px',
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      },
    },
    previewPdf: {
      '& > canvas.react-pdf__Page__canvas': {
        maxHeight: 150,
        maxWidth: 300
      },
      '& > canvas': {
        maxWidth: '190px !important',
        maxHeight: '165px !important'

      },
      '& > react-pdf__Page__textContent': {

      }
    }
  }),
  {
    name: 'CardCustomFeed',
    index: 1,
  }
);

export default useStyles;
