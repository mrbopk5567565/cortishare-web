import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    WrapSection: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        height: '-webkit-fill-available',
      },
    },
    formSection: {
      width: '500px',
      minWidth: 300,
      maxWidth: 700,
      margin:'0 auto',
      [theme.breakpoints.down("xs")]: {
        width: 500,
      },
    },
    containerLogoLogin: {
      width: 287,
      margin: '0 auto',
      padding: '30px 0 50px',
      display: 'block',
      [theme.breakpoints.down("xs")]: {
        width: 200,
      }
    },
    textWelcome: {
      color: '#333333',
      textAlign: 'center',
      fontSize: 30,
      margin: '45px 0',
      marginBottom: 60,
      fontWeight: 'bold',
      '& > p': {
        marginTop: '70px',
        [theme.breakpoints.down("xs")]: {
          marginTop: '30px'
        },
      },
    },
    textThank: {
      textAlign: 'center',
      marginTop: '59px',
      fontSize: 18,
      color: '#333333',
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    buttonLogin: {
      marginTop: 130,
      [theme.breakpoints.down("sm")]: {
        marginTop: 120,
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: 80,
      } 
    },
    textButton: {
      '& > span': {
        fontSize: 14,
        padding: '8px 21px',
      },
    },
  },
  ));

export default useStyles;
