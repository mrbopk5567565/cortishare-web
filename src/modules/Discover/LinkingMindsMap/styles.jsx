import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // marginTop: '3%'
    }
  }),
  {
    name: 'LinkingMindsMap',
    index: 1,
  }
);

export default useStyles;
