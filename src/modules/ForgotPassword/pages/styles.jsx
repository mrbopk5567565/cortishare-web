import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    WrapSection: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formSection: {
      width: '50%',
      maxWidth: 510,
      marginTop:'50px',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '80px',
        marginTop:'5px'
      }
    },
    form: {
      marginTop: 40,
    },
    logo: {
      width: '174px',
      height: '40px',
    },
    buttonClose: {
      position: 'absolute',
      right: 20,
      cursor: 'pointer',
    },
    title: {
      fontSize: '35px',
      textAlign: 'center'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    logo: {
      width: '174px',
      height: '40px',
    },
    textField: {
      minHeight: 130,
    },
    input: {
      paddingRight: 80,
      '&:active': {
        background: 'rgba(196, 196, 196, 0.5)',
      },
      '&:focus': {
        background: 'rgba(196, 196, 196, 0.5)',
      },
      background: 'rgba(196, 196, 196, 0.1)',
      outline: 'none',
      border: 'none',
      padding: '24px 30px',
      width: '100%',
      borderRadius: 5,
      boxSizing: 'border-box',
      fontSize: 18,
    },
    label: {
      fontSize: 18,
      lineHeight: '21px',
      marginBottom: 7
    },
    buttons: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    goBack: {
      marginRight: 32,
      fontSize: 18,
      color: 'rgba(0,112,201,1)',
      cursor: 'pointer'
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: themeConfig.privateColor,
    },
    [theme.breakpoints.down("sm")]: {
      formSection: {
        width: '80%'
      }
    },
    [theme.breakpoints.down("xs")]: {
      formSection: {
        width: '80%'
      }
    }
  }),
  {
    name: 'ForgotPassword',
    index: 1,
  }
);

export default useStyles;
