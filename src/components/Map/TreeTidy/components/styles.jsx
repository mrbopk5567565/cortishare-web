import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';
import Images from 'config/images'

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    root: {
    },
    container: {
      [themeDefault.breakpoints.down("xs")]: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
      width: 630,
      height: '90%',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
      position: 'relative',
    },
    containerBody: {
      padding: 0,
      width: '100%',
      '&:first-child': {
        padding: 0,
      }
    },
    //create map
    layoutLogin: {
      [themeDefault.breakpoints.down("xs")]: {
        marginTop: 20,
      },
      marginTop: '12%',
      paddingLeft: 50,
      paddingRight: 50,
    },
    layoutContainer: {
      width: '80%',
    },
    formLogin: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& > div > div > div ': {
        '& > textarea': {
          padding: '24px 30px',
          height: 60,
          alignItems: 'flex-start'
        },
        '& > input': {
          padding: '24px 30px',
        }
      },
      '& > div > p, & > p': {
        marginBottom: 5,
        display: 'flex',
        '& > img': {
          marginLeft: 5,
        }
      },
      '& > input[type="file"]': {
        display: 'none',
      },
    },
    btnLogin: {
      margin: '20px 0 10px'
    },
    inputLogin: {
      margin: '20px 0',
    },
    textDescription: {
      color: theme.mainColor,
      cursor: 'pointer'
    },
    textFooter: {
      fontSize: 20,
      '& > span': {
        color: theme.mainColor,
      }
    },
    containerButton: {
      marginBottom: 20,
      '& > p': {
        opacity: 0.5
      }
    },
    upload: {
      fontSize: 18,
      background: 'white',
      width: 'fit-content',
      color: theme.mainColor,
      borderRadius: 5,
      border: '1px solid #0070C9',
      borderColor: theme.mainColor,
      padding: '10px 20px',
      textTransform: 'none',
      marginBottom: '6%',
      cursor: 'pointer',
      '&:hover': {
        background: theme.mainColor,
        color: 'white',
      },
    },
    labelUpload: {
      display: 'flex',
      '& > p:last-child': {
        marginTop: '2%',
      }
    },
    radioGroup: {
      width: '85%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10%',
      '& > label > span': {
        color: '#1D1D1D',
        '&.MuiRadio-colorSecondary.Mui-checked': {
          color: theme.mainColor,
        }
      }
    },
    rootFormControl: {
      marginBottom: '5%',
      '& > div > svg': {
        position: 'absolute',
        top: '24px',
        right: '20px',
        pointerEvents: 'none',
      }
    },
    rootSelect: {
      padding: '24px 30px',
      color: 'black',
      fontSize: 18,
      backgroundColor: 'rgba(196, 196, 196, 0.1)',
      border: 'unset',
      borderRadius: '5px',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      appearance: 'none',
      background: 'transparent',
      backgroundImage: `url(${Images.icExpandMore})`,
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: '95%',
      backgroundPositionY: '50%',
      '&:focus': {
        backgroundColor: '#F9F9F9',
        border: 'unset',
        outline: 'unset',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
      },
    },
    label: {
      color: '#000',
      width: '100%',
      textAlign: 'left'
    },
    rootTooltip: {
      backgroundColor: 'white',
      color: 'black',
      padding: '13px 20px',
      boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.25)',
    },
    containerTooltip: {
      '& > p': {
        marginBottom: '6%',
        '&:last-child': {
          marginBottom: 0,
        }
      }
    },
    //tags
    containerTags: {
      width: '100%',
      marginBottom: '6%',
    },
    HeaderTitle: {
      fontSize: 18,
      lineHeight: '21px',
      paddingBottom: 20,
      fontFamily: 'CircularTT-Bold!important',
    },
    tagsinput: {
      position: 'relative',
      border: 'none',
      backgroundColor: '#F9F9F9',
      padding: '20px 30px',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
      },
    },
    reactTagsinputTag: {
      backgroundColor: theme.mainColor,
      color: 'white',
      padding: 10,
      borderRadius: '5px',
      marginRight: 8,
      fontSize: 18,
      marginBottom: 10,
      display: 'inline-block',
    },
    tags: {
      // width: '50px',
      fontSize: 18,
      outline: 'none',
      border: 'none',
      background: 'unset',
      '&:focus': {
        outline: 'none',
      },
      '&::placeholder': {
        color: '#999',
      }
    },
    icClose: {
      position: 'absolute',
      top: '2%',
      right: '2%',
      cursor: 'pointer',
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: theme.privateColor,
    },
  }),
  {
    name: 'CreateMap',
    index: 1,
  }
);
export const themeAutosuggest = {
  suggestionsList: {
    listStyle: 'none',
    paddingTop: 20,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.lightGray,
    overflow: "auto",
    maxHeight: 200,
    zIndex: 10000,
    width: 'calc(100% - 40px)'
  },
  suggestion: {
    padding: 16,
    cursor: 'pointer',
  },

  // suggestionsContainer: {

  // }
}

export default useStyles;
