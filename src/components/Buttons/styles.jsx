import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      fontSize: 16,
      textTransform: "none",
      // width: '100%',
      color: 'white',
      fontFamily: theme.CircularStd_Book,
      // width: 'fit-content',
      backgroundColor: theme.mainColor,
      '&:hover': {
        // backgroundColor: theme.lightColor,
        // color: theme.mainColor,
        backgroundColor: theme.mainColor,
        color: 'white',
        boxShadow: 'unset',
      },
      cursor: 'pointer',
      boxShadow: 'unset!important',
      borderRadius: 5,
      '&$btnDisabled': {
        color: '#FFFFFF',
        opacity: 1,
        border: `unset`,
      },
    },
    btnDisabled: {
      backgroundColor: `${theme.grayColor} !important`,
    },
    btnRed: {
      backgroundColor: 'red !important'
    },
    btnLarge: {
      padding: '12px 60px',
      width: 'max-content',
      [themeDefault.breakpoints.down("xs")]: {
        padding: '10px 45px',
        fontSize: '14px',
      },
      '&&:hover': {
      },
      '&$btnDisabled': {
        color: '#FFFFFF',
        opacity: 1
      },
    },
    btnHeight: {
      padding: '12px 60px',
      [themeDefault.breakpoints.down("xs")]: {
        padding: '10px 45px',
        fontSize: '14px',
        width: 312,
        marginTop: 40,
      },
      '&&:hover': {
      },
      '&$btnDisabled': {
        color: '#FFFFFF',
        opacity: 1
      },
    },
    btnMedium: {
      backgroundColor: theme.bg,
      color: theme.primary,
      padding: '8px 16px',
      '&$btnDisabled': {
        opacity: 1,
        color: '#FFFFFF',
      },
      '&:hover': {
        backgroundColor: theme.bg,
      }
    },
    btnSmall: {
      backgroundColor: theme.primary,
      padding: '6px 8px',
      '&$btnDisabled': {
        color: '#FFFFFF',
        opacity: 1,
      },
    },
    btnDarkActive: {
      background: theme.bgMainColor,
      color: theme.mainColor,
      padding: 10,
      borderRadius: 5,
      '&:hover': {
        background: theme.mainColor,
        color: theme.bgMainColor,
      }
    },
    btnDarkDisable: {
      background: theme.bgMainColor,
      color: theme.grayColor,
      padding: 10,
      borderRadius: 5,
      '&:hover': {
        background: theme.grayColor,
        color: theme.bgMainColor,
      }
    }
  }),
  {
    name: 'Buttons',
    index: 1,
  }
);

export default useStyles;
