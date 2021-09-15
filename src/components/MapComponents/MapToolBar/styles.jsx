import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((themeDefault) =>
  createStyles({
    // wrapperMobileToolbar: {
    //   width: '100%',
    //   height: 37,
    //   borderRadius: '0px 0px 10px 10px'
    // },
    // wrapperDestopToolbar: {
    //   borderRadius: '0px 0px 0px 5px'
    // },
    wrapperToolbar: {
      display: 'flex',
      paddingTop: 13,
      paddingBottom: 13,
      background: '#FFFFFF',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10,
      borderRadius: '0px 0px 0px 5px',
      [themeDefault.breakpoints.down("xs")]: {
        borderRadius: '0px 0px 10px 10px',
        width: '100%',
        height: 37,
      },
    },
    toolbar: {
      display: 'flex',
      '& img': {
        cursor: 'pointer'
      },
      '& > *': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      '& > .item': {
        borderRight: '1px solid rgba(0,0,0,0.2)'
      },
      '& > .colab': {
        '& > .colabborator': {
          fontSize: 16,
          color: '#999999'
        },
        '& > .colabInvite': {
          cursor: 'pointer',
          color: '#0070C9',
          fontSize: 16,
          textAlign: 'center',
        }

      },
      '& > .view-dropdown': {
        '& > img': {
          width: 24,
          height: 24,
          marginLeft: 7,
        },
        '& > .viewTitle': {
          fontSize: 16,
          color: '#000000'
        }
      },
      '& > .to-center': {
        '& > img': {
          width: 20,
          height: 20
        }
      },
      '& > .zoom-in-out': {
        '& > img': {
          width: 31,
          height: 31
        }
      },
      '& > .full-screen': {
        '& > img': {
          width: 24,
          height: 24
        }
      },
    },
    mobileToolbar: {
      width: '100%',
      '& > .zoom-in-out': {
        display: 'none'
      },
      '& > .full-screen': {
        display: 'none'
      },
      '& > .colab': {
        flex: 4,
        order: 1,
        '& > .colabborator': {
          marginRight: 10
        },
      },
      '& > .view-dropdown': {
        flex: 2,
        order: 2,
        '& > .viewTitle': {
        },
      },
      '& > .to-center': {
        flex: 1,
        order: 0
      },
      '& > .close-map': {
        flex: 1,
        order: 3
      },
      '& > .select-close': {
        flex: 1,
        order: 3
      }
    },
    destopToolbar: {
      '& > .colab': {
        // width: 211,
        width: 'fit-content',
        padding: '0px 20px',
        '& > .colabborator': {
          marginRight: 18
        },
      },
      '& > .view-dropdown': {
        width: 105,
        '& > .viewTitle': {
        }
      },
      '& > .to-center': {
        width: 64
      },
      '& > .full-screen': {
        width: 58
      },
      '& > .zoom-in-out': {
        width: 94,
        '& > .zoom-out-ic': {
          marginRight: 4
        }
      },
      '& > .close-map': {
        display: 'none',
      }
    }
  }),
);

export default useStyles
