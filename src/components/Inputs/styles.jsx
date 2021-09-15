import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginBottom: '5%',
    },
    fullWidth: {
      width: '100%',
    },
    rootTextField: {
      width: '100%',
      '& > div': {
        background: 'rgba(196, 196, 196, 0.1)!important',
        borderRadius: 4,
      },
    },
    label: {
      color: '#000',
      marginBottom: 3,
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: theme.privateColor,
    },
    inputTextfield: {
      fontFamily: theme.CircularStd_Book,
      '&::placeholder': {
        opacity: 1,
        color: '#B5B5B5',
      },
      padding: '19px 12px 15px',
      fontSize: 16,
    },
    inputTextfieldPlaceholderDark: {
      '&::placeholder': {
        opacity: 1,
        color: '#999!important'
      },
    },
    fontBig: {
      fontSize: 18
    },
    multiline: {
      padding: 'unset',
    },
  }),
  {
    name: 'Inputs',
    index: 1,
  }
);

export default useStyles;
