import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    container: {
      width: 716,
      height: 358,
      maxWidth: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      [theme.breakpoints.down("xs")]: {
        width: 298,
        height: 310,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
      }
    },
    containerBody: {
      padding: 0,
      paddingTop: '0 !important',
      width: '100%',
    },
    title: {
      fontSize: 30,
      fontFamily: 'CircularTT-Bold!important',
      textAlign: 'center',
      lineHeight: '35px',
      marginBottom: 11,
      [theme.breakpoints.down('md')]: {
        fontSize: 28,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 25,
      },
      [theme.breakpoints.down('xs')]: {
        width: '95%',
        lineHeight: '29.3px',
      },
    },
    titlePrivate: {
      [theme.breakpoints.down('xs')]: {
        width: '85% !important',
      },
    },
    description: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 17,
        width: '95%',
        textAlign: 'center',
      },
    },
    layoutLogin: {
      height: '100%',
    },
    layoutContainer:{
      padding: '69px 149px 58px',
      [theme.breakpoints.down("sm")]: {
        padding: '20px 69px',
      },
      [theme.breakpoints.down("xs")]: {
        padding: '50px 20px',
      }
    },
    layoutContainerPrivate: {
      padding: '69px 102px 58px',
      [theme.breakpoints.down("xs")]: {
        padding: 20,
      }
    },
    containerButton: {
       marginTop: 55,
      '& > p': {
        paddingLeft: 66,
        [theme.breakpoints.down("xs")]: {
          paddingLeft: 36,
          fontSize: 15,
          fontWeight: 'normal',
        }
      },
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
          fontSize: 15,
          '& > span': {
            fontFamily: "'CircularStd-Book', sans-serif !important",
          },
        }
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: 17,
      }
    },
    buttonBack: {
      [theme.breakpoints.down("xs")]: {
        width: '160px !important',
        marginTop: 46,
      }
    }
  }),
  {
    name: 'RequestFollow',
    index: 1,
  }
);

export default useStyles;
