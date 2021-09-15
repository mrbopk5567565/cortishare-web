import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    dialogContent: {
      padding: '20px 20px 0 20px',
      fontSize: 18,
      lineHeight: '21px',
      color: '#000',
      [themeDefault.breakpoints.down("xs")]: {
        padding: '10px 0px 0px',
      },
    },
    dialogItem: {
      marginBottom: 25,
      [themeDefault.breakpoints.down("xs")]: {
        fontSize: 12,
        '& > .MuiTypography-root': {
          fontSize: 14,
        },
      },
      '& > p': {
        marginTop: 'auto',
      },
      '& > ol': {
        listStyle: 'disc',
      }
    },
    underline:{
      textDecoration: 'underline',
      margin: 'auto',
    },
    mail: {
      textDecoration: 'underline',
      color: themeConfig.mainColor,
    },
    dialogTitle: {
      textAlign: 'center',
      paddingLeft: 20,
      fontSize: 20,
      paddingBottom: 15,
      [themeDefault.breakpoints.down("xs")]: {
        fontSize: 15,
      },
    },
    dialogTitleSection: {
      position: 'relative',
      paddingTop: 15,
    },
    iconTitle: {
      position: 'absolute',
      left: 20,
      color: 'rgba(0, 0, 0, 0.54)',
      cursor: 'pointer',
      [themeDefault.breakpoints.down("xs")]: {
        top: 11,
      },
    }
  }),
  {
    name: 'termsAndConditions',
    index: 1,
  }
);

export default useStyles;
