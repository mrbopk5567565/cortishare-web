import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
    },
    container: {
      flexWrap: 'wrap',
    },
    text: {
      color: theme.grayColor,
      marginBottom: 22,
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
      // width: 100,
      marginBottom: 15,
    },
    description: {
      fontSize: 22,
      color: theme.grayColor,
      marginBottom: 30,
      marginTop: 0,
    },
    isProfile: {
      height: '50vh!important'
    }
  }),
  {
    name: 'MyMap',
    index: 1,
  }
);

export default useStyles;
