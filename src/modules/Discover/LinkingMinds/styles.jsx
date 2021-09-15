import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      '& > p': {
        width: '100%',
        marginBottom: 10,
      }
    },
    dropdown: {
      overflowY: 'hidden !important'
    },
    containerButton: {
      '& > button': {
        marginRight: 10
      }
    },
    form: {
      width: 556,
      marginBottom: 10
    },
    containerMap: {
      marginBottom: '5%',
    },
  }),
  {
    name: 'LinkingMinds',
    index: 1,
  }
);

export default useStyles;
