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
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      [theme.breakpoints.down("xs")]: {
        width: 298,
        height: 310,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
      },
      '& .MuiBackdrop-root': {
        backgroundColor: 'unset'
      }
    },
    containerBody: {
      padding: 0,
      paddingTop: '0 !important',
      width: '100%',
    },
    title: {
      color: '#333333',
      fontSize: 30,
      textAlign: 'center',
      lineHeight: '35px',
      marginBottom: 11,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 28,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 25,
        width: '90%',
        textAlign: 'center',
      },
    },
    titleRequested: {
      fontSize: 28,
      [theme.breakpoints.down('md')]: {
        fontSize: 26,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
    description: {
      color: '#333333',
      fontSize: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 22,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 17,
      },
    },
    layoutLogin: {
      height: '100%',
    },
    layoutContainer:{
      paddingLeft: '56px',
      paddingRight: '56px',
      [theme.breakpoints.down("sm")]: {
        padding: '20px',
      },
    },
    containerButton: {
       marginTop: 40,
      '& > button': {
        width: 196,
        height: 66,
        padding: 0,
        '& > span': {
          fontSize: 14,
          fontFamily: 'CircularTT-Bold!important',
        },
        [theme.breakpoints.down("xs")]: {
          width: 120,
          height: 40,
          fontSize: 15,
          '& > span': {
            fontFamily: "'CircularStd-Book', sans-serif !important",
          },
        }
      },
      '& > p': {
        [theme.breakpoints.down("xs")]: {
          paddingLeft: 52,
          fontSize: 15,
          fontWeight: 'normal',
        }
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: 'space-between',
      }
    },
    button: {
      border: '1px solid #0070C9',
      borderRadius: 5,
      color: themeConfig.mainColor,
      textTransform: "none",
      marginRight: 32,
      [theme.breakpoints.down("xs")]: {
        marginRight: 12,
      }
    }
  }),
  {
    name: 'RequiresCollaboration',
    index: 1,
  }
);

export default useStyles;
