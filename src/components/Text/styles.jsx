import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontFamily: theme.CircularStd_Book,
      '& > span': {
        color: theme.mainColor,
        cursor: 'pointer',
        '&.private': {
          color: theme.privateColor
        },
        '&.description': {
          color: theme.grayColor
        }
      }
    },
    bold: {
      fontWeight: 'bold',
    },
    link: {
      cursor: 'pointer',
    },
    sizeBig: {
      fontSize: 22,
    },
    sizeBiger: {
      fontSize: 40
    },
    sizeLarge: {
      fontSize: 20,
    },
    sizeMedium: {
      fontSize: 18,
    },
    sizeSmall: {
      fontSize: 16,
    },
    sizeMini: {
      fontSize: 14,
    },
    title: {
      fontSize: 20,
      color: theme.grayColor,
    },
    tooBlur: {
      color: theme.grayColor,
    },
    blur: {
      color: theme.blurColor
    },
    mainColor: {
      color: theme.mainColor
    },
    normal: {
      color: theme.normalColor
    },
    normalWeight: {
      fontWeight: 'normal!important'
    }
  }),
  {
    name: 'Text',
    index: 1,
  }
);

export default useStyles;
