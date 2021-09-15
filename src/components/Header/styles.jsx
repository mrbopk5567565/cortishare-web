import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import theme from '../../config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
      paddingLeft: '16px',
      paddingRight: '16px',
      position: 'relative',
      zIndex: 1001,
    },
    rootTextField: {
      fontFamily: theme.CircularStd_Book,
      maxHeight: 42,
      width: 334,
      [themeDefault.breakpoints.down('md')]: {
        width: 250,
      },
      '& fieldset': {
        border: 'unset'
      },
      '& .MuiInputBase-root': {
        maxHeight: 42,
        border: '1px solid #F1F1F1',
        '& input': {
          maxHeight: 42,
          '&::placeholder': {
            color: '#999999!important',
            opacity: 0.99,
          }
        }
      },
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 10,
      }
    },
    text: {
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: '14px !important',
        // position: 'absolute',
        // top: 27,
        // left: 95,
        // "@media (max-width:320px) ": {
        //   position: 'absolute',
        //   top: 27,
        //   left: 75,
        // },
      },
    },
    gridRightAuth: {
      "@media (min-width:600px) and (max-width:700px)": {
        position: 'relative',
      },
    },
    textLogin: {
      fontSize: '15px !important',
      marginRight: 20,
      cursor: 'pointer',
      "@media (min-width:600px) and (max-width:700px)": {
        position: 'absolute',
        top: '38%',
        left: '-20%'
      },
      "@media (max-width:320px) ": {
        marginLeft: '10px'
      },

    },
    rootMap: {
      background: '#0C0C0C',
      color: 'white',
      paddingTop: 10,
      paddingBottom: 10
    },
    rootNotMap: {
      paddingTop: 18,
      paddingBottom: 17
    },
    containerLeftNoLog: {
      flexGrow: 0,
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
    icBar: {
      color: '#000000',
    },
    icBarMap: {
      color: 'white',
    },
    imgicMenuLogo: {
      paddingBottom: 28,
      width: 59,
    },
    imgLogo: {
      width: 27,
      height: 20,
      padding: '0px 8px 0px 20px',
      [themeDefault.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    imgPrivacy: {
      marginLeft: 10,
      marginRight: 5,
      [themeDefault.breakpoints.down('xs')]: {
        width: 22,
        height: 26,
      },
    },
    imgDashboard: {
      marginLeft: '4px',
    },
    containerBreadcrumbs: {
      marginLeft: '8%',
      marginTop: 5,
      position: 'absolute',
      '& > .customBreadcrumb': {
        '& > ol': {
          display: 'unset',
          '& li p': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
            position: 'absolute',
            width: '50%',
            top: 23,
          }
        }
      },
      [themeDefault.breakpoints.down('xs')]: {
        display: 'none'
      },
    },
    rootFormControl: {
      width: 334,
      '& > div': {
        marginTop: 0,
        marginBottom: 0,
        '& > div > input': {
          padding: '12px 17px 11px',
          fontSize: 16,
        },
        '& > div > div > button': {
          padding: 5,
          marginRight: -12,
        }
      },
      [themeDefault.breakpoints.down('md')]: {
        width: 200,
      },
    },
    form: {
      marginRight: 15
    },
    formControlMap: {
      '& > div > div > input': {
        height: 42,
        '&::placeholder': {
          color: '#FFFFFF',
          opacity: 0.5,
        }
      },
    },
    btn: {
      fontWeight: 'bold',
      background: 'white',
      color: theme.mainColor,
      borderColor: theme.mainColor,
      padding: '8px 20px',
      textTransform: 'none',
      marginRight: 15,
      '&:hover': {
        background: theme.mainColor,
        color: 'white',
      },
      '& > span > svg': {
        width: '18px',
        height: '20px',
        marginRight: '3px',
      }
    },
    btnMap: {
      padding: '9px 21px',
      border: 'none',
      '&:hover': {
        border: 'none',
      }
    },
    btnSignUp: {
      fontWeight: 'bold',
      background: 'white',
      color: theme.mainColor,
      borderColor: theme.mainColor,
      textTransform: 'none',
      marginRight: 20,
      borderRadius: 5,
      width: 145,
      height: 41,
      fontSize: 14,
      '&:hover': {
        background: 'white',
        color: theme.mainColor,
        borderColor: theme.mainColor,
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: 117,
        height: 50,
        fontSize: 15,
        marginRight: 6,
      },
    },
    btnLogin: {
      background: theme.mainColor,
      color: 'white',
      borderColor: theme.mainColor,
      '&:hover': {
        background: theme.mainColor,
        color: 'white',
        borderColor: theme.mainColor,
      },
    },
    containerNotify: {
      position: 'relative',
      marginRight: 15,
      // position: 'static',
      '& > img': {
        cursor: 'pointer',
      }
    },
    imgCortishare: {
      // height: 'fit-content',
      marginBottom: 35,
    },
    imgicMenuText: {
      width: 197,
      height: 44,
      objectFit: 'cover',
      marginLeft: 12,
    },
    number: {
      position: 'absolute',
      background: theme.privateColor,
      width: 10,
      height: 10,
      right: 0,
      top: 2,
      // top: '25px',
      // right: '92px',
      borderRadius: '50%',
    },
    numberMap: {
      top: 0,
      right: -2,
      // top: '25px',
      // right: '89px',
    },
    avatar: {
      height: 42,
      width: 42,
      // marginLeft: 20,
      marginRight: 10,
      cursor: 'pointer',
      [themeDefault.breakpoints.down('sm')]: {
        height: 30,
        width: 30,
        marginLeft: 0,
        marginRight: 0,
      },
    },
    //drawer
    drawer: {
      width: 265,
      background: '#0C0C0C',
      boxSizing: 'border-box',
      // paddingTop: 43,
      // paddingBottom: 29.5,
      padding: '43px 20px 29.5px',
      // minHeight: '100vh',
      // height: 'unset',
      '& > button': {
        fontSize: '15px',
        fontWeight: '500',
        width: 'auto',
        margin: '3% 5%',
        height: 41,
        padding: 0,
        minHeight: 41,
        '& > span > svg': {
          width: '18px',
          height: '20px',
          marginRight: '3px',
        }
      },
      '& >button:first-of-type': {
        padding: ' 12px',
        background: 'white',
        color: theme.mainColor,
        marginTop: '5%',
        height: 41,
        padding: 0,
        minHeight: 41,
        '&:hover': {
          background: theme.mainColor,
          color: 'white',
        },
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      // [themeDefault.breakpoints.up('md')]: {
      //   overflow: 'unset'
      // },
    },
    list: {
      marginTop: '10%',
    },
    listItem: {
      padding: '10px 20px',
      color: theme.grayColor,
      margin: '8px 0',
      '&:hover, &:focus': {
        background: 'rgba(152,152,152, 0.05)',
      },
    },
    listItemIcon: {
      minWidth: 38,
    },
    primaryListItemText: {
      fontSize: 16,
      fontFamily: theme.CircularStd_Book,
      display: 'flex',
      justifyContent: 'space-between'
    },
    //dropdown
    dropdown: {
      position: 'absolute',
      right: 24,
      top: 50,
      zIndex: 3,
      background: 'white',
      boxShadow: '0px 4px 4px rgba(202, 202, 202, 0.25)',
      borderRadius: 5,
      border: '1px solid #FAFAFA',
      width: 150,
      color: 'black',
      '& > div,p': {
        padding: '16px 18px',
        borderBottom: '1px solid #B5B5B5',
        cursor: 'pointer',
        '&:hover': {
          background: theme.lightColor,
        }
      },
      '& > div,p:first-child': {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      '& > div,p:last-child': {
        borderBottom: 'unset',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
    },
    dropdownMobile: {
      top: 70,
    },
    headerIconAdd: {
      height: 25,
      width: 25,
      color: 'rgba(0,112,201,1)',
      marginRight: 20,
      cursor: 'pointer',
    },
    headerIconSearch: {
      marginRight: 15,
      height: 25,
      width: 25,
    },
    NavbarProfile: {
      color: 'rgba(153,153,153,1)',
      borderTop: '1px solid #666666',
      paddingTop: 20,
      paddingBottom: 20,
      // marginBottom: 50,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& > $avatar': {
        marginLeft: 'unset'
      }
    },
    openAvatarNavbar: {
      marginBottom: 170,
    },
    fontBold: {
      fontFamily: theme.CircularTT_Bold,
      [themeDefault.breakpoints.down("xs")]: {
        wordBreak: 'break-all',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: 16,
        marginLeft: 10,
      },
      [themeDefault.breakpoints.down("md")]: {
        fontSize: 18,
      },
      [themeDefault.breakpoints.down("lg")]: {
        fontSize: '18px !important',
      },
      //  [themeDefault.breakpoints.down("sm")]:{
      //   fontSize: '14px !important',
      // },
      [themeDefault.breakpoints.down("md")]: {
        fontSize: '14px !important',
      },
      fontSize: 22,
      color: '#000',
      // fontWeight: '600',
    },
    // customButton: {
    //   padding:0
    // },
    support: {
      color: 'rgba(153,153,153,1)',
      // paddingTop: 188,
      marginBottom: 50,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& > $avatar': {
        marginLeft: 'unset'
      },
    },
    searchInput: {
      background: 'rgba(229, 241, 250, 0.4)',
      borderRadius: 5,
      '& $rootInputSearch': {
        border: 'unset',
        height: 40,
        paddingLeft: 20,
        paddingRight: 40,
      }
    },
    option: {
      height: 45,
      width: '100%',
      borderBottom: '1px solid #B5B5B5',
      '&:last-child': {
        borderBottom: 'unset',
      },
      '&[data-focus="true"]': {
        backgroundColor: '#E5F1F4',
      },
    },
    containerOption: {
      display: 'flex',
      // height: 45,
      width: '100%',
      padding: '0 22px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listbox: {
      maxHeight: 132,
      width: '100%',
      padding: 0,
      margin: 0,
      borderRadius: 5,
      boxShadow: '0px 4px 4px rgba(202, 202, 202, 0.25)',
      border: '1px solid #FAFAFA',
      background: '#FFFFFF',
    },
    titleSearch: {
      color: '#000000',
    },
    descriptionSearch: {
      color: '#B5B5B5',
    },
    popupIndicatorOpen: {
      transform: 'rotate(0deg)'
    },
    inputSearch: {
      fontFamily: theme.CircularStd_Book,
    },
    rootInputSearch: {
      //required
    },
    clearIndicator: {
      display: 'none',
    },
    popupIndicator: {
      paddingRight: 20,
    },
    focused: {
      background: 'red',
    },
    innerMenu1: {
      background: '#0C0C0C',
      borderBottom: '1px solid #666666',
      transition: '0.5s',
      [themeDefault.breakpoints.up('md')]: {
        // position: 'fixed',
        // top: 216,
        // left:265,
        position: 'fixed',
        top: 224,
        // left: 265,
        width: 225,
        left: -275,
        height: 0,
        paddingLeft: 25,
        paddingRight: 25,
        borderBottom: 'unset',
      },
      // [themeDefault.breakpoints.up('xl')]: {
      //   // position: 'fixed',
      //   // top: 216,
      //   // left:265,
      //   position: 'fixed',
      //   top: 'calc(0px + 8px)',
      //   left: 245,
      //   width: 225,
      //   paddingLeft: 24,
      //   paddingRight: 24,
      // },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    openInnerMenu1: {
      // transform: 'translateX(540px)',
      left: 265,
      // height: 391,
      height: 331,
    },
    innerMenu1Profile: {
      [themeDefault.breakpoints.up('md')]: {
        transform: 'translateY(-150px)',
        // height: '561px',
        height: '501px',
      },
      [themeDefault.breakpoints.up('xl')]: {
        transform: 'unset',
      },
    },
    innerMenu2: {
      // height: 500,
      // overflow: 'auto',
    },
    dropdownMapsFollowing: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    numTheme:{
      fontSize: 8,
      width: 18,
      height: 18,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      borderRadius: '50%',
      color: '#fff',
      background: '#DE4C73'
    }
  }),
  {
    name: 'Header',
    index: 1,
  }
);

export default useStyles;
