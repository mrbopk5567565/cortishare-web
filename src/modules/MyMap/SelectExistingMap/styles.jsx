import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    containerDialog:{
      background: '#F3F3F3'
    },
    // root: {
    // },
    // container: {
    //   width: 630,
    //   // height: 273,
    //   maxWidth: 'inherit',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderRadius: 0,
    // },
    // containerBody: {
    //   padding: 0,
    //   paddingTop: '0 !important',
    //   width: '100%',
    // },
    // //select node
    // layoutLogin: {
    //   height: '100%',
    // },
    // layoutContainer:{
    //   padding: '10% 0',
    //   width: '80%',
    // },
    // formLogin: {
    //   width: '100%',
    //   display: 'flex',
    //   flexDirection: 'column',
    // },
    // containerButton: {
    //   '& > p': {
    //     fontWeight: 'bold',
    //   },
    //   '& > button': {
    //     borderRadius: 0,
    //     padding: '20px 70px'
    //   }
    // },
    // rootSelect: {
    //   padding: '24px 30px',
    //   color: 'black',
    //   fontSize: 18,
    //   marginBottom: '5%',
    //   backgroundColor: '#F9F9F9',
    //   '&:focus': {
    //     backgroundColor: '#F9F9F9',
    //   },
    // },
    // rootFormControl: {
    //   '& > div > svg': {
    //     position: 'absolute',
    //     top: '24px',
    //     right: '24px',
    //     pointerEvents: 'none',
    //   }
    // },
    wrapperClosePopUp: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 10,
      [themeDefault.breakpoints.down("md")]: {
        top: 60,
      },
    },
    wrapperClosePopUpMobile: {
      position: 'absolute',
      top: 138,
      left: 15,
      zIndex: 10
    },
    wrapperMapToolBar: {
      // marginLeft: 'auto',
      // marginRight: 200,
      overflowX: 'auto',
      position: 'absolute',
      right: 91,
      [themeDefault.breakpoints.down("md")]: {
        right: 0,
      },
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%',
        right: 0,
      },

    },
    wrapperSelect:{
      position: 'absolute',
      zIndex: 10,
    },
    wrapperSelectMobile:{
      left: 0,
      top: 73,
      width: '100%',
      '& select': {
        width: '100% !important'
      }
    },
    wrapperSelectDesktop:{
      top: 26,
      left: 60,
      [themeDefault.breakpoints.down("690")]: {
        top: 60,
      },
    },
    selectMap: {
      width: 543,
      height: 55,
      background: '#e6e6e6',
      border: 'none',
      outline: 'none',
      color: '#000000',
      fontSize: 18,
      paddingLeft: 17,
      position: 'relative',
      cursor: 'pointer',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'appearance': 'none',
      '& option[value=""][disabled]': {
        display: 'none'
      },
      '&:required:invalid': {
        color: '#a1a1a1'
      },
      [themeDefault.breakpoints.down("sm")]: {
        width: 300,
      },
    },
    customIconSelect:{
      position: 'absolute',
      right: 18,
      top: 21,
      pointerEvents: 'none'
    },
    footerAddNode: {
      position: 'fixed',
      height: 94,
      width: '100%',
      bottom: 0,
      borderRadius: 5,
      background: theme.title,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleSelect: {
      fontSize: 18,
      color: '#B5B5B5',
      marginLeft: 60
    },
    currentPathMobile: {
      height: 40,
      marginLeft: 30
    },
    titleSelectMobile: {
      marginLeft: 30
    },
    submitBtnMobile: {
      width: '100%!important'
    },
    currentPath: {
      color: '#3990d5'
    },
    submitBtn: {
      width: 196,
      height: 66,
      background: theme.mainColor,
      color: theme.title,
      fontSize: 14,
      border: 'none',
      borderRadius: 5,
      marginRight: 34,
      cursor: 'pointer',
      '&:disabled': {
        background: 'rgba(0, 112, 201, 0.3)'
      }
    },
    wrapperEmptyMap:{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems:'center',
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    emptyMap:{
      textAlign: 'center'
    },
    titleEmpty: {
      color: theme.grayColor,
      fontSize: 22
    }
  }),
  {
    name: 'SelectExistingMap',
    index: 1,
  }
);

export default useStyles;
