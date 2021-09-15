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
      '& > p': {
        color: theme.grayColor,
        marginBottom: '1%',
      },
      '& > div': {
        marginTop: 0
      }
    },
    mapEmpty: {
      height: '82vh',
    },
    image: {
      width: 100,
      marginBottom: 15,
    },
    description: {
      fontSize: 22, 
      color: theme.grayColor,
      marginBottom: 30,
    },
  }),
  {
    name: 'Recent',
    index: 1,
  }
);

export default useStyles;
