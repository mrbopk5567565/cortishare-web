import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      display: 'flex',
      // minWidth: 300,
      // maxWidth: 500,
      // height: 'fit-content',
      height: 53,
      width: 'fit-content',
      background: theme.mainColorOpacity,
      borderRadius: 5,
      padding: '0 20px',
      alignItems: 'center',
      [themeDefault.breakpoints.down('xs')]: {
        width: 'fit-content',
      },
    },
    isFollow: {
      '& $textFollow': {
        // marginRight: 20,
        color: theme.mainColor,
      },
    },
    isOwner: {
      // minWidth: 'unset',
      // maxWidth: 'unset',
      // width: 'fit-content !important',
      '& $textFollow': {
        marginRight: 'unset',
      },
    },
    wrapperBtnFollow: {
      paddingLeft: 15
    },
    btnFollowOwner: {
      background: theme.privateColor,
      border: `1px solid ${theme.privateColor}`,
      borderRadius: 5,
      fontSize: 18,
      display: 'flex',
      color: '#FFFFFF',
      '&:hover': {
        background: theme.privateColor,
        color: '#FFFFFF',
      }
    },
    btnFollow: {
      padding: '3px 15px',
      width: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      whiteSpace: 'nowrap',
    },
    btnFollowed: {
      background: 'unset',
      color: theme.mainColor,
      border: `1px solid ${theme.mainColor}`,
      borderRadius: '5px',
      '&:hover': {
        background: 'unset',
        color: theme.mainColor,
        // opacity: 0.1,
      }
    },
    textFollow: {
      color: '#333333',
      whiteSpace: 'nowrap',
    },
    disabledBtnFollow: {
      border: 'unset',
      background: theme.grayColor,
      color: '#FFFFFF',
      '&:hover': {
        background: theme.grayColor,
        color: '#FFFFFF',
      }
    },
  }),
  {
    name: 'Follow',
    index: 2,
  }
);

export default useStyles;
