import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: 20,
      background: '#F8F8F8',
    },
    containerCard: {
      // maxWidth: 632,
      // height: 412,
      minHeight: 412,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      
    },
    containerCardReponsive: {
      minHeight: 250,
      '& $reactPlayer': {
        '& >.react-player__preview': {
          minHeight: 250,
        },
        '& > div': {
          '& iframe': {
            minHeight: 250,
          },
        }
      },
      '& $showDuration': {
        top: 5,
        right: 5,
      }
    },
    hidden: {
      '& $reactPlayer': {
        display: 'none'
      },
      '& $containerImage': {
        height: 0,
      }
    },
    containerImage: {
      width: '100%',
      height: '100%',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      '& > .lazyload-wrapper': {
        width: '100%',
      }
    },
    lazyLoad: {
      height: '100%'
    },
    reactPlayer: {
      display: 'block',
      '& > div': {
        '& iframe': {
          minHeight: 412,
          minWidth: '100%',
          width: '100%',
        },
      },
      '& .fb-video,div': {
        '& > span': {
          width: '100% !important',
          height: 'unset !important',
        }
      },
      '& >.react-player__preview': {
        // width: '632px !important',
        // height: '412px !important',
        minHeight: 412,
      }
    },
    isLoading: {
      height: '100%',
    },
    showDuration: {
      background: 'rgba(0, 0, 0, 0.25)',
      borderRadius: '50px',
      width: '40px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      color: '#fff',
      justifyContent: 'center',
      position: 'absolute',
      top: '15px',
      right: '15px',
      zIndex: 10,
      padding: '5px',
      width: 'fit-content',
      height: 'fit-content',
    },
  }),
  {
    name: 'VideoCustom',
    index: 1,
  }
);

export default useStyles;
