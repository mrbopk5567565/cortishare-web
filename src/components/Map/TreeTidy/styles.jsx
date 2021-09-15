import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    wrapperButtonClose: {
      position: 'absolute',
      top: -1,
      left: 1,
      // '@media(max-width: 1350px)': {
        
      // },
    },
    screenSizeSmall: {
      top: 60,
      left: 'unset',
      right: 0,
    },
    cusCloseButton: {
      borderBottomRightRadius: '5px !important',
      borderBottomLeftRadius: '5px !important',
    },
    wrapperButtonCloseMoble: {
      position: 'absolute',
      top: 79,
      left: 20,
    },
    mindmap: {
      '& > .map-container toolbar.rb': {
        // left: 80,
        // right: 'unset',
        // bottom: 'unset',
        // top: 20,
      },
      '& > .map-container': {
        '& > .map-canvas': {
          background: '#F3F3F3',
          '& > root > tpc': {
            borderRadius: 50,
            background: '#0070C9',
            color: '#FFFFFF',
            fontSize: 18,
          },
          '& > children.box > grp': {
            '& > t > tpc': {
              background: '#E3F0F9',
              border: '1px solid #000000',
              borderRadius: 50,
              color: '#000000',
              fontSize: 16,
            },
            '& > children grb t tpc': {
              background: '#FFFFFF',
              border: '1px solid #000000',
              borderRadius: 50,
              color: '#000000',
              fontSize: 16,
            }
          }
        },
        '& .box t tpc': {
          background: '#FFFFFF',
          border: '1px solid #000000',
          borderRadius: 50,
          color: '#000000',
          fontSize: 16,
        }
      }
    },
  })
)

export default useStyles