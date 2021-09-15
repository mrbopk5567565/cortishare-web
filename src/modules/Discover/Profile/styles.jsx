import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    layout: {
      padding: '0 60px',
      [theme.breakpoints.down("xs")]: {
        padding: '0',
      },
    },
    dropdown: {
      overflowY: 'hidden !important'
    },
    container: {
      // marginBottom: '2%',
    },
    avatar: {
      width: 119,
      height: 119,
      marginRight: 28
    },
    name: {
      fontSize: 36,
      fontFamily: themeConfig.CircularTT_Bold
    },
    number: {
      fontSize: 17,
    },
    viewMore: {
      '& span':{
        wordBreak: 'normal',
        fontSize: 16
      },
      '& a':{
        color: themeConfig.mainColor,
        "text-decoration-line": 'none',
      }
    },
    description: {
      width: '50%',
      marginTop: 34,
      wordBreak: 'keep-all',
      '& > span': {
        cursor: 'pointer',
        color: themeConfig.mainColor,
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      }
    },
    text: {
      fontSize: 12,
      opacity: 0.5
    },
    btnFollow: {
      background: themeConfig.mainColor,
      color: 'white',
      padding: '8px 30px',
      textTransform: 'none',
      fontSize: 14,
      borderRadius: 5,
      '&:hover': {
        background: themeConfig.mainColor,
        color: 'white',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    btnFollowed: {
      color: themeConfig.mainColor,
      background: 'white',
      '&:hover': {
        color: themeConfig.mainColor,
        background: 'white',
      },
    },
    layoutMapSection: {
      marginTop: 50,
    },
    showMore: {
      height: '37px',
      overflow: 'hidden',
    },
    showLess: {
      overflow: 'none',
    },
    wrapperFollow: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 26,
      }
    },
  }),
  {
    name: 'Profile',
    index: 1,
  }
);

export default useStyles;
