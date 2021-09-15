import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      width: '100%',
    },
    dropdown: {
      overflowY: 'hidden !important'
    },
    container: {
      '& > p': {
        color: theme.grayColor,
        marginBottom: '1%',
      }
    },
    containerText: {
      marginBottom: 24,
    },
    text: {
      color: '#999999',
    },
    containerMap: {
      marginBottom: '5%',
    },
    card: {
      flex: 'none',
      '&:not(:first-child)':{
        marginLeft: 20
      },
      // maxWidth: '15%',
      // flexBasis: '15%',
      // marginRight: '2%',
      // marginRight: '20px',
      // width: 'calc(100% / 6 - 20px)',
    },
    widthCardDefault: {
      width: 280
    },
    widthCardMobile: {
      // maxWidth: 260
    },
    wrapperRecent:{
      width:'100%',
      display: 'flex',
      overflow: 'auto',
      marginBottom: 44,
      paddingBottom: 20,
      marginTop: 19,
      // fix overflow + hidden
      paddingLeft: 10,
      marginLeft: -10,
    },
    viewAll: {
      minHeight: 200,
      // height: 'calc(100%)',
      // maxHeight: 280,
      // width: 282,
      cursor: 'pointer',
      background: theme.lightColor,
      borderRadius: 10,
      '& > img': {
        marginBottom: 10,
      },
      flex: 'none',
      marginLeft: 20
    },
    nonView: {
      marginLeft: 'unset',
    },
    textViewAll: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '0px 15px',
    },
    aaa: {
      maxWidth: 'calc(100% * 6 / 7)',
      display: 'flex',
    },
    bbb: {
      maxWidth: 'calc(100% * 1 / 7)',
    },

    // masonry
    rootResponsiveMasonry: {
      width: '100%',
      marginBottom: 50,
    },
    rootMasonry: {
      display: 'flex',
      alignItems: 'stretch',
      '& > div > div': {
        height: '100%',
      }
    }
  }),
  {
    name: 'Home',
    index: 2,
  }
);

export default useStyles;
