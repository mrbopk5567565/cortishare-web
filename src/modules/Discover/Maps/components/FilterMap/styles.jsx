import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      marginBottom: 5,
      '& > header': {
        boxShadow: 'none'
      }
    },
    form: {
      width: '50%',
      [themeDefault.breakpoints.down('1020')]: {
        width: '100%'
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: '100%'
      },
    },
    formFuild: {
      width: '50%',
      [themeDefault.breakpoints.down('1090')]: {
        width: 'calc( 100% - 50px )'
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: 'calc( 100% - 50px )'
      },
    },
    rootTabs: {
      marginBottom: 20,
    },
    indicator: {
      display: 'none',
    },
    rootTab: {
      opacity: 1,
      padding: 0,
      width: 'fit-content',
      height: 'fit-content',
      minWidth: 'auto',
      marginRight: 10,
      background: theme.bgMainColor,
      color: theme.grayColor,
      padding: 10,
      borderRadius: 5,
      textTransform: 'capitalize',
    },
    tabSelected: {
      background: theme.bgMainColor,
      color: theme.mainColor,
    },
    searchInput: {
      marginTop: 0,
      marginBottom: 0,
      border: '1px solid #F1F1F1',
      '& fieldset': {
        border: 'unset'
      },
      '&.MuiOutlinedInput-input': {
        fontSize: '14px',
      }
    },
    customInput: {
      fontFamily: theme.CircularStd_Book,
    },
    adornedEndInput: {
      [themeDefault.breakpoints.down('xs')]: {
        paddingRight: 0,
      },
    },
    rootIcBtn: {
      [themeDefault.breakpoints.down('xs')]: {
        paddingLeft: 0,
      },
    },
    iconSearch: {
      paddingLeft: 20,
      cursor: 'pointer'
    },
    showTextSection: {
      display: 'flex',
      marginLeft: 10,
      padding: 12,
      background: '#F1F1F1',
      borderRadius: 5,
      color: '#666',
      fontSize: 14
    },
    showTextParent: {
      fontSize: 14,
    },
    showTextClose: {
      cursor: 'pointer',
      marginLeft: 10
    }
  }),
  {
    name: 'FilterMapContainer',
    index: 1,
  }
);

export default useStyles;
