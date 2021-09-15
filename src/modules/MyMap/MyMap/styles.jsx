import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
    },
    dropdown: {
      overflowY: 'hidden !important'
    },
    container: {
      flexWrap: 'wrap',
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
      marginBottom: 40,
    },
    description: {
      fontSize: 22, 
      color: theme.grayColor,
      marginBottom: 30,
    },
  }),
  {
    name: 'MyMap',
    index: 1,
  }
);

export default useStyles;
