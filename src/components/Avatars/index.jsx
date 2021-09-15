import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const Avatars = (props) => {
  const classes = useStyles();
  const {
  } = props;


  return (
    <Avatar src={localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer')).profilePicture} alt="" classes={{ root: classes.avatarUser }} />
  );
};
export default Avatars;



