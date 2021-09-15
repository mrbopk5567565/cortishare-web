import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    layoutCommon: {
      margin: '30px auto',
      paddingLeft: 15,
      paddingRight: 15,
    },
    layoutHome: {
      paddingLeft: 60,
      paddingRight: 60,
      [themeDefault.breakpoints.down("sm")]: {
        paddingLeft: 25,
        paddingRight: 25,
      },
    },
  }),
  {
    name: 'Layout',
    index: 1,
  }
);

export default useStyles;
