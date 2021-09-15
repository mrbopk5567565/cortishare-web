import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from '../../config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    dropdown: {
      position: 'absolute',
      right: 0,
      top: 40,
      // right: 77,
      // top: 70,
      background: 'white',
      boxShadow: '0px 4px 4px rgba(202, 202, 202, 0.25)',
      border: '1px solid #FAFAFA',
      borderRadius: 10,
      width: 450,
      padding: '30px 25px 40px',
      cursor: 'pointer',
      zIndex: 3,
      '& > p': {
        marginBottom: 20,
      },
      color: 'black',
      // height: 517,
      overflow: 'scroll',
      maxHeight: 'calc(100vh - 150px)'
    },
    container: {
      borderRadius: 5,
      padding: '20px 20px',
      marginBottom: 12,
    },
    read: {
      background: '#FAFAFA',
    },
    unread: {
      background: '#E5F1FA'
    },
    containerInfo: {
      marginLeft: 10,
      
    },
    avatar:{
      width: 59,
      height: 59
    },
    wrapperDescription: {
      width: 230
    },
    containerText: {
      height: '91%',
      '& > p': {
        color: theme.grayColor,
        fontSize: 18,
      }
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
    }
  }),
  {
    name: 'Notification',
    index: 1,
  }
);

export default useStyles;
