import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';
import Images from 'config/images'

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    container: {
      padding: '2% 7% 5% 7%',
      position: 'relative',
      '& $headerSection': {
        display: 'flex',
        justifyContent: 'space-between'
      },
    },
    closePostMobile: {
      position: 'absolute',
      top: '2%',
      right: 20,
      width: 20,
      cursor: 'pointer',
      display: 'none',
      '& img': {
        width: '100%',
      },
    },
    closePost: {
      width: 20,
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      right: '-30px',
      transform: 'translateY(-50%)',
      '& img': {
        width: '100%',
      },
    },
    // responsiveContainer: {
    //   padding: '5% 5% 5% 5%',
    //   '& $headerSection': {
    //     display: 'unset',
    //   },
    //   '& $containerButton': {
    //     marginTop: 10,
    //     display: 'flex',
    //     width: '100%',
    //     maxWidth: '100%',
    //     justifyContent: 'flex-start'
    //   },
    // },

    containerTitle: {
      width: 'calc(100% - 300 - 15px)',
      marginRight: 15,
      '& div > p': {
        color: themeConfig.grayColor,
      },
      '& div > p:first-child': {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        [themeDefault.breakpoints.down('xs')]: {
          fontSize: 25,
        },
      },
      '& $containerButton': {
        justifyContent: 'flex-end'
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: '100%',
      },
    },

    // xs-extra-split
    'xs-extra-split': {
      padding: '5% 5% 5% 5%',
      '& $headerSection': {
        display: 'unset',
      },
      '& $containerTitle': {
        width: '100%',
      },
      '& $containerButton': {
        display: 'none',
        // justifyContent: 'flex-start',
        // marginTop: 10,
        // display: 'flex',
      },
      '& $containerButtonMobile': {
        display: 'flex',
        // justifyContent: 'flex-start',
        // marginTop: 10,
        // display: 'flex',
      },
      '& $closePostMobile': {
        display: 'block',
      },
      '& $closePost': {
        right: 0,
      },
    },

    // xs-split
    'xs-split': {
      padding: '5% 5% 5% 5%',
      '& $headerSection': {
        display: 'unset',
      },
      '& $containerTitle': {
        width: '100%',
      },
      '& $containerButton': {
        display: 'none',
        // justifyContent: 'flex-start',
        // marginTop: 10,
        // display: 'flex',
      },
      '& $containerButtonMobile': {
        display: 'flex',
        // justifyContent: 'flex-start',
        // marginTop: 10,
        // display: 'flex',
      },
      '& $closePostMobile': {
        display: 'block',
      },
      '& $closePost': {
        right: 0,
      },
    },
    //sm-extra-split
    'sm-extra-split': {
      '& $containerTitle': {
        width: 'calc(100% - 143px)',
      },
      '& $containerButton': {
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 0,
        '& $linkRemove': {
          marginRight: 0,
          marginBottom: 10,
        }
      },
      '& $closePost': {
        right: 0,
      },
    },
    //sm-split
    'sm-split': {
      '& $containerTitle': {
        width: 'calc(100% - 143px)',
      },
      '& $containerButton': {
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 0,
        '& $linkRemove': {
          marginRight: 0,
          marginBottom: 10,
        }
      },
      '& $closePost': {
        right: 0,
      },
    },
    inputTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      width: '100%',
      outline: 'none',
      border: 'unset',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },

    textTitle: {
      maxWidth: 'calc(100% - 36px - 10px)',
      wordBreak: 'break-word',
      // whiteSpace: 'nowrap',
      // textOverflow: 'ellipsis',
      // overflow: 'hidden',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '-webkit-line-clamp': '2',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      fontSize: 30,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    iconEdit: {
      width: 36,
      height: 36,
      cursor: 'pointer',
      marginLeft: 10,
      [themeDefault.breakpoints.down('xs')]: {
        width: 24,
        height: 24,
      },
    },
    iconUpdate: {
      width: 25,
      marginBottom: -5,
      marginLeft: 5,
      cursor: 'pointer',
    },
    iconEditLabel: {
      cursor: 'pointer',
      marginLeft: 10,
      width: '16.67px'
    },
    description: {
      width: '100%',
      margin: '3% 0 2% 0',
      '& > p': {
        width: '100%',
      }
    },
    responsiveDescription: {
      margin: '3% 0 2% 0',
    },
    containerButton: {
      // maxWidth: '33%',
      // width: 'fit-content',
      position: 'relative',
      width: '300px',
      display: 'flex',
      // marginBottom: 20,
      '& $linkRemove': {
        marginRight: 23,
      },
      [themeDefault.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    btnSave: {
      fontSize: 18,
      padding: '6px 50px',
      fontFamily: themeConfig.CircularTT_Bold,
    },
    containerButtonMobile: {
      display: 'none',
      width: '100%',
      marginTop: 60,
      marginBottom: 40,
      '& $btnSave': {
        fontSize: 18,
        padding: '18px 65px',
        fontFamily: themeConfig.CircularTT_Bold,
      },
      [themeDefault.breakpoints.down('xs')]: {
        display: 'flex',
      },
    },
    headerSection: {
      display: 'flex',
      width: '100%',
      '& > div > p':{
        whiteSpace: 'nowrap',
      }
    },
    upload: {
      marginTop: 5,
      marginBottom: 10,
      fontSize: 18,
      background: 'white',
      width: 'fit-content',
      color: themeConfig.mainColor,
      borderRadius: 5,
      border: '1px solid #0070C9',
      borderColor: themeConfig.mainColor,
      padding: '10px 20px',
      textTransform: 'none',
      cursor: 'pointer',
      '&:hover': {
        background: themeConfig.mainColor,
        color: 'white',
      },
    },
    labelUpload: {
      display: 'flex',
    },
    containerVideo: {
      marginTop: 26,
      width: '100%',
    },
    preview: {
      marginTop: 26,
      width: '100%',
      // height: 280,
      height: 412,
      background: '#F6F6F6',
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23B5B5B5FF' stroke-width='3' stroke-dasharray='12' stroke-dashoffset='8' stroke-linecap='square'/%3e%3c/svg%3e")`,
      boxSizing: 'border-box',
      borderRadius: 10,
      // marginBottom: '6%',
      '& > p': {
        color: themeConfig.grayColor
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      cursor: 'unset',
    },
    previewReponsive: {
      height: 168,
    },
    previewUpload: {
      cursor: 'pointer',
    },
    radioGroup: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '3%',
      '& $rootRadioChecked': {
        color: themeConfig.mainColor,
      }
    },
    previewPdf: {
      '& > canvas': {
        width: '190px !important',
        height: '165px !important'
      }
    },
    rootFormControlLabel: {
      width: '100%',
      margin: 0
    },
    rootRadio: {
      color: '#1D1D1D',
    },
    rootRadioChecked: {
      // isRequired
    },
    subTitle: {
      fontSize: 18,
      color: themeConfig.grayColor,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: themeConfig.privateColor,
    },
    containerRadioChild: {
      paddingLeft: '42px',
      '& > p': {
        width: '100%',
      },
      '& > input[type="file"]': {
        display: 'none',
      },
    },
    input: {
      padding: '15px 24px',
      background: '#F9F9F9',
      border: 'none',
      fontSize: 16,
      width: 'calc(100% - 132px)',
      borderRadius: '10px 10px 10px 10px',
      '&:placeholder': {
        color: '#B5B5B5',
      },
    },
    containerUrl: {
      width: '100%',
      marginBottom: 24,
      '& > button': {
        padding: '15px 0px',
        fontSize: 14,
        background: themeConfig.lightColor,
        color: themeConfig.mainColor,
        '&:hover': {
          background: themeConfig.mainColor,
          color: 'white',
        }
      },
    },
    containerImagePreview: {
      width: '100%',
      marginTop: 26,
    },
    gridItem: {
      position: 'relative',
    },
    imagePreview: {
      width: 190,
      height: 165,
      objectFit: 'cover',
    },
    close: {
      cursor: 'pointer',
      position: 'absolute',
      left: '13px',
      top: '14px',
      zIndex: 1
    },
    textDescription: {
      marginTop: 10,
      width: '100%',
      fontSize: 14,
      background: '#F9F9F9',
      overflow: 'hidden',
      '& > div': {
        fontSize: 18,
      },
      '& > .ql-container > .ql-editor.ql-blank::before': {
        fontSize: 14,
        color: '#B5B5B5',
        fontStyle: 'normal',
      },
      '& > .ql-toolbar.ql-snow': {
        margin: '0 10px',
        border: 'none !important',
        borderBottom: '1px solid #E0E0E0 !important',
        padding: '10px 0px',
        '& > span > button': {
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& > .ql-formats': {
          marginRight: 10,
          [themeDefault.breakpoints.down('xs')]: {
            marginRight: 7,
          },
        },
        '& > .ql-formats:last-child': {
          marginRight: 0,
        }
      },
      '& >.ql-container': {
        '& > .ql-editor': {
          height: 300,
        },
        
        // maxHeight: 500,
        overflow: 'hidden',
        overflowY: 'auto',
        overflowX: 'auto',
        border: 'none !important',
        height: 'fit-content',
      }
    },
    responsiveTextDescription: {
      '& > .ql-toolbar > span:last-child': {
        float: 'unset',
      },
    },
    linkRemove: {
      textAlign: 'center',
      '& > span': {
        fontFamily: themeConfig.CircularTT_Bold,
        fontSize: 18,
        color: '#DE4C73',
      },
    },
    autoSaveDisplay: {
      display: 'flex', 
      alignItems: 'center',
      '& img': {
        width: 30,
        marginRight: 5,
      }
    },
  }),
  {
    name: 'NewPost',
    index: 2,
  }
);

export default useStyles
