import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
  
    notFound1: {
      color: theme.grayColor,
      fontSize: 22
    },
    notFound2: {
      marginTop: 10,
      color: theme.grayColor,
      fontSize: 20
    }

  })
)

export default useStyles;
