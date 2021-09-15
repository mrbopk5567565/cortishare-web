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
    containerForm: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
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
    },
    show: {
      opacity:0,
      width:0,
      height:0,
      transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s',
      background: 'red',
    },
    show1: {
      width:100,
      height:100,
      transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
      opacity: 1,
      background: 'red',
    },
    show2: {
      width:100,
      height:300,
      transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
      opacity: 1,
      background: 'red',
    },
    root: {
    },
    // container: {
    //   display: 'flex',
    //   justifyContent: 'center',
    // },
    maintitle: {
      fontSize: 45,
      lineHeight: '75px',
      textAlign: 'center',
      color: '#000',
      margin: '20px 0',
      [themeDefault.breakpoints.down('sm')]: {
        fontSize: 36,
      },
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 30,
        lineHeight: 'unset'
      }
    },
    logo: {
      height: 40,
      cursor: 'pointer',
    },
    containerBody: {
      width: 600,
      height: 500,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      '&:first-child': {
        paddingTop: 0
      },
      [themeDefault.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        height: 'unset'
      }
    },
    //post popup
    iconClose: {
      position: 'absolute',
      right: 0,
      top: 23,
      cursor: 'pointer',
    },
    layoutLeft: {
      background: 'white',
      borderRadius: '15px 0px 0px 15px',
      width: 300,
      height: 450,
      padding: '30px 10px 32px',
      [themeDefault.breakpoints.down('sm')]: {
        width: 270,
      },
      [themeDefault.breakpoints.down('xs')]: {
        height: 350,
        width: 300,
        borderRadius: 15,
        marginBottom: 20,
      },
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
      '& > p': {
        '&:first-child': {
          fontWeight: 'bold',
        }
      },
      '& > div': {
        '& > p': {
          // width: '50%',
          textAlign: 'center',
        },
      },
    },
    price: {
      width: 'fit-content',
      // textAlign: 
      fontSize: 35,
      margin: 0,
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      '& > span': {
        fontSize: 20,
      }
    },
    layoutRight: {
      position: 'relative',
      borderRadius: '15px 15px 15px 15px',
      width: 335,
      height: 500,
      padding: '70px 10px 30px',
      background: theme.mainColor,
      [themeDefault.breakpoints.down('sm')]: {
        width: 300,
      },
      [themeDefault.breakpoints.down('xs')]: {
        height: 400,
        width: 335,
      },
      '& > div': {
        '& > p': {
          color: 'white',
          // width: '50%',
          textAlign: 'center',
        },
        '& > img': {
          marginBottom: 10
        }
      },
      '& > p': {
        textAlign: 'center',
        color: 'white',
        '&:first-child': {
          fontWeight: 'bold',
        }
      },
      '&::before': {
        zIndex: 1,
        content: '" "',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 56,
        height: 55,
        clear: 'both',
        background: 'linear-gradient(to top right,transparent 50%,#FFC700 50%)',
        borderTopRightRadius: 15,
      },
      '&::after': {
        content: '" "',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 28,
        height: 28,
        clear: 'both',
        zIndex: 2,
        background: 'linear-gradient(to top right,transparent 50%,#0070C9 50%)',
        borderTopRightRadius: 15,
      },
    },
    layoutLogin: {
      marginTop: '12%',
    },
    layoutContainer: {
      width: '80%',
    },
    title: {
      color: '#666',
      fontSize: 18
    },
    btn: {
      lineHeight: 0,
      background: '#fff',
      color: '#0070C9',
      width: 240,
      fontSize: 20,
      height: 50,
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    signUp: {
      display: 'flex',
      alignContent: 'center',
      fontSize: 20,
      color: '#0070C9',
      cursor: 'pointer'
    },
    iconSignUp: {
      marginLeft: 5
    },
    mainContent: {
      padding: 15,
      [themeDefault.breakpoints.down('xs')]: {
        overflow: 'auto',
      }
    },
    unlimited: {
      background: '#E5F1F4',
      borderRadius: 10,
      padding: '11px 23px',
      marginBottom: 23,
      '& > p': {
        fontWeight: 'bold'
      }
    },
    rootFormControl: {
      '& > div > svg': {
        position: 'absolute',
        top: '4px',
        right: '0px',
        pointerEvents: 'none',
      }
    },
    rootSelectFocus: {
      width: 143,
      color: theme.mainColor,
      paddingRight: '0 !important',
      fontSize: 16,
      fontWeight: 'bold',
      '&:focus': {
        backgroundColor: 'unset',
      }
    },
    //payment
    inputBase: {
      '& .__PrivateStripeElement': {
        top: 17
      },
      '&:focus': {
        outline: 'none'
      },
      paddingLeft: 15,
      paddingRight: 36,
      fontSize: 18,
      width: 'calc(100% - 50px)',
      height: 51,
      borderRadius: 5,
      background: theme.inputGrey,
      border: 'none',
      // opacity: 0.1
    },
    groupInput: {
      marginBottom: 35
    },
    dialogSection: {
      zIndex: 10000,
    },
    error: {
      fontSize: 14,
      color: '#DE4C73',
      marginTop: 10,
    },
    parent: {
      position: 'relative'
    },
    visaInput: {
      position: 'absolute',
      right: 22,
      top: 19
    },
    visaGrey: {
      position: 'absolute',
      right: 0,
      top: -8,
    },
    buttonClose: {
      [themeDefault.breakpoints.down('xs')]: {
        top: 15,
        right: 15,
      },
      position: 'absolute',
      top: 30,
      right: 97,
      '& > img': {
        width: 29,
      }
    },
    // error: {
    //   color: 'red'
    // },
    imgInfo: {
      marginLeft: 6
    },
    secureForm: {
      background: theme.mainColor,
      borderRadius: 10,
      position: 'relative',
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    textSecure: {
      fontSize: 17,
      fontFamily: theme.CircularTT_Bold,
      color: '#FFFFFF',
    },
    lockForm: {
      top: '50%',
      right: 10,
      position: 'absolute',
      transform: 'translateY(-50%)',
      width: 24,
    },
    secureCredit: {
      marginBottom: 25,
    },
    lockCredit: {
      width: 69,
    },
    textSecureCredit: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 13,
      color: '#000000',
    },
    containerFooter: {
      marginTop: 100,
      width: '90%',
      [themeDefault.breakpoints.down("sm")]: {
        width: '60%',
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: '90%',
      },
    },
    containerImage1: {
      marginBottom: 20,
      '& img': {
        width: 125,
      }
    },
    textFooter: {
      marginBottom: 20,
      fontSize: 15,
      textAlign: 'center',
    },
    containerImage23: {
      '& img': {
        maxWidth: '50%'
      }
    },
  }),
  {
    name: 'Payment',
    index: 2,
  }
);

export default useStyles;

// show: {
//   opacity:0,
//   width:0,
//   height:0,
//   transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s',
//   background: 'red',
// },
// show1: {
//   width:100,
//   height:100,
//   transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
//   opacity: 1,
//   background: 'red',
// },
// show2: {
//   width:100,
//   height:300,
//   transition: 'width 0.5s, height 0.5s, opacity 0.5s 0.5s',
//   opacity: 1,
//   background: 'red',
// },
