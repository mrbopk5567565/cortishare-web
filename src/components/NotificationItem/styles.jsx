import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from '../../config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      borderRadius: 5,
      padding: '20px 20px',
      marginBottom: 12,
    },
    read: {
      fontSize: 16,
      background: '#FAFAFA',
      fontWeight: 'inherit',
    },
    unread: {
      fontSize: 16,
      background: '#E5F1FA',
      fontFamily: theme.CircularTT_Bold,
    },
    description: {
      fontSize: 16,
      fontFamily: theme.CircularStd_Book,
    },
    containerInfo: {
      marginLeft: 10, 
    },
    avatar:{
      width: 59,
      height: 59,
      backgroundColor: '#cae4f8',
      '& >.MuiSvgIcon-root': {
        display: 'none',
      },
    },
    wrapperDescription: {
      width: 300
    },
    btnReject: {
      fontWeight: 'bold',
      color: '#0070C9',
      marginTop: 10,
      zIndex: 10000,
      minWidth: 110,
      textTransform: 'capitalize',
    },
    btnAccept: {
      zIndex: 10000,
      borderRadius: 5,
      background: '#0070C9',
      minWidth: 110,
      color: '#FFFFFF',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginRight: 10,
      marginTop: 10,
    },
    textAccept :{
      marginTop: 22,
      color: '#0070C9',
      fontWeight: 'bold'
    },
    textReject: {
      marginTop: 22,
      color: '#DE4C73',
      fontWeight: 'bold'
    },
    displayFlex: {
      display:'flex',
    },
    textNoti: {
      wordBreak: 'break-word',
      marginLeft: 10,
    }
  }),
  {
    name: 'Notification',
    index: 2,
  }
);

export default useStyles;
