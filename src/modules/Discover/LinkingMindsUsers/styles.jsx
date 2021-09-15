import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    containerLayout: {
      
    },
    root: {
      marginBottom: 40,
      width: '100%',
    },
    spacingXS2: {
      width: 'calc(100% + 20px)',
      margin: -10,
      // marginLeft: 'auto',
      // marginRight: 'auto',
      '& $containerItem': {
        padding: 10,
      },
    },
    containerAvatar: {
      display: "flex",
      justifyContent: "center",
      marginBottom: -56,
    },
    avatar: {
      width: 133,
      height: 133,
    },
    card: {
      height: 240,
      position: 'relative',
      cursor: 'pointer',
      width: 300,
      [themeDefault.breakpoints.down('650')]: {
        width: '50%',
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: '50%',
      },
      [themeDefault.breakpoints.down('400')]: {
        width: '50%',
      },
    },
    info: {
      '& > p': {
        fontWeight: 'bold',
      },
      width: '100%',
      height: 132,
      background: '#F5F5F5',
      borderRadius: 10,
    },
    textFullName: {
      marginTop: 60,
      width: '100%',
      textAlign: 'center',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    notification: {
      margin: '2px auto 0',
      '& > div':{
        display: 'flex',
      },
    },
    text: {
      margin: 0,
      fontSize: 12,
      color: theme.mainColor,
      '&:last-child':{
        paddingLeft: 3,
      },
      // width: '100%',
      // textAlign: 'center'
    },
    notFound1: {
      color: theme.grayColor,
      fontSize: 22
    },
    notFound2: {
      color: theme.grayColor,
      fontSize: 20
    },
    wrapperNotfound:{
      paddingLeft: 10,
      marginTop: 20
    }
  }),
  {
    name: 'LinkingMindsUsers',
    index: 1,
  }
);

export default useStyles;
