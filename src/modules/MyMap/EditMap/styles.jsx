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
    containerHeader: {
      position: 'relative',
      marginBottom: 20,
      width: '80%',
      margin: '0 auto',
    },
    label: {
      color: '#000'
    },
    containerBody: {
      padding: 0,
      paddingTop: '0 !important',
      width: '100%',
    },
    //create map
    layoutLogin: {
      marginTop: 28,
      marginBottom: '12%',
    },
    layoutContainer: {
      width: '80%',
    },
    HeaderTitle: {
      fontSize: 18,
      lineHeight: '21px',
      color: '#000000',
      position: 'relative',
    },
    tagsinput: {
      position: 'relative',
      border: 'none',
      backgroundColor: '#F9F9F9',
      padding: '20px 30px',
      borderRadius: '5px',
      maxWidth: '100%',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
      },
    },
    tags: {
      width: '100%',
      fontSize: 18,
      outline: 'none',
      border: 'none',
      background: 'unset',
      width:'-webkit-fill-available',
      '&:focus': {
        outline: 'none',
      },
      '&::placeholder': {
        color: '#999',
      }
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
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    formLogin: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '60%',
      '& > div > div > div > input': {
        padding: '24px 30px',
        '&[name="description"]': {
          padding: '24px 30px',
          height: 60,
          alignItems: 'flex-start'
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
      marginBottom: '5%',
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
    containerTags: {
      marginBottom: '6%',
      '& > button': {
        marginRight: 10,
      }
    },
    rootTooltip: {
      backgroundColor: 'white',
      color: 'black',
      padding: '13px 20px',
      boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.25)',
    },
    containerTooltip: {
      '& > p': {
        marginBottom: '5%',
        '&:last-child': {
          marginBottom: 0,
        }
      }
    },
    icClose: {
      position: 'absolute',
      top: '0',
      right: '0',
      cursor: 'pointer',
    },
    textError: {
      marginTop: 10,
      fontSize: 14,
      color: theme.privateColor,
    },
    nameUpload: {
      marginLeft: 12
    },
    imagePreview: {
      [themeDefault.breakpoints.down("sm")]: {
        maxHeight: 350,
        objectFit: 'cover'
      }
    }
  }),
  {
    name: 'EditMap',
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
