import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    container: {
      width: '62%',
      [themeDefault.breakpoints.down('md')]: {
        width: '80%',
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: '100%',
        margin: 0,
      },
      maxWidth: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
    },
    containerBody: {
      padding: 0,
      width: '100%',
      '&:first-child':{
        padding: 0,
      }
    },
    //create map
    layoutLogin: {
      padding: '45px 74px',
      [themeDefault.breakpoints.down('md')]: {
        padding: '30px',
      },
    },
    containerBodyFile: {
      position: 'relative',
    },
    description: {
      color: theme.grayColor,
      fontSize: 17,
      margin: 0,
      marginBottom: '6%',
    },
    containerButton: {
      paddingRight: 52,
      marginTop: '6%',
      '& > p': {
        opacity: 0.5
      },
      '& > button': {
        borderRadius: 0
      }
    },
    containerImage: {
      marginBottom: 18,
      borderRadius: 7,
      textAlign: 'center',
    },
    image: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      minHeight: 48,
      borderRadius: 7,
      minWidth: 100,
    },
    selected: {
      outline: '7px solid #296EB4',
      outlineOffset: '-2px',
      outlineStyle: 'auto',
    },
    rootLabelRadio: {
      marginLeft: 'unset',
      marginRight: 'unset',
      position: 'relative',
      '& > span.MuiCheckbox-root': {
        position: 'absolute',
        right: '0',
        bottom: '3px',
      }
    },
    iconClose: {
      width: '4%',
      position: 'absolute',
      right: 0,
      top: 0,
      cursor: 'pointer',
    },
  }),
  {
    name: 'DialogAddPost',
    index: 1,
  }
);

export default useStyles;
