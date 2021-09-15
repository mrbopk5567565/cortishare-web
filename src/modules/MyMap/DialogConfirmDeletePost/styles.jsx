import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    paperDialog: {
      width: 720,
      // height: 358,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'inherit',
      borderRadius: 10,
      padding: 50,
      // [theme.breakpoints.down('md')]: {
      //   width: 500,
      // },
      [theme.breakpoints.down('xs')]: {
        width: 414,
        padding: '45px 40px',
      }
    },
    containerText: {
      color: '#333333',
      marginBottom: 40,
    },
    title: {
      textAlign: 'center',
      fontSize: 28,
      fontFamily: themeConfig.CircularTT_Bold,
      [theme.breakpoints.down('xs')]: {
        fontSize: 17,
      },
    },
    description: {
      textAlign: 'center',
      fontSize: 24,
      fontFamily: themeConfig.CircularStd_Book,
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    containerButton: {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
    buttons: {
      width: 196,
      height: 66,
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'none',
      margin: '0 16px',
      color: 'white',
      border: '1px solid #0070C9',
      borderRadius: '5px',
      fontSize: 14,
      background: themeConfig.mainColor,
      color: 'white',
      '& span': {
        fontFamily: themeConfig.CircularTT_Bold,
      },
      '&:hover': {
        background: themeConfig.mainColor,
        color: 'white',
      },
      [theme.breakpoints.down('sm')]: {
        width: 185,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 58,
        margin: 0,
      },
    },
    buttonDelete: {
      color: themeConfig.mainColor,
      background: '#FFFFFF',
      '&:hover': {
        background: '#FFFFFF',
        color: themeConfig.mainColor,
      },
      [theme.breakpoints.down('xs')]: {
        margin: '0 0 25px'
      },
    }
  }),
  {
    name: 'PopupConfirmDelete',
    index: 2,
  }
);

export default useStyles;
