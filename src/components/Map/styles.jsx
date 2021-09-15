import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    // css here
  },{
    name: 'TestContainer',
    index: 1,
}));

export default useStyles;
