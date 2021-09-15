import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    buttonClose: {
      zIndex: 1,
      marginBottom: '-54px',
      marginRight: '24px',
      paddingTop: '20px',
      textAlign: 'end',
      cursor: 'pointer',
      '& > img': {
        width: 29,
      }
    },
    container: {
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
      width: 630,
      height: '100%',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 0,
    },
    searchInput: {
      width: '100%',
    },
    option: {
      height: 45,
      width: '100%',
      borderBottom: '1px solid #B5B5B5',
      '&:last-child': {
        borderBottom: 'unset',
      },
      '&[data-focus="true"]': {
        backgroundColor: '#E5F1F4',
      },
    },
    containerOption: {
      display: 'flex',
      // height: 45,
      width: '100%',
      padding: '0 22px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listbox: {
      maxHeight: 135,
      padding: 0,
      margin: 0,
      borderRadius: 5,
      boxShadow: '0px 4px 4px rgba(202, 202, 202, 0.25)',
      border: '1px solid #FAFAFA',
      background: '#FFFFFF',
    },
    titleSearch: {
      color: '#000000',
    },
    descriptionSearch: {
      color: '#B5B5B5',
    },
    popupIndicatorOpen: {
      transform: 'rotate(0deg)'
    },
    clearIndicator: {
      display: 'none',
    },
    containerBody: {
      padding: 0,
      width: '100%',
      '&:first-child': {
        padding: 0,
      }
    },
    inputSearch: {
      fontFamily: theme.CircularStd_Book,
    },
    rootTextField: {
      fontFamily: theme.CircularStd_Book,
      '& fieldset': {
        border: 'unset'
      },
      '& .MuiInputBase-root': {
        border: '1px solid #F1F1F1',
        '& input': {
          '&::placeholder': {
            color: '#999999!important',
            opacity: 0.99,
          }
        }
      }
    },
    layoutLogin: {
      [themeDefault.breakpoints.down("xs")]: {
        marginTop: 20,
      },
      marginTop: '12%',
    },
    HeaderTitle: {
      fontSize: 18,
      lineHeight: '32px',
      fontFamily: 'CircularTT-Bold!important',
    },
    form: {
      width: '90%',
      marginTop: 20
    }
  }),
  {
    name: 'MobileSearch',
    index: 1,
  }
);

export default useStyles;
