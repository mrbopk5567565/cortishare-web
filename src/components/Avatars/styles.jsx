import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    avatarUser: {
      width: '38px',
      height: '38px',
    },
  }),
  {
    name: 'Avatar',
    index: 1,
  }
);

export default useStyles;
