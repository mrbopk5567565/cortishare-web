import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    paperDialog: {
      width: 720,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'inherit',
      borderRadius: 10,
      padding: 50,
      [theme.breakpoints.down('xs')]: {
        width: 414,
        padding: '45px 40px',
      }
    },
    containerText: {
      textAlign: 'center',
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      marginBottom: 15,
      '& > p': {
        '&:first-child': {
          fontSize: 30,
          marginBottom: 15,
          fontWeight: 'bold',
        },
      }
    },
    // containerText: {
    //   color: '#333333',
    //   marginBottom: 40,
    // },
    title: {
      textAlign: 'center',
      fontSize: 28,
      fontFamily: themeConfig.CircularTT_Bold,
      [theme.breakpoints.down('xs')]: {
        fontSize: 17,
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
