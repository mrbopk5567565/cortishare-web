import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      width: 'fit-content',
      transform: 'translateX(-100%)',
      height: 'fit-content',
      background: '#FFFFFF',
      // padding: '10px 20px',
      padding: '8px 6px',
      alignItems: 'center',
      border: `1px solid #FAFAFA`,
      boxShadow: `0px 4px 4px rgba(202, 202, 202, 0.25)`,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      fontSize: 14,
      color: '#000000',
      // padding: 5,
      margin: '0 5px',
      width: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '& > img': {
        width: '100%'
      },
    },
    shareBtn: {
      marginLeft: 5,
    }
  }),
  {
    name: 'PopupShare',
    index: 1,
  }
);

export default useStyles;
