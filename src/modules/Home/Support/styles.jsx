import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: 716,
      height: 358,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'inherit',
      borderRadius: 10,
    },
    containerText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      '& > p': {
        '&:first-child': {
          fontSize: 30,
          marginBottom: 35,
          fontWeight: 'bold',
        },
        '& > span': {
          fontSize: 22,
          fontWeight: 'bold',
        }
      }
    },
  }),
  {
    name: 'Support',
    index: 1,
  }
);

export default useStyles;
