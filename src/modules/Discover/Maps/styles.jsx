import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      width: '100%',
      '& > p': {
        width: '100%',
        marginBottom: 1,
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
      marginBottom: 40
    },
    containerMap: {
      marginBottom: '5%',
    },
    MapTitle: {
      marginTop: 40,
      marginBottom: 30,
      // marginLeft: 10,
    },
    searchTitle: {
      marginBottom: '0!important'
    }
  }),
  {
    name: 'Maps',
    index: 1,
  }
);

export default useStyles;
