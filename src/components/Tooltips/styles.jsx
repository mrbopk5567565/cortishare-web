import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    popperCustom: {
      // background: '#FFFFF',
      // color: '#000000',
    },
    tooltipCustom: {
      background: '#FFFFFF',
      color: '#000000',
      boxShadow: '0px 8px 8px rgba(202, 202, 202, 0.25)',
      fontSize: 18,
    },
    arrowCustom: {
      color: '#FFFFFF',
    },
  }),
  {
    name: 'Tooltips',
    index: 1,
  }
);

export default useStyles;
