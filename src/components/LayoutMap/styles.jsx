import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    containerLayout: {
      marginBottom: 40,
      width: '100%',
    },
    containerMap: {
    },
    spacingXS2: {
      width: 'calc(100% + 20px)',
      // width: '100%',
      margin: -10,
      // marginLeft: 'auto',
      // marginRight: 'auto',
      '& $containerItem': {
        padding: 10,
      },
    },
    card: {
      width: 300,
      [themeDefault.breakpoints.down('lg')]: {
        width: 300,
      },
      [themeDefault.breakpoints.down('md')]: {
        width: 300,
      },
      [themeDefault.breakpoints.down('1020')]: {
        width: 300,
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: 300,
      },
      [themeDefault.breakpoints.down('650')]: {
        width: '50%',
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: '50%',
      },
      [themeDefault.breakpoints.down('400')]: {
        // minWidth: 175,
        width: '50%',
      },
    },
    containerItem: {
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
    name: 'LayoutMap',
    index: 1,
  }
);

export default useStyles;
