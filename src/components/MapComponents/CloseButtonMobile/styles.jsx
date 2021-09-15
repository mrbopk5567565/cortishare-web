import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    closeTagWrapper:{
      
      padding: '6px 14px',
      display:'flex',
      background: '#FFFFFF',
      cursor: 'pointer',
      borderRadius: 20,
      '& img':{
        width: 19,
        paddingTop: 1
      }
    },
    closeTitleTag:{
      fontSize: 13,
      color: '#DE4C73',
      paddingTop: 3,
      marginLeft: 5
      
    }
  })
)

export default useStyles 