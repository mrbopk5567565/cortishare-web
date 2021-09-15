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
    containerFollow: {
      marginTop:20,
      [theme.breakpoints.down("xs")]: {
        marginTop: 40,
      },
    },
    name: {
      [theme.breakpoints.down("xs")]: {
        width: '50%',
        wordBreak: 'break-all',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        position: 'absolute',
        fontSize: 25,
      },
      fontWeight: 'bold',
      fontSize: 36,
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
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    text: {
      fontSize: 12,
      opacity: 0.5,
      
    },
    btnEditProfile: {
      borderColor: themeConfig.mainColor,
      padding: '8px 30px',
      textTransform: 'none',
      fontSize: 14,
      borderRadius: 5,
      color: themeConfig.mainColor,
      background: 'white',
      '&:hover': {
        color: themeConfig.mainColor,
        background: 'white',
      },
      '&>span:first-child': {
        whiteSpace: 'nowrap',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      }
    },
    layoutMapSection: {
      marginTop: 50,
    },
    showMore: {
      height: '60px',
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
    name: 'MyProfile',
    index: 1,
  }
);

export default useStyles;
