import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'absolute',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 3.6%, rgba(255, 255, 255, 0.7) 23.03%, #FFFFFF 92.44%)',
      bottom: 0,
      left: 0,
      zIndex: 10,
      width: '100%',
      height: () => (window.innerHeight*40)/100,
    },
    buttonClose: {
      position: 'absolute',
      top: 20,
      right: 20,
      cursor: 'pointer',
      zIndex: 1
    },
    title: {
      fontSize: 36,
      fontFamily: 'CircularTT-Bold!important',
      textAlign: 'center',
      lineHeight: '35px',
      marginBottom: 4,
      [theme.breakpoints.down('sm')]: {
        fontSize: 30,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    description: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 17,
      },
    },
    layoutLogin: {
      height: '100%',
      textAlign: 'center'
    },
    layoutContainer:{
      [theme.breakpoints.down("xs")]: {
        padding: '0 32px',
      }
    },
    containerButton: {
      marginTop: 23,
      width: 206,
      height: 41,
      background: themeConfig.privateColor,
      textTransform: "none",
      '& > span': {
        fontSize: 14,
        color: 'white',
        fontFamily: 'CircularTT-Bold!important',
        [theme.breakpoints.down('sm')]: {
          fontSize: 15,
        },
      },
    },
  }),
  {
    name: 'ContinueViewing',
    index: 1,
  }
);

export default useStyles;
