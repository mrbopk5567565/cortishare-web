import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';
// import themeConfig from 'config/theme';
import Images from 'config/images'

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    container: {
      padding: '20px 50px',
      position: 'relative',
      height: 'fit-content',
      [themeDefault.breakpoints.down('xs')]: {
        padding: '20px',
      }
    },
    wrapperNode: {
      width: '100%',
    },
    // wrapperTitle: {
    //   width: 'calc(100% - 80px)',
    //   [themeDefault.breakpoints.down('xs')]: {
    //     width: '100%',
    //   }
    // },
    // wrapperTitleNotPermission: {
    //   width: 'calc(100% - 33px)',
    //   [themeDefault.breakpoints.down('xs')]: {
    //     width: '100%',
    //   }
    // },

    containerHeaderContent: {
      width: '100%',
    },
    containerHeaderIcon: {
      display: 'flex',
      /* paddingTop: 15, */
    },
    containerContent: {
      // required
    },
    containerContentLeft: {
      marginBottom: 10,
    },
    containerTitleMobile: {
      marginBottom: 10,
    },

    dropdown: {
      marginRight: -100,
      paddingRight: 100,
      [themeDefault.breakpoints.down('xs')]: {
        paddingBottom: '100px',
      }
    },
    topTitle: {
      width: '100%',
      fontSize: 18,
      color: theme.grayColor,
      display: 'flex',
      alignItems: 'flex-start',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
      '& span': {
        width: 'fit-content',
        lineHeight: 1.5,
      },
      '& .customBreadcrumb': {
        width: '100%',
        lineHeight: 1.5,
        '& ol': {
          '& li': {
            '&:not([aria-hidden=true])': {
              // alignItems: 'center',
              // width: '100%',
              '& div': {
                display: 'flex',
                '& a': {
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  textOverflow: 'ellipsis',
                }
              }
            }
          }
        }
      }
    },
    subTitle: {
      fontSize: 18,
      color: theme.grayColor,
      display: 'block',
      whiteSpace: 'break-spaces',
      '& > nav': {
        marginLeft: 3,
      },
      '& > span': {
        cursor: 'unset',
      },
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 16,
      },
      // fontSize: 18,
      // letterSpacing: 'unset',
      // '& > span': {
      //   color: themeConfig.mainColor,
      //   paddingLeft: 2,
      // },
      // '& > p': {
      //   marginLeft: 2,
      // },
    },
    containerTitle: {
      width: '100%',
      '& > p:nth-child(1)': {
        color: theme.grayColor,
      },
      '& > p:nth-child(2)': {

      },
      '& > p:last-child': {

      }
    },
    title: {
      color: 'black',
      fontSize: 30,
      lineHeight: 'normal',
      fontWeight: 'bold',
      letterSpacing: 'unset',
      // width: '100%',
      // wordBreak: 'break-all',
      // whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '-webkit-line-clamp': '2',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      wordBreak: 'break-word',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    author: {
      color: '#0070C9',
      cursor: 'pointer',
    },
    notAuthor: {
      cursor: 'unset',
    },
    viewMore: {
      color: theme.mainColor,
      cursor: 'pointer',
    },
    // viewMore: {
    //   '& span': {
    //     // wordBreak: 'break-word',
    //     fontSize: 16,
    //     [themeDefault.breakpoints.down('xs')]: {
    //       fontSize: 15,
    //     },
    //   },
    //   '& a': {
    //     color: theme.mainColor,
    //     "text-decoration-line": 'none',
    //   }
    // },
    containerDescription: {
      width: '100%',
      marginTop: 20,
      marginBottom: 20,
      wordBreak: 'break-word',
      '& a': {
        textDecoration: 'none'
      }
    },
    description: {
      // whiteSpace: 'normal',
      '-webkit-line-clamp': '3',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
    },
    descriptionShow: {
      '-webkit-line-clamp': 'unset',
      display: 'block',
      '-webkit-box-orient': 'unset',
      overflow: 'unset',
      textOverflow: 'unset',
      wordBreak: 'unset',
    },
    tags: {
      marginBottom: '40px',
      [themeDefault.breakpoints.down('xs')]: {
        marginBottom: '30px',
      },

    },
    tagsItem: {
      padding: '10px 10px 10px 10px',
      color: theme.mainColor,
      background: '#F1F1F1',
      marginRight: '10px',
      borderRadius: 5,
      maxWidth: 'calc(100% - 20px )',
      marginBottom: 10,
      fontSize: 14,
    },
    tagsItemText: {
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    icon: {
      position: 'absolute',
      right: -12,
      top: '50%',
      zIndex: 1,
    },
    right: {
      height: '100%',
    },
    containerFollows: {
      // marginTop: 5,
    },
    containerFollowsMap: {
      // marginTop: 20,
    },
    mind: {
      display: 'flex',
      width: 'fit-content',
      height: 'fit-content',
      borderRadius: 5,
      alignItems: 'center',
      background: '#E5F1F4',
      padding: '10px 24px',
      '& > p': {
        marginRight: 8,
      },
      [themeDefault.breakpoints.down('xs')]: {
        padding: '10px',
      },
    },
    iconLogoMap: {
      width: 30,
      marginRight: 20,
      [themeDefault.breakpoints.down('xs')]: {
        width: 25,
      },
    },

    // xs-extra-split
    'xs-extra-split': {
      padding: '20px 20px',
      '& $containerContent': {
        flexDirection: 'column'
      },
      '& $containerContentLeft': {
        marginBottom: 0,
      },
      '& $btnAdd': {
        fontSize: 12,
        padding: '8px',
      },
      '& $btnFollow': {
        fontSize: 12,
        padding: '8px',
      },
      '& $iconLogoMap': {
        width: 25,
      },
    },

    // xs-split
    'xs-split': {
      padding: '20px 20px',
      '& $containerContent': {
        flexDirection: 'column'
      },
      '& $containerContentLeft': {
        marginBottom: 0,
      },
      '& $btnAdd': {
        fontSize: 16,
        padding: '8px',
      },
      '& $btnFollow': {
        fontSize: 16,
        padding: '8px',
      },
      '& $iconLogoMap': {
        width: 25,
      },
    },
    //sm-extra-split
    'sm-extra-split': {
      '& $containerContent': {
        flexDirection: 'column'
      },
    },
    //sm-split
    'sm-split': {
      '& $containerContent': {
        flexDirection: 'column'
      },
    },
    containerDropdown: {
      position: 'absolute',
      top: 30,
      right: 6,
      display: 'flex',
    },
    containerDropdownWithMind: {
      top: 37,
      [themeDefault.breakpoints.down('xs')]: {
        top: 13,
        right: 7,
      },
    },
    containerShare: {
      right: 50,
    },

    quantityPosts: {
      marginBottom: 20,
      fontSize: 20,
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    spacing30: {
      marginBottom: 30,
    },
    iconAddPost: {
      marginLeft: 7,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > img': {
        width: 20,
        height: 20,
      }
    },
    btnAdd: {
      height: 40,
      width: 'fit-content',
      padding: '8px 15px',
      marginRight: 10,
      fontSize: 18,
      whiteSpace: 'nowrap',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 16,
        padding: '8px',
      },
      [themeDefault.breakpoints.down('450')]: {
        fontSize: 13,
      },
      [themeDefault.breakpoints.down('380')]: {
        fontSize: 12,
      },
    },
    btnFollow: {
      width: 'fit-content',
      height: 40,
      padding: '8px 15px',
      background: theme.privateColor,
      border: `1px solid ${theme.privateColor}`,
      color: 'white',
      fontSize: 18,
      whiteSpace: 'nowrap',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 16,
        padding: '8px',
      },
      [themeDefault.breakpoints.down('450')]: {
        fontSize: 13,
      },
      [themeDefault.breakpoints.down('380')]: {
        fontSize: 12,
      },
      '&:hover': {
        background: theme.privateColor,
        color: 'white',
      }
    },
    btnFollowed: {
      background: 'unset',
      color: theme.mainColor,
      border: `1px solid ${theme.mainColor}`,
      '&:hover': {
        background: 'unset',
        color: theme.mainColor,
      }
    },
    disabledBtnFollow: {
      border: 'unset',
      background: theme.grayColor,
      color: '#FFFFFF',
      '&:hover': {
        background: theme.grayColor,
        color: '#FFFFFF',
      }
    },
    noScroll: {
      overflow: 'hidden !important'
    }
  }),
  {
    name: 'MapDetailMain',
    index: 2,
  }
);

export default useStyles
