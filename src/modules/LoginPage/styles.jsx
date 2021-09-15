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
      marginBottom: 150,
      [themeDefault.breakpoints.down("sm")]: {
        width: '60%',
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: '90%',
      },
    },
    layoutFooter: {
      background: '#ffffff',
      [themeDefault.breakpoints.down("sm")]: {
      }
    },
    containerLogoForm: {
      marginBottom: 70,
      '& > img': {
        width: 227,
      }
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
    containerButton: {
      display: 'flex',
      alignItems: 'center',
      "@media (max-width:648px)": {
        top: '22%',
        right: '2%'
      },
    },
    buttons: {
      width: 110,
      height: 40,
      background: theme.mainColor,
      borderRadius: 5,
      color: '#FFFFFF',
      textTransform: 'initial',
      fontSize: 16,
      '&:hover': {
        color: '#FFFFFF',
        background: theme.mainColor,
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: 80,
      }
    },
    textLink: {
      color: '#0070C9'
    },
  }),
  {
    name: 'Public',
    index: 2,
  }
);

export default useStyles;
