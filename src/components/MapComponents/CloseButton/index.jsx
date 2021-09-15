import React from 'react'
import Images from 'config/images'
import useStyles from './styles'
import { Box } from '@material-ui/core'


const CloseButton = ({handleClick, textButton = 'Exit Suggestions'}) =>{
  const classes = useStyles()
  return (
    <Box className={classes.closeTagWrapper} onClick={handleClick}>
      <img src={Images.icCloseRed} />
      <div className={classes.closeTitleTag}>{textButton}</div>
    </Box>
  )
}

export default CloseButton