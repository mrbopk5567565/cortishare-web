import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    viewInvoicesSection: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '27px 35px',
      background: 'rgba(181, 181, 181, 0.15)',
      marginBottom: 50,
    },
    date: {
      fontWeight: 'bold'
    },
    description: {
      fontSize: 18
    },
    viewInvoicesText: {
      color: themeConfig.mainColor,
      cursor: 'pointer',
      width: 'max-content',
      fontSize: 14,
      fontFamily: themeConfig.CircularTT_Bold

    }
  }),
  {
    name: 'ViewInvoices',
    index: 1,
  }
);

export default useStyles;





