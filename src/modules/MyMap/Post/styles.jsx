import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    container: {
      paddingBottom: '20px',
      position: 'relative',
      height: 'fit-content',
    },
    // containerDropdown: {
    //   position: 'absolute',
    //   top: 28,
    //   right: 10,
    // },
    containerDropdownMind: {
      top: 36,
    },
    containerShare: {
      right: 50,
    },
    iconNav: {
      right: '6%',
      position: 'absolute',
      top: '2%',
    },
    containerHeader: {
      padding: '25px 50px 36px',
      position: 'relative',
      [themeDefault.breakpoints.down('xs')]: {
        padding: '15px 20px 15px',
      },
    },
    containerTitleMobile: {
      padding: '0px 20px 15px',
    },
    containerAddMobile: {
      padding: '0px 20px 30px',
    },
    containerHeaderContent: {
      width: '100%',
    },
    containerContent: {
      // required
    },
    containerContentLeft: {
    },
    containerContentRight: {
    },
    containerHeaderIcon: {
      display: 'flex',
      // [themeDefault.breakpoints.down('xs')]: {
      //   display: 'block',
      // },
      // '@media(max-width:320px)': {
      //   marginLeft: -15,
      // }
     /* paddingTop: 15, */
    },
    containerHeaderLeft: {
      marginBottom: 5,
    },
    icLinkPost: {
      marginLeft: 8,
      '& > div': {
        width: 30,
        height: 30,
        '& > button': {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      },
    },
    containerBottom: {
      margin: '0px auto 20px',
      width: '60%',
      '& .ql-editor': {
        height: 'fit-content',
        paddingLeft: 0,
        paddingRight: 0,
        '& ol':{
          paddingLeft: 0
        },
        '& img':{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          maxHeight: '400px',
        },
      },
    },
    // content: {
    //   fontSize: 18,
    //   color: themeConfig.normalColor,
    //   wordBreak: 'break-word',
    //   '& p': {
    //     'margin-block-end': '0.5em',
    //     'margin-block-start': '0.5em'
    //   }
    // },

    title: {
      width: '100%',
      lineHeight: 'normal',
      fontSize: 30,
      fontWeight: 'bold',
      wordBreak: 'break-word',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '-webkit-line-clamp': '1',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    subTitle: {
      fontSize: 18,
      color: themeConfig.grayColor,
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      '& > nav': {
        // margin: '-1px 3px',
      },
      '& span': {
        width: 'fit-content',
        lineHeight: 1.5,
      },
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
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
    info: {
      // width: '100%',
      fontSize: 18,
      marginTop: 3,
      color: themeConfig.grayColor,
      '& > span': {
        color: themeConfig.mainColor
      },
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 13,
      },
    },
    notAuthor: {
      '& > span': {
        cursor: 'unset'
      }
    },
    textError: {
      marginTop: 10,
      color: 'red'
    },
    containerComment: {
      margin: '3% 0',
    },
    comment: {
      margin: '2% 0',
      display: 'flex',
    },
    commentInfo: {
      wordBreak: 'break-word',
      marginLeft: 10,
      display: 'block',
      '& > p': {
        fontSize: 14,
        '&:last-child': {
          fontSize: 12,
          color: themeConfig.grayColor,
        }
      }
    },
    avatar: {
      width: '37px',
      height: '37px',
    },
    avatarUser: {
      width: '38px',
      height: '38px',
    },
    input: {
      padding: '20px 24px',
      background: '#F7F7F7',
      border: 'none',
      fontSize: 16,
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: '0px 10px 10px 10px',
      '&:placeholder': {
        color: themeConfig.grayColor,
      },
      [themeDefault.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    commentUser: {
      width: '100%',
      '& > div > button': {
        padding: '18px 30px',
        fontSize: 14,
        background: themeConfig.lightColor,
        color: themeConfig.mainColor,
        '&:hover': {
          background: themeConfig.mainColor,
          color: 'white',
        }
      },
    },
    postTitle: {
      display: 'flex',
      alignItems: 'baseline',
      color: themeConfig.grayColor,
      '& > nav': {
        paddingLeft: 2,
      }
    },
    buttonPost: {
      textTransform: 'capitalize',
    },

    // xs-extra-split
    'xs-extra-split': {
      '& $containerHeader': {
        padding: '15px 20px 0',
      },
      '& $containerAddMobile': {
        padding: '0px 20px 30px',
      },
      '& $containerBottom': {
        width: '90%',
      },
      '& $title': {
        // width: '100%',
      },
      '& $input': {
        padding: '12px 20px'
      },
      '& $buttonPost': {
        padding: '11px 14px'
      },
      '& $containerHeaderLeft': {
      },
      '& $containerContent': {
        flexDirection: 'column'
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
      '& $containerHeader': {
        padding: '15px 20px 0',
      },
      '& $containerAddMobile': {
        padding: '0px 20px 30px',
      },
      '& $containerBottom': {
        width: '90%',
      },
      '& $title': {
        // width: '100%',
      },
      '& $input': {
        padding: '12px 20px'
      },
      '& $buttonPost': {
        padding: '11px 14px'
      },
      '& $containerHeaderLeft': {
      },
      '& $containerContent': {
        flexDirection: 'column'
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
      '& $containerHeaderLeft': {
      },
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
    containerAddToOrtherMap: {
      // marginRight: 96,
      // marginTop: 10,
    },
    commentLoadingSection: {
      width: 80,
      margin: '0 auto',
    },
    iconLogoMap: {
      width: 30,
      marginRight: 20,
      [themeDefault.breakpoints.down('xs')]: {
        width: 25,
      },
    },
    mind: {
      width: 'max-content',
      display: 'flex',
      height: 'fit-content',
      borderRadius: 5,
      alignItems: 'center',
      background: '#E5F1F4',
      padding: '10px 24px',
      // marginRight: 56,
      '& > p': {
        marginRight: 8,
        [themeDefault.breakpoints.down('xs')]: {
          fontSize: 15,
        },
      },
      [themeDefault.breakpoints.down('xs')]: {
        padding: '10px',
      },

    },
    btnAdd: {
      height: 40,
      width: 'fit-content',
      padding: '8px 15px',
      whiteSpace: 'nowrap',
      marginRight: 10,
      fontSize: 18,
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
      background: themeConfig.privateColor,
      border: `1px solid ${themeConfig.privateColor}`,
      color: 'white',
      whiteSpace: 'nowrap',
      fontSize: 18,
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
        background: themeConfig.privateColor,
        color: 'white',
      },
      
    },
    btnFollowed: {
      background: 'unset',
      color: themeConfig.mainColor,
      border: `1px solid ${themeConfig.mainColor}`,
      '&:hover': {
        background: 'unset',
        color: themeConfig.mainColor,
      }
    },
    disabledBtnFollow: {
      border: 'unset',
      background: themeConfig.grayColor,
      color: '#FFFFFF',
      '&:hover': {
        background: themeConfig.grayColor,
        color: '#FFFFFF',
      }
    },
  }),
  {
    name: 'Post',
    index: 2,
  }
);

export default useStyles;
