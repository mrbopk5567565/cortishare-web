import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '100vh',
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
      // paddingLeft: 10,
      // marginTop: 20
    },
    stackGridCustomDefault: {
      placeContent: 'stretch center !important',
      '& > div': {
        // flex: 'unset !important',
        maxWidth: '433px !important',
        width: '100% !important'
        // [themeDefault.breakpoints.down(500)]: {
        //   width: '100% !important',
        // },
      },
      [themeDefault.breakpoints.down('xs')]: {
        placeContent: 'stretch center !important',
      },
    },
    matchDiscoverLinking: {
      placeContent: 'stretch center !important',
      '& > div': {
        // flex: 'unset !important',
        maxWidth: '433px !important',
        width: '100% !important'
        // [themeDefault.breakpoints.down(500)]: {
        //   width: '100% !important',
        // },
      },
      [themeDefault.breakpoints.down('xs')]: {
        placeContent: 'stretch center !important',
      },
    },
    matchPostDetail: {
      placeContent: 'stretch center !important',
      '& > div': {
        // flex: 'unset !important',
        maxWidth: '433px !important',
        width: '100% !important'
      }
    },
    matchPostDetailMini: {
      placeContent: 'stretch flex-start !important',
      '& > div': {
        maxWidth: '175px',
        width: '175px !important',
      }
    },
    matchPostDetailMiniIp6: {
      placeContent: 'stretch flex-start !important',
      '& > div': {
        maxWidth: 'calc(100% / 2)',
        width: 'calc(100% / 2) !important',
      }
    },
    matchPostDetailMiniIp6Extra: {
      placeContent: 'stretch flex-start !important',
      '& > div': {
        maxWidth: 'calc(100%)',
        width: 'calc(100%) !important',
      }
    }
  }),
  {
    name: 'StackGridCustom',
    index: 1,
  }
);

export default useStyles;
