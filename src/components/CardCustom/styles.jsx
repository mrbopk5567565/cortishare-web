import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      borderRadius: 10,
      boxShadow: '0px 8px 8px rgba(202, 202, 202, 0.25)',
      position: 'relative',
      '&:hover': {
        '& > $control': {
          display: 'flex',
        }
      }
    },
    textDisable: {
      color: '#999999',
      fontSize: 14,
      cursor: 'pointer',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 1.5,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 12,
        paddingBottom: 15,
        whiteSpace: 'nowrap',
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    containerCard: {
      position: 'relative',
      cursor: 'pointer',
      '&:hover': {
        '& > $control': {
          display: 'flex',
        }
      }
    },
    control: {
      display: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
      marginTop: 7,
    },
    cardContentContainer: {
      padding: '20px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:last-child': {
        paddingBottom: '20px',
      },
    },
    containerTitle: {
    },
    titleCard: {
      fontSize: 18,
      fontWeight: 'bold',
      cursor: 'pointer',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 1.5,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 14,
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
      }
    },
    privacy: {
      fontSize: 14,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 12,
      }
    },
    containerInfo: {
      '& > p': {
        lineHeight: '1.5',
        '&:first-child': {
          color: theme.grayColor,
        }
      },
      [themeDefault.breakpoints.down('sm')]: {
        alignItems: "flex-start",
        flexDirection: "row",
      }
    },
    textEmpty: {
      height: 20,
      width: '100%',
    },
    icDot: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: '100%',
    },
    containerImg: {
      width: '100%',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardMediaImg: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      maxHeight: '100%',
      [themeDefault.breakpoints.down('xs')]: {
        height: '100%',
      }
    },
  }),
  {
    name: 'CardCustom',
    index: 1,
  }
);

export default useStyles;
