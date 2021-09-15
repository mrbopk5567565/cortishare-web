import React from 'react'
import { checkLongString } from 'helpers'
import useStyles from './styles';
import { Grid, Avatar } from '@material-ui/core';
import { Text, Tooltips } from 'components'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';


export default function CardAccount({
  item,
  index
}) {
  const classes = useStyles();
  const history = useHistory();
  console.log(item);
  const handleClick = (id) => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer || !customer.customerId) {
      return
    } else {
      if (customer.customerId === id) {
        history.push({
          pathname: `/profile`,
        })
      } else {
        history.push({
          pathname: `/search/profile/${id}`,
        })
      }
    }
  }

  return (
    <Grid
      container
      onClick={() => handleClick(item.id || item.customerId)}
      item
      // xs={6} sm={4} md={3} lg={2}
      direction="row"
      alignItems="center"
      key={index}
      classes={{ root: clsx(classes.card) }}
    >
      <Grid container classes={{ root: classes.containerAvatar }}>
        <Avatar src={item.profilePicture} alt="" classes={{ root: classes.avatar }} />
      </Grid>
      <div className={classes.info}>
        <Tooltips title={item.fullName || item.userName || ''}>
          <Text size="medium" classes={{ root: classes.textFullName }}>{checkLongString(item.fullName || item.userName, 20, 15)}</Text>
        </Tooltips>
        <Grid container alignItems="center" justify="space-evenly" classes={{ root: classes.notification }}>
          <div  >
            <p className={classes.text}>{item.mapCount}</p>
            <p className={classes.text}>{item.mapCount > 1 ? " boards" : " board"}</p>
          </div>
          <div >
            <p className={classes.text}>{item.postCount} </p>
            <p className={classes.text}>{item.postCount > 1 ? " new posts" : " new post"}</p>
          </div>
        </Grid>
      </div>
    </Grid>
  )
}