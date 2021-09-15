import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    container: {
      width: 630,
      height: 857,
      maxHeight: '100%',
      display: 'flex',
      maxWidth: 'inherit',
      alignItems: 'center',
      borderRadius: 10,
      [themeDefault.breakpoints.down('xs')]: {
        borderRadius: 'unset',
        margin: 'unset',
        width: '100%',
        height: '100%',
        maxWidth: 'unset',
        maxHeight: '100%'
      },
    },
    iconCloseInvite: {
      cursor: 'pointer',
      width: 24,
    },
    containerBody: {
      padding: 0,
      width: '100%',
    },
    containerTitleLink: {
      marginBottom: 7,
      marginTop: 25,
      '& p': {
        marginBottom: '0 !important',
        marginTop: '0 !important',
      }
    },
    title: {
      // fontWeigth: 'bold',
      // textAlign: 'center',
      fontSize: 18,
      color: '#000000',
    },
    titleLink: {
      fontSize: 16,
      borderBottom: '1.5px solid #0070C9',
      cursor: 'pointer',
      color: theme.mainColor,
    },
    containerHead: {
      paddingLeft: 50,
      paddingRight: 50,
      borderBottom: '1px solid #B5B5B5',
      '& p:first-child': {
        marginBottom: 25,
        marginTop: 30,
        [themeDefault.breakpoints.down('sm')]: {
          marginBottom: 23,
          marginTop: 26,
          fontWeight: 700,
          textAlign: 'center'
        }
      },
      [themeDefault.breakpoints.down('xs')]: {
        paddingLeft: 30,
        paddingRight: 30,
        borderBottom: 'unset'
      }
    },
    wrapperHead: {
      position: 'relative',
      paddingBottom: '2%',
      [themeDefault.breakpoints.down('xs')]: {
        borderBottom: '1px solid #B5B5B5',
        paddingBottom: 15,
      }
    },
    containerTitle: {
      position: 'relative',
    },
    closeIcon: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },
    containerBottom: {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      overflow: 'auto',
      padding: '20px 50px',
      '& > input': {
        width: '100%',
        boxSizing: 'border-box',
        marginTop: 5,
      },
      [themeDefault.breakpoints.down('xs')]: {
        padding: '20px 30px'
      }
    },
    containerTitle: {
      marginBottom: 10,
    },
    suggestContent: {
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
      '& > p': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        overflow: 'hidden',
      }
    },
    // containerList: {
    //   padding: '0px 50px',
    // },
    wrapperInpLink: {
      width: 'calc(100% - 84px)',
      paddingRight: 18
    },
    wrapperBtnCopy: {
      width: 84
    },
    getLink: {
      padding: '20px 24px',
      background: theme.inputGrey,
      border: 'none',
      fontSize: 18,
      width: '100%',
      '&:focus': {
        outline: 'none'
      },
      '&:disabled': {
        color: 'black',
        [themeDefault.breakpoints.down('sm')]: {
          color: 'black',
          fontSize: 26,
        }
      }
    },
    btnCopy: {
      width: '100%',
      background: theme.lightColor,
      color: theme.mainColor,
      border: 'none',
      cursor: 'pointer',
      fontSize: 14,
      borderRadius: 5
    },
    containerLink: {
      marginTop: 5,
      marginBottom: 10,
      width: '100%',
      '& > button': {
        marginLeft: '15px',
        background: theme.lightColor,
        color: theme.mainColor,
        '&:hover': {
          background: theme.mainColor,
          color: 'white',
        }
      },
    },
    containerLinkHidden: {
      display: 'none',
    },
    avatar: {
      width: 53,
      height: 53,
      marginRight: 20,
    },
    textStatus: {
      fontSize: 15,
      // lineHeight: 17.58,
      color: theme.grayColor,
      margin: 0,
    },
    containerPeople: {
      padding: '10px 0px',
      borderRadius: 8,
    },
    containerPermission: {
      cursor: 'pointer',
      width: 'max-content',
    },
    navigation: {
      cursor: 'pointer',
      marginLeft: 15,
    },
    //scroll
    '@global': {
      '*::-webkit-scrollbar': {
        width: '11px'
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#F0F0F0',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#B5B5B5',
      }
    },
    containerSearch: {
      position: 'relative',
      marginBottom: 10,
    },
    containerQuantityUser: {
      marginBottom: 10,

    },
    textQuantity: {
      fontSize: 15,
      color: theme.grayColor,
      marginRight: 15,
    },
    textStatusNew: {
      color: theme.mainColor,
    },
    textAddMail: {
      color: theme.mainColor,
      cursor: 'pointer',
      marginRight: 0,
      width: 75,
    },
    inviteUser: {
      backgroundColor: theme.title,
      height: '80%',
      maxHeight: 'calc(100% - 200px)',
      [themeDefault.breakpoints.down('xs')]: {
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30
      }
    },
    inviteText: {
      [themeDefault.breakpoints.down('xs')]: {
        position: 'absolute',
        marginLeft: 70,
      }
    },
    suggestPicture: {
      width: 40,
      height: 40,
      marginRight: 20
    },
    suggestWrapper: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.lightColor,
      }
    },
    inputSearch: {
      padding: '24px 36px',
      background: '#F9F9F9',
      border: 'none',
      fontSize: 18,
      borderRadius: 10,
      // width: '72%',
      // width: 'calc(100% - 47px)',
      marginBottom: 10,
      '&:focus': {
        outline: 'none'
      }
    },
    suggestion: {
      position: 'relative',
      zIndex: 101,
      // zIndex: 0,
      backgroundColor: theme.lightGray,
      overflow: "auto"
      // maxHeight: 200
      // style={{ height: 50, overflow: "auto" }}
    },
    buttonCreate: {
      bottom: 0,
      marginTop: 20,
      right: 50,
      zIndex: 100,
      [themeDefault.breakpoints.down('xs')]: {
        right: 30,
        marginTop: '50%'
      },
      '& > button': {
        marginBottom: 15,
      },
      '& .customBreadcrumb': {
        width: 'calc(100% - 56px)',
      }
    },
    btnAddEmail: {
      width: '100%', 
    },
    inpAddEmail:{
      width: '100%'
    },
    inpEditEmail: {
      width: '100%'
    },
    textEmail: {
      paddingLeft: 20,
      width: 180,
      wordWrap: 'break-word ',
      '@media(max-width: 350px)': {
        width: 150,
        paddingLeft: 0,
      },
    },
    textEmailGrid: {
      '@media(max-width: 350px)': {
        flexGrow: 0,
        maxWidth: '60%',
        flexBasis: '60%',
      },
    },
    marginTop: {
      marginTop:20
    }          
  }),
  {
    name: 'Collaborators',
    index: 2,
  }
);


export default useStyles;
