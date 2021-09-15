import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    formLogin: {
      width: '100%'
    },
    fullWidth: {
      width: '100%'
    },
    avatar: {
      width: 152,
      height: 152,
      marginBottom: 15
    },
    deactiveAccount: {
      fontSize: '17px !important'
    },
    btn: {
      background: 'white',
      color: themeConfig.mainColor,
      borderColor: themeConfig.mainColor,
      padding: '8px 20px',
      textTransform: 'none',
      borderRadius: 5,
      '&:hover': {
        background: themeConfig.mainColor,
        color: 'white',
      },
    },
    paymentDescription: {
      color: '#000!important',
      marginLeft: 10,
      cursor: 'auto!important'
    },
    payment: {
      paddingBlock: 15,
      width: 264,
      alignSelf: 'center',
      marginTop: 23,
      '@media only screen and (max-width: 768px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    btnChange: {
      fontWeight: 'bold',
      background: '#DE4C73',
      color: '#FFF'
    },
    btnAccount: {
      background: '#ECECEC',
      color: 'black',
      fontWeight: 'bold',
      padding: '8px 18px'
    },
    paymentSection: {
      '@media only screen and (max-width: 768px)': {
        marginTop: '30px'
      },
    },
    containerButton: {
      '@media only screen and (min-width: 768px)': {
        '& > button': {
          width: '140px',
        }
      },
      '& > button': {
        fontSize: 14,
        marginBottom: 15,
      }
    },
    containerBilling: {
      borderTop: '1px solid #B5B5B5',
      // padding: '3% 0 15%',
      paddingTop: 23
    },
    description: {
      fontSize:16
    },
    itemBilling: {
      marginTop: 10,
      padding: '20px 30px',
      background: 'white',
      boxShadow: '0px 4px 15px rgba(160, 160, 160, 0.25)',
      borderRadius: '15px',
      position: 'relative',
      zIndex: 2
    },
    containerItem: {
      borderTop: '1px solid #B5B5B5',
      padding: '3% 0 20px',
    },
    nextBilling: {
      // left: 0,
      top: -17,
      zIndex: 1,
      position: 'relative',
      padding: '40px 30px 28px',
      background: '#F4F4F4',
      marginBottom: 63,
      borderRadius: '10px',
      '& > p:first-child > span': {
        fontWeight: 'bold',
        color: 'black'
      }
    },
    paymentLeft: {
      width: '90%',
      '& > img': {
        marginRight: 10,
      }
    },
    nextBillingLeft: {
      '@media only screen and (max-width: 768px)': {
        width: '60%'
      },
      width: '80%'
    },
    timeInvoices: {
      '& > span': {
        color: '#000000',
        cursor: 'unset',
        fontWeight: 'bold',
      }
    },
    nextBillingRight: {
      width: '20%',
      textAlign: 'right',
      '@media only screen and (max-width: 768px)': {
        width: '35%'
      },
    },
    close: {
      cursor: 'pointer',
    },
    formInput: {
      '&:active': {
        background: 'rgba(196, 196, 196, 0.5)',
      },
      '&:focus': {
        background: 'rgba(196, 196, 196, 0.5)',
      },
      background: 'rgba(196, 196, 196, 0.1)',
      outline: 'none',
      border: 'none',
      padding: '24px 30px',
      width: '100%',
      borderRadius: 5,
      boxSizing: 'border-box'
    },
    formGroup: {
      width: '100%',
      overflow: 'hidden',
      marginBottom: 63,
    },
    formLabel: {
      fontSize: 18,
      color: '#000000'
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: theme.privateColor,
    },
    billingLink: {
      cursor: 'pointer'
    },
    resizeNone: {
      resize: 'none'
    },
    typeBilling: {
      textTransform: 'capitalize'
    }
  }),

  {
    name: 'EditProfile',
    index: 1,
  }
);

export default useStyles;
