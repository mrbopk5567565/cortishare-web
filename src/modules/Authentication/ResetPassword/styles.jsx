import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    layoutLogin: {
      background: 'white',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      overflowY: 'scroll'
    },
    layoutContainer: {
      height: '100%',
      width: '65%',
      marginTop: '10%',
      [theme.breakpoints.down("xs")]: {
        height: '-webkit-fill-available',
        minHeight: 600,
        marginTop: '25%',
      },
    },
    layoutFooter: {
      paddingBottom: 20
    },
    containerLogoLogin: {
      height: '80%',
    },
    formLogin: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 350,
      height: '60%',
      marginTop: 100,
      '& > p': {
        textAlign: 'center',
        marginBottom: '5%',
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: 82,
      },
    },
    btnLogin: {
      margin: '20px 0 10px'
    },
    inputLogin: {
      margin: '20px 0',
    },
    textDescription: {
      color: themeConfig.mainColor,
      cursor: 'pointer'
    },
    textFooter: {
      fontSize: 20,
      '& > span': {
        color: themeConfig.mainColor,
      }
    },
    containerButton: {
      '& > p': {
        opacity: 0.5
      }
    },
    formSection: {
      height: '80%'
    },
    formTitleSection: {
      marginBottom: 60,
      textAlign: 'center',
      fontSize: 18,
    },
    notificationButtons: {
      margin: '70px auto 0 auto',
      width: '70%',
      [theme.breakpoints.down("xs")]: {
        width: '100%',
      },
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 3,
    },
    notificationBtn: {
      color: '#0070C9',
      fontSize: 18,
      cursor: 'pointer'
    },
    textIntroduce: {
      fontSize: 16,
      color: '#333',
    },
    image: {
      width: 287,
      height: 65,
      [theme.breakpoints.down("xs")]: {
        width: 227,
        height: 51,
      },
    },
    layoutImage: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 5,
      // marginTop: 60,
    }
  }),
  {
    name: 'ResetPassword',
    index: 1,
  }
);

export default useStyles;
