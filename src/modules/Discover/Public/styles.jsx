import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    layout: {
      position: 'relative',
      padding: '0 5%',
    },
    header: {
      padding: '1.5% 0',
      '& > img': {
        width: 174,
        '@media (max-width: 475px)': {
          width: 140,
        },
      },
    },
    body: {
      paddingTop: '2%',
    },
    containerButton: {
      display: 'flex',
      alignItems: 'center',
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
    buttonLogin: {
      background: '#FFFFFF',
      color: theme.mainColor,
      '&:hover': {
        color: theme.mainColor,
        background: '#FFFFFF',
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: 'fit-content',
        padding: 0,
      }
    },
    buttonSignup: {
      [themeDefault.breakpoints.down("xs")]: {
        // width: 'fit-content',
        padding: 0,
      },
    },
    imageArtboard: {
      width: '100%',
      [themeDefault.breakpoints.down("xs")]: {
        height: 313,
        marginTop: 40
      }
    },
    imageArtboard1: {
      width: '100%',
      [themeDefault.breakpoints.down("xs")]: {
        height: 202
      }
    },
    title: {
      [themeDefault.breakpoints.down("xs")]: {
        fontSize: 30,
        paddingTop: 73,
        lineHeight: '35px',
        paddingBottom: 10,
      },
      fontFamily: 'CircularTT-Bold!important',
      fontSize: 36,
      fontWeight: 'bold',
      margin: '0 0 10px',
    },
    introWorks: {
      fontFamily: 'CircularTT-Bold!important',
      fontSize: 36,
      lineHeight: '1.5em',
      fontWeight: 'bold',
      margin: '0 0 40px',
    },
    description: {
      textAlign: 'start',
      fontSize: 20,
      marginBottom: 50,
      lineHeight: '23px',
      [themeDefault.breakpoints.down("xs")]: {
        fontSize: 18,
        lineHeight: '21px',
      },
    },
    descriptionWorks: {
      fontSize: 17,
      lineHeight: '20px',
      textAlign: 'center'
    },
    button: {
      textTransform: 'initial',
      background: theme.privateColor,
      borderRadius: 5,
      padding: '10px 78px',
      fontSize: 14,
      color: 'white',
      '&:hover': {
        background: '#F8DEE5',
        color: theme.privateColor,
      }
    },
    bodyHead: {
      padding: '2% 5%',
      [themeDefault.breakpoints.down("md")]: {
        padding: '2% 0',
      },
      [themeDefault.breakpoints.down("sm")]: {
        padding: '1% 0',
      },
    },
    containerWorks: {
      margin: '130px 0',
      [themeDefault.breakpoints.down("md")]: {
        margin: '90px 0',
      }
    },
    bodyHeadChild: {
      padding: '2% 5%',
      background: '#F3F3F3',
      borderRadius: 10,
      width: '30%',
      [themeDefault.breakpoints.down("md")]: {
        padding: '2% 3%',
      },
      [themeDefault.breakpoints.down("xs")]: {
        padding: '5%',
        width: '100%',
        marginBottom: 27,
      },
    },
    titleWorks: {
      fontSize: 25,
      fontWeight: 'bold',
      margin: '40px 0 0',
      textAlign: 'center',
    },
    titleGaining: {
      fontFamily: 'CircularTT-Bold!important',
      [themeDefault.breakpoints.down("xs")]: {
        fontSize: 30,
        lineHeight: '35px',
      },
      marginBottom: 10,
      fontSize: 36,
      lineHeight: '42px',
    },
    contentGaining: {
      fontSize: 20,
      LineHeight: '23px',
      paddingBottom: 45,
      marginBlockStart: '0!important',
      marginBlockEnd: '0!important',

    },
    containerImage: {
      width: 160,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      [themeDefault.breakpoints.down("sm")]: {
        width: 100,
      },
    },
    imageWorks: {
      width: '100%',
    },
    containerStartGaining: {
      [themeDefault.breakpoints.up("lg")]: {
        padding: '2% 10%',
      },
      marginBottom: 238,
      '& > div > p:nth-child(2)': {
        width: '100%',
      }
    },
    containerStartGainingContent: {
      order: 0,
      '-webkit-order': 0,
      [themeDefault.breakpoints.down("xs")]: {
        padding: '50px 0 2%',
        order: 1,
        '-webkit-order': 1,
      },
    },
    containerImg: {
      order: 1,
      '-webkit-order': 1,
      [themeDefault.breakpoints.down("xs")]: {
        // padding: '50px 0 2%',
        order: 0,
        '-webkit-order': 0,
      },
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 348,
      zIndex: -1,
      color: 'rgba(0,0,0,0.6)',
      background: "linear-gradient(180deg, rgba(145, 202, 248, 0) 12.81%, rgba(145, 202, 248, 0.25) 67.16%, #91CAF8 141.2%)",
      '& > p': {
        marginBottom: 30,
      },
      [themeDefault.breakpoints.down("sm")]: {
        height: 450,
      },
    },
    resentMail:{
      color: '#000',
      opacity: 0.5,
      cursor: 'pointer',
      width: '100%',
      marginTop: 10
    }
  }),
  {
    name: 'Public',
    index: 2,
  }
);

export default useStyles;
