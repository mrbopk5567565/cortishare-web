import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    dialogPaper: {
     width: '90%',
     margin: '0 auto',
     '& .MuiDialog-paper': {
      margin: 10,
      padding: '60px 100px'
     },
     [themeDefault.breakpoints.down('sm')]:{
      '& .MuiDialog-paper': {
        margin: 10,
        padding: '40px 20px',
       }
    },
    
    },
    inputBase:{
      '&:focus':{
        outline: 'none'
      },
      paddingLeft: 18,
      paddingRight: 36,
      fontSize: 18,
      width: 'calc(100% - 72px)',
      height: 51,
      borderRadius: 5,
      background: theme.inputGrey,
      border: 'none',
      // opacity: 0.1
    },
    groupInput:{
      marginBottom: 68,
      [themeDefault.breakpoints.down('sm')]:{
        '& p': {
          fontSize: 15
        }
      },
    },
    title: {
      textAlign: 'center',
      color: theme.titleForm,
      fontSize: 30,
      fontWeight: 600,
      [themeDefault.breakpoints.down('sm')]:{
        fontSize: 16,
      },
    },
    description: {
      textAlign: 'center',
      color: theme.titleForm,
      fontSize: 18,
      marginBottom: 63,
      [themeDefault.breakpoints.down('sm')]:{
        fontSize: 14,
      },
    },
    btn:{
      width: 196,
      height: 66,
      fontSize: 14,
      borderRadius: 5,
      '&:hover':{
        backgroundColor: 'unset'
      },
    },
    groupButton: {
      [themeDefault.breakpoints.down('sm')]:{
        display: 'unset',
        '& button': {
          width: '100%',
          height: 40
        }
      },
    },
    btnYes: {
      color: theme.mainColor,
      border: '1px solid #0070C9',
      textTransform: 'none',
      '&:hover':{
        backgroundColor: 'unset'
      },
      marginRight: 32,
      [themeDefault.breakpoints.down('sm')]:{
        marginBottom: 20,
      },
    },
    btnNo: {
      background: theme.mainColor,
      color: theme.title,
      textTransform: 'none',
      '&:hover':{
        backgroundColor: theme.mainColor
      }
      // border: '1px solid #0070C9',
    }
  })
)

export default useStyles;
