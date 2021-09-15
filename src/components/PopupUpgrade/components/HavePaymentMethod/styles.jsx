import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeConfig) =>
  createStyles({
    itemBilling: {
      marginTop: 10,
      padding: '20px 30px',
      background: 'white',
      boxShadow: '0px 4px 15px rgba(160, 160, 160, 0.25)',
      borderRadius: '15px',
      position: 'relative',
      zIndex: 2
    },
    paymentSection: {
      '@media only screen and (max-width: 768px)': {
        marginTop: '30px'
      },
    },
    paymentLeft: {
      width: '90%',
      '& > img': {
        marginRight: 10,
      }
    },
    changeCredit: {
      paddingBlock: 15,
      width: 264,
      alignSelf: 'flex-end',
      marginTop: 23,
      '@media only screen and (max-width: 768px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    payment: {
      paddingBlock: 15,
      width: 200,
      alignSelf: 'flex-end',
      marginTop: 23,
      background: theme.mainColor,
      '&:hover': {
        background: 'white',
        color: theme.mainColor,
      },
      '@media only screen and (max-width: 768px)': {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    close: {
      cursor: 'pointer'
    },
    btn: {
      background: 'white',
      color: themeConfig.mainColor,
      borderColor: themeConfig.mainColor,
      padding: '10px 20px',
      textTransform: 'none',
      borderRadius: 5,
      '&:hover': {
        background: '#0070C9!important',
        color: 'white',
      },
    },
  }),
  {
    name: 'HavePaymentMethod',
    index: 1,
  }
);

export default useStyles;
