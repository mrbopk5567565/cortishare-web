import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    container: {
      width: '100%',
      height: '100%',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      backgroundColor: 'unset',
      justifyContent: 'center',
      borderRadius: 0,
      boxShadow: 'none',
      position: 'relative',
      color: '#009FFF',
    },
    containerBody: {
      padding: 0,
      overflowY: 'unset',
      paddingTop: 50,
      '&:first-child': {
        padding: 0,
      },
    },
    //post popup
    iconClose: {
      [themeDefault.breakpoints.down("xs")]: {
        right: -3,
        top: 20,
      },
      position: 'absolute',
      right: 0,
      top: 0,
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.7
      }
    },
    layoutLeft: {
      background: 'white',
      borderRadius: '15px 15px 0px 0px',
      flexDirection: 'row',
      width: '95%%',
      maxWidth: 300,
      margin: '0 auto',
      padding: '30px 20px',
      '& > p': {
        '&:first-child': {
          fontWeight: 'bold',
        }
      },
    },
    priceMonth: {
      margin: 0,
      fontSize: 18,
      color: '#05111E',
      fontWeight: 'bold',
    },
    price: {
      fontSize: 20,
      margin: 0,
      fontWeight: 'bold',
      '& > span': {
        fontSize: 20,
      }
    },
    priceNumber1: {
      fontSize: 25,
      margin: '0px 25px 0px 10px',
      fontWeight: 'bold',
      color: 'black'
    },
    priceNumber2: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black'
    },
    layoutRight: {
      position: 'relative',
      width: '99%',
      margin: '0 auto',
      maxWidth: 350,
      padding: '40px 35px 30px',
      borderRadius: '15px 15px 15px 15px',
      background: theme.mainColor,
      '& > div': {
        '& > p': {
          color: 'white',
          width: '50%',
          paddingTop: '13px',
        },
        '& > img': {
          padding: '5px 20px 5px 35px'
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
    numberMaps: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    priceMonthFee: {
      color: 'white',
      textAlign: 'end'
    },
    layoutLogin: {
      marginTop: '12%',
    },
    layoutContainer: {
      width: '80%',
    },
    title: {
      color: '#666',
      fontSize: 13,
    },
    titlePlan: {
      color: '#666',
      fontSize: 12,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 13
      // color: '#009FFF'
    },
    customText: {
      fontSize: '15px',
    },
  }),
  {
    name: 'PostPopup',
    index: 1,
  }
);

export default useStyles;
