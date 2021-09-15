import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    appBar: {
      background: 'unset',
      boxShadow: 'unset',
      padding: '0.8% 2.5% 0.8% 4%',
      marginBottom: 84,
      position: 'unset!important',
      [themeDefault.breakpoints.down("sm")]: {
        marginBottom: 20,
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0,
      '& > img': {
        width: 174,
      },
      '& > button': {
        color: 'black',
      }
    },
    root: {
      '& > button': {
        color: theme.mainColor,
        padding: '11px 53px',
        background: 'white',
        fontSize: 20,
        marginLeft: '17px',
        marginTop: '30px'
      }
    },
    buttonsContainer: {
      [themeDefault.breakpoints.down("sm")]: {
        '& >button': {
          width: '100%'
        }
      }

    },
    container: {
      // height: '80%'
      height: '80%',
      margin: '0 auto',
    },
    title: {
      fontSize: 35,
      marginTop: 25,
      color: theme.normalColor
    },
    formCheckout: {
      [themeDefault.breakpoints.down("xs")]: {
        height: '100%'
      },
      '& > div > button': {
        marginTop: '40px',
        marginBottom: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '24px 85px',
        [themeDefault.breakpoints.down("xs")]: {
          width: '100%'
        },
      },
      marginBottom: 248
    },
    base: {
      background: '#F9F9F9',
      padding: '24px 15px 24px 15px',
      fontSize: '18px',
      marginTop: 10,
      border: 'none',
      width: '100%',
      boxSizing: 'border-box',
      '&::placeholder': {
        color: theme.grayColor,
      },
      '&:focus': {
        outline: 'none'
      },
    },
    groupInput: {
      marginBottom: 23,
      marginTop: 23
    },
    invalid: {
      fontSize: '18px',
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
    }
  }),
  {
    name: 'NoPaymentMethod',
    index: 1,
  }
);

export default useStyles;
