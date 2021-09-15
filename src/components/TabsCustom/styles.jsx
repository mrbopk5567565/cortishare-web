import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      '& > header': {
        boxShadow: 'none'
      },
    },
    rootTabs: {
      marginTop: 15,
      marginBottom: 50,
    },
    indicator: {
      display: 'none',
    },
    rootTab: {
      opacity: 1,
      padding: 0,
      width: 'fit-content',
      height: 'fit-content',
      minWidth: 'auto',
      marginRight: 10,
      background: theme.bgMainColor,
      color: theme.grayColor,
      padding: 10,
      borderRadius: 5,
      textTransform: 'capitalize',
    },
    tabSelected: {
      background: theme.bgMainColor,
      color: theme.mainColor,
    },
    notFound1: {
      color: theme.grayColor,
      fontSize: 22
    },
    notFound2: {
      color: theme.grayColor,
      fontSize: 20
    }
  }),
  {
    name: 'TabsCustomContainer',
    index: 1,
  }
);

export default useStyles;
