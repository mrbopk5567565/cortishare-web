import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    dialogPaper: {
      width: 600,
      padding: '86px 100px 60px'
    },
    dialogPaperMobile: {
      padding: '60px 20px',
      width: '100%',
      [themeDefault.breakpoints.down('xs')]: {
        padding: '70px 20px 60px',
      },
    },
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
      fontSize: 16,
      color: 'red',
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
    error: {
      color: 'red'
    },
    imgInfo: {
      marginLeft: 6
    },
    icClose: {
      position: 'relative',
      marginLeft: '97%',
      [themeDefault.breakpoints.down('xs')]: {
        marginLeft: '93%'
      },
    },
  })
)

export default useStyles;
