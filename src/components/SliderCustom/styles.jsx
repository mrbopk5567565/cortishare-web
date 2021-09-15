import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 20,
    },
    container: {
      // background: 'rgba(181,181,181,0.1)',
      background: '#F7F7F7',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .react-pdf__Page__canvas': {
        minHeight: 200,
      },
      '& > a > img': {
        maxWidth: '100% !important',
        height: 'auto',
        maxHeight: 500,
        width: 'unset !important',
        // objectFit: "contain",
      },
    },
    iframe: {
      margin: 0,
      height: 400
    }
  }),
  {
    name: 'SliderCustom',
    index: 1,
  }
);

export default useStyles;
