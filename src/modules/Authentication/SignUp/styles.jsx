import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    container: {
      width: 718,
      height: '100%',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      [theme.breakpoints.down("sm")]: {
        width: 500,
        height: '-webkit-fill-available',
      },
      [theme.breakpoints.down("xs")]: {
        margin: 'unset',
        width: '100%',
        borderRadius: 'unset',
        height: '-webkit-fill-available',
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
      marginTop: 20,
      marginRight: 20,
      float: 'right',
      cursor: 'pointer',
    },
    textHeader: {
      fontSize: '20px',
      marginBottom: '12px',
    },
    //login
    layoutLogin: {
      // height: '100%',
    },
    layoutContainer: {
      height: '90%',
      width: '60%',
      [theme.breakpoints.down("sm")]: {
        width: '80%',
      }
    },
    layoutFooter: {
      margin: '50px 0',
      // height: '12%',
      textAlign: 'center',
    },
    containerLogoLogin: {
      // width: '80%',
      width: 287,
      margin: '0 auto',
      padding: '20px 0 50px',
      [theme.breakpoints.down("xs")]: {
        width: 227,
      }
    },
    formLogin: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '15%',
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
    },
    containerButton: {
      marginBottom: '32px',
      '& > p': {
        opacity: 0.5
      },
      '& > button': {
        marginTop: '25px',
      }
    },
    rootLabelRadio: {
      '&.MuiFormControlLabel-root': {
        alignItems: 'flex-start',
      }
    },
    rooCheckbox: {
      paddingTop: 0,
    },
    errorSection: {
      padding: 20,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: themeConfig.privateColor,
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
    termAndConditions: {
      color: themeConfig.mainColor,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    textLink: {
      color: '#0070C9'
    },
    containerText: {
      width: '247px',
      height: '46px',
    }
  }),
  {
    name: 'SignUp',
    index: 1,
  }
);

export default useStyles;
