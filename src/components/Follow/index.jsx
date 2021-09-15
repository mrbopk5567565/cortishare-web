import React, { memo } from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import { Text, Buttons } from 'components'
import { useSelector } from 'react-redux';

const Follow = memo((props) => {
  const classes = useStyles();
  const customer = JSON.parse(localStorage.getItem('customer'))
  const { numberFollow, handleClick, isFollow, customerId } = props;
  const isOwner = customer && customer.customerId === customerId
  const loadingFollow = useSelector((state) => state.map.loadingFollow)

  return (
    <Grid
      container
      className={clsx(classes.root, (isFollow || isOwner || !customer) && classes.isFollow, (isOwner || !customer) && classes.isOwner)}
      wrap="nowrap"
    >
      <Grid item>
        <Text classes={{ root: classes.textFollow }} size="medium">{`${numberFollow} Followers`}</Text>
      </Grid>
      {!isOwner && customer &&
        <Grid item container justify="flex-end" className ={classes.wrapperBtnFollow}>
          <Buttons
            classes={{ 
              root: clsx(
                !isOwner && classes.btnFollowOwner, 
                classes.btnFollow,
                isFollow && classes.btnFollowed,
                props.checkPermissionFollow && classes.disabledBtnFollow,
              ),
            }}
            btnType="medium"
            disabled={loadingFollow}
            onClick={handleClick}
          >
            {isFollow ? 'Unfollow' : 'Follow'} Board
          </Buttons>
        </Grid>
      }
    </Grid>
  );
});

export default Follow;
