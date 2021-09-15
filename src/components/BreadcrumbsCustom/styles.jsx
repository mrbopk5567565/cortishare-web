import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      fontSize: 16,
      marginLeft: 5,
      textTransform: "none",
      color: 'white',
      display: 'inline-block',
      lineHeight: 'unset',
      fontFamily: theme.CircularStd_Book,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
    link: {
      color: '#0070C9',
      fontSize: 18,
      cursor: 'pointer',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
    notLink: {
      color: '#000',
      fontSize: 18,
      fontFamily: theme.CircularStd_Book,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
    seperator:{
      color: '#0070C9',
      fontSize: 18,
      marginLeft: 2,
      marginRight: 2,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    }
  }),
  {
    name: 'BreadcrumbsCustom',
    index: 1,
  }
);

export default useStyles;
