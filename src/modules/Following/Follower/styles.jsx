import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      marginBottom: 40,
      width: '100%',
    },
    dropdown: {
      overflowY: 'hidden !important'
    },
    container: {
      flexWrap: 'wrap',
    },
    containerItem: {
      display: 'flex',
    },
    text: {
      color: theme.grayColor,
      marginBottom: 22,
      // marginLeft: 10,
    },
    viewAll: {
      height: 223,
      width: 282,
      background: theme.lightColor,
      borderRadius: 10,
      '& > img': {
        marginBottom: 10,
      }
    },
    mapEmpty: {
      height: '82vh',
    },
    image: {
      width: 100,
    },
    description: {
      fontSize: 22,
      color: theme.grayColor,
      marginBottom: 30,
    },
    card: {
      flexWrap: 'wrap',
      width: 'calc(100% + 20px)',
      margin: -10,
      '& $containerItem': {
        padding: 10,
      },
    }
  }),
  {
    name: 'Follower',
    index: 1,
  }
);

export default useStyles;
