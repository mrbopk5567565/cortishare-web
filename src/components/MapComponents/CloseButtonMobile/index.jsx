import React from 'react'
import Images from 'config/images'
import useStyles from './styles'
import { Box } from '@material-ui/core'


const CloseButtonMobile = ({handleClick}) =>{
  const classes = useStyles()
  return (
    <Box className={classes.closeTagWrapper} onClick={handleClick}>
      <img src={Images.icCloseRed} />
      <div className={classes.closeTitleTag}>Exit Suggestions</div>
    </Box>
  )
}

export default CloseButtonMobile