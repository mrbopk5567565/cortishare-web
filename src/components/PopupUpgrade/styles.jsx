import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    container: {
      height: '100%',
      '& .MuiDialog-paper': {
        width: 705,
        height: 666,
        maxWidth: 'inherit',
        maxHeight: 'inherit',
        display: 'flex',
        backgroundColor: 'unset',
        justifyContent: 'center',
        borderRadius: 0,
        boxShadow: 'none',
        position: 'relative',
        [themeDefault.breakpoints.down("sm")]: {
          height: '100%',
          paddingTop: '20%',
          maxWidth: 400,
          width: '100%',
          margin: 12,
        },
        [themeDefault.breakpoints.down("xs")]: {
          height: '105%',
          paddingTop: '20%',
          maxWidth: 705,
          width: '100%',
          margin: 12,
        },
      },
    },
    containerBody: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 0,
      '&:first-child': {
        padding: 0,
      }
    },
    //post popup
    iconClose: {
      position: 'absolute',
      right: 0,
      top: 23,
      cursor: 'pointer',
    },
    layoutLeft: {
      background: 'white',
      borderRadius: '15px 0px 0px 15px',
      width: 300,
      height: 515,
      padding: '47px 0 32px',
      '& > p': {
        '&:first-child': {
          fontWeight: 'bold',
        }
      }
    },
    price: {
      fontSize: 35,
      margin: 0,
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      '& > span': {
        fontSize: 20,
      }
    },
    layoutRight: {
      position: 'relative',
      borderRadius: '15px 15px 15px 15px',
      width: 335,
      height: 565,
      padding: '70px 0 30px',
      background: theme.mainColor,
      '& > div': {
        '& > p': {
          color: 'white',
          width: '50%',
          textAlign: 'center',
        },
        '& > img': {
          marginBottom: 10
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
    layoutLogin: {
      marginTop: '12%',
    },
    layoutContainer: {
      width: '80%',
    },
    title: {
      color: '#666',
      fontSize: 18
    }
  }),
  {
    name: 'PopupUpgrade',
    index: 1,
  }
);

export default useStyles;
