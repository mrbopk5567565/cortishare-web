import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    closeTagWrapper: {
      height: 57,
      width: 'fit-content',
      paddingLeft: 20,
      paddingRight: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#FFFFFF',
      cursor: 'pointer',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      "@media (min-width:501px) and (max-width:1350px)": {
        // borderRadius: 5,
        // width: 192,
      },
    },
    closeTitleTag: {
      fontSize: 14,
      color: '#DE4C73',
      paddingTop: 3,
      marginLeft: 5
    }
  })
)

export default useStyles