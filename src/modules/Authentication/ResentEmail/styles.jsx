import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > button': {
        background: 'white',
        color: themeConfig.mainColor,
        marginRight: 10,
        '&:hover': {
          background: themeConfig.mainColor,
          color: 'white',
        }
      }
    },
    container: {
      width: 718,
      height: 840,
      maxWidth: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      overflowY: 'hidden !important',
      [theme.breakpoints.down("xs")]: {
        margin: 'unset',
        width: '100%',
        height: '-webkit-fill-available',
        borderRadius: 'unset',
      }
    },
    paperScrollPaper: {
      [theme.breakpoints.down("xs")]: {
        maxHeight: 'unset',
      },
    },
    containerBody: {
      padding: 0,
      width: '100%',
    },
    buttonClose: {
      // position: 'absolute',
      // top: 40,
      // right: 20,
      textAlign: 'end',
      marginRight: 20,
      cursor: 'pointer',
    },
    //login
    layoutLogin: {
    },
    layoutContainer: {
      height: '90%',
      width: '60%',
      [theme.breakpoints.down("sm")]: {
        width: '80%',
        flexWrap: 'unset!important',
      }
    },
    layoutFooter: {
      // height: '12%',
      padding: '30px 0px 50px 0px',
      background: '#ffffff',
      [theme.breakpoints.down("sm")]: {
        position: 'relative',
        bottom: 0,
      }
    },
    containerLogoLogin: {
      // width: '80%',
      width: 287,
      padding: '100px 0 50px',
      [theme.breakpoints.down("xs")]: {
        // width: '80%',
        width: 227,
        paddingTop: 50,
      }
    },
    formLogin: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10%',
      overflowX: 'auto',
      marginBottom: '30%',
      [theme.breakpoints.down("sm")]: {
        marginBottom: '40%',
      }
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
      [theme.breakpoints.down("xs")]: {
        flexWrap: 'unset!important',
      },
      '& > p': {
        opacity: 0.5,
        color: '#000',
        lineHeight: '19px'
      }
    },
    errorSection: {
      padding: 20,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    buttonSubmit: {
      width: 144,
      height: 49,
      padding: 'unset',
      '&:hover': {
        background: themeConfig.mainColor,
        color: '#FFFFFF',
      }
    },
    textLink: {
      color: '#0070C9'
    }
  }),
  
);

export default useStyles;
