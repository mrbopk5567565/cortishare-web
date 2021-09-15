import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    FollowingWrapper: {
      height: '100%',
      overflow: 'hidden'
    },
    active: {
      color: "#0070C9!important"
    },
    btn: {
      background: '#F1F1F1',
      borderRadius: 5,
      margin: '0px 5px',
      border: 'none',
      outline: 'none',
      padding: '10px',
      cursor: 'pointer',
      color: '#999999',
      fontFamily: theme.CircularStd_Book,
    }
  }),
  {
    name: 'FollowerWrapper',
    index: 1,
  }
);

export default useStyles;
