import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: 716,
      // height: 356,
      minHeight: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'inherit',
      borderRadius: 10,
      paddingBottom: 50,
      paddingTop: 50,
      [theme.breakpoints.down('md')]: {
        width: 500,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        '& .MuiDialogActions-root': {
          width: '80%',
          margin: '0 auto',
          justifyContent: 'center',
          display: 'block'
        }
      }
    },
    containerText: {
      padding: '12px',
      flex: 'unset',
      [theme.breakpoints.down('xs')]: {
        padding: '8px 12px',
      },
      '& > p': {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        lineHeight: '35px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
          fontSize: 24,
          lineHeight: '25px'
        }
      }
    },
    buttonYes: {
      marginRight: 32,
      background: 'white',
      color: themeConfig.mainColor,
      border: '1px solid #0070C9',
      textTransform: 'none',
      '&:hover': {
        background: 'white',
        color: themeConfig.mainColor,
      },
    },
    buttonNo: {
      background: themeConfig.mainColor,
      color: 'white',
      textTransform: 'none',
      '&:hover': {
        background: themeConfig.mainColor,
        color: 'white',
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0px!important',
        marginTop: 10
      }
    },
    buttons: {
      height: 66,
      width: 190,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        display: 'block'
      }
    },
    containerButton: {
    }
  }),
  {
    name: 'PopupUnlinkCard',
    index: 2,
  }
);

export default useStyles;
