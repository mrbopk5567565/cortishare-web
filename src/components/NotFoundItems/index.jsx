import React from 'react';
import useStyles from './styles';

const NotFoundItems = ({ isMap = false, checkPermission }) => {

  const classes = useStyles()
  return (
    <>
      <div className={classes.notFound1}>
        {isMap ? 'There are currently no posts in this node yet.' : 'Sorry we cannot find what you looking for!'}
      </div>
      <div className={classes.notFound2}>
        {isMap  ?
          ((checkPermission  ) ? 'Click + to create one.' : '') : 'Maybe give one of these a try?'
        }

      </div>
    </>
  )
}
export default NotFoundItems