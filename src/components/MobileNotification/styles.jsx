import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    container: {
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
      width: 630,
      height: '100%',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
      position: 'relative',
    },
    containerBody: {
      padding: 0,
      width: '100%',
      '&:first-child': {
        padding: 0,
      },
      height: window.innerHeight,
      overflow: 'auto'
    },
    layoutLogin: {

    },
    icClose: {
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(-50%,-50%)'

    },
    HeaderFixed: {
      position: 'absolute',
      top: 0,
      height: 80,
      width: "100%",
      zIndex: 1000000,
      background: 'white',
      display: 'flex',
      alignItems: 'center'

    },
    HeaderSection: {
      position: 'relative',
      width: '80%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    HeaderTitle: {
      fontSize: 18,
      lineHeight: '21px',
      fontFamily: 'CircularTT-Bold!important',
    },
    dropdown: {
      // position: 'absolute',
      // right: 0,
      // top: 40,
      marginTop: 80,
      background: 'white',
      boxShadow: '0px 4px 4px rgba(202, 202, 202, 0.25)',
      borderRadius: 5,
      // padding: '30px 0 40px',
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      zIndex: 3,
      '& > p': {
        marginBottom: 20,
      },
      color: 'black'
    },
    containerText: {
      position: 'fixed',
      top: '50%',
      right: 0,
    },
    containerInfo: {
      marginLeft: 10,
      '& > p:nth-child(1), & > p:nth-child(2)': {
        fontWeight: 'bold',
      }
    },
    avatar:{
      width: 59,
      height: 59
    },
    itemSection: {
      borderRadius: 5,
      padding: '15px 20px',
      marginBottom: 12,
    },
    read: {
      background: '#FAFAFA',
    },
    unread: {
      background: '#E5F1FA'
    },
  }),
  {
    name: 'MobileNotification',
    index: 1,
  }
);

export default useStyles;
