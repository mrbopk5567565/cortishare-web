import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    container: {
      height: '100vh',
      overflow: 'auto',
    },
    containerLeft: {
      background: "linear-gradient(180deg, rgba(145, 202, 248, 0) 12.81%, rgba(145, 202, 248, 0.25) 67.16%, #91CAF8 141.2%)",
      position: 'relative',
      paddingBottom: 50,
    },
    containerLogo: {
      position: 'absolute',
      top: 50,
      left: 50,
      width: 287,
      // height: 65,
      [themeDefault.breakpoints.down('lg')]: {
        width: 170,
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: 120,
      },
      '& > img': {
        width: '100%',
      },
    },
    containerArtboard: {
      marginTop: 150,
      maxWidth: 773,
      width: '55%',
      [themeDefault.breakpoints.down('lg')]: {
        width: '80%',
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: '90%',
      },
      '& > img': {
        width: '100%',
      },
    },
    body: {
      marginTop: 50,
    },
    titleWorks: {
      fontSize: 36,
      fontFamily: theme.CircularTT_Bold,
      marginBottom: 23,
      textAlign: 'center',
    },
    descriptionWorks: {
      fontSize: 20,
      textAlign: 'center',
    },

    containerRight: {
      padding: '40px 0px',
      // background: "linear-gradient(180deg, rgba(145, 202, 248, 0) 12.81%, rgba(145, 202, 248, 0.25) 67.16%, #91CAF8 141.2%)",
    },
    formLogin: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto',
      marginBottom: 30,
      [themeDefault.breakpoints.down("sm")]: {
        width: '60%',
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: '90%',
      },
    },
    wellcome: {
      fontSize: 30,
      fontFamily: theme.CircularTT_Bold,
      paddingBottom: 50,
      [themeDefault.breakpoints.down("sm")]: {
        fontSize: 26,
        marginTop: 20,
      }
    },
    containerLogoForm: {
      marginBottom: 70,
      '& > img': {
        width: 227,
      }
    },
    layoutFooter: {
      textAlign: 'center',
    },
    rootLabelRadio: {
      '&.MuiFormControlLabel-root': {
        alignItems: 'flex-start',
      }
    },
    rooCheckbox: {
      paddingTop: 0,
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: theme.privateColor,
    },
    containerButton: {
      margin: '30px 0',
      '& > p': {
        opacity: 0.5
      },
      '& > button': {
        marginTop: '20px',
      },
      [themeDefault.breakpoints.down("md")]: {
        marginTop: 60,
        marginBottom: 0
      },
    },
    buttonSubmit: {
      width: 144,
      height: 49,
      padding: 'unset',
      '&:hover': {
        background: theme.mainColor,
        color: '#FFFFFF',
      }
    },
    termAndConditions: {
      color: theme.mainColor,
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
    index: 2,
  }
);

export default useStyles;
