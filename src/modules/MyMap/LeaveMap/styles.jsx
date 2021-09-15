import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    container: {
      width: 716,
      height: 298,
      maxWidth: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      [theme.breakpoints.down("xs")]: {
        position: 'relative',
        width: '100%',
        height: '100%',
        margin: 0,
        maxHeight: 'unset',
        borderRadius: 0,
      }
    },
    button: {
      background: 'unset',
      color: themeConfig.mainColor,
      border: `1px solid ${themeConfig.mainColor}`,
      borderRadius: '5px',
      '&:hover': {
        background: 'unset',
        color: themeConfig.mainColor,
      }
    },
    buttonClose: {
      position: 'absolute',
      top: 20,
      right: 20,
      cursor: 'pointer',
      zIndex: 1
    },
    containerBody: {
      padding: 0,
      paddingTop: '0 !important',
      width: '100%',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      lineHeight: '35px',
      marginBottom: 11,
      [theme.breakpoints.down('md')]: {
        fontSize: 28,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 26,
      },
    },
    description: {
      fontSize: 24,
      textAlign: 'center',
      lineHeight: '28.13px',
      marginBottom: 40,
      [theme.breakpoints.down('md')]: {
        fontSize: 22,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    layoutLogin: {
      height: '100%',
    },
    layoutContainer: {
      padding: '55px 56px 58px',
      [theme.breakpoints.down("sm")]: {
        padding: '10px',
      },
      [theme.breakpoints.down("xs")]: {
        padding: 20,
      }
    },
    containerButton: {
      '& > button': {
        width: 196,
        height: 66,
        '& > span': {
          fontSize: 14,
          fontFamily: 'CircularTT-Bold!important',
        },
        '&:first-child': {
          marginRight: 32,
          [theme.breakpoints.down("xs")]: {
            marginRight: 20
          }
        },
        [theme.breakpoints.down("xs")]: {
          width: 149,
          height: 48,
        }
      },
    },
  }),
  {
    name: 'LeaveMap',
    index: 1,
  }
);

export default useStyles;
