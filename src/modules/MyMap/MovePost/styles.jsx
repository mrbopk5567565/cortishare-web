import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    containerDialog:{
      background: '#F3F3F3'
    },
    wrapperClosePopUp: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 10
    },
    wrapperMapToolBar: {
      overflowX: 'auto',
      position: 'absolute',
      right: 200,
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%',
        right: 0,
      },

    },
    wrapperSelect:{
      position: 'absolute',
      top: 26,
      left: 60,
      zIndex: 10,
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
      }
    },
    customIconSelect:{
      position: 'relative',
      right: 31,
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
