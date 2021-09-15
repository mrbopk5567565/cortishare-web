import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FollowingMain from './FollowingMain'
import Follower from './Follower'
import { Loading } from 'components'
import { useSelector } from 'react-redux';
import useStylesCommon from 'utils/stylesCommon';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const Following = () => {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.global.isLoading)
  // const classesCommon = useStylesCommon()
  // const [flag, setFlag] = useState(true)
  // const [typeSelect, setTypeSelect] = useState('maps');

  // const setDefault = () => {
  //   setFlag(false);
  // }

  return (
    <div className={classes.root}>
      {/* <Grid container classes={{ root: classesCommon.layout }}>
        <button className={clsx(classes.btn, typeSelect === "maps" && classes.active)} onClick={() => {
          setTypeSelect('maps');
          setFlag(true)
        }
        } >Maps</button>
        <button className={clsx(classes.btn, typeSelect === "users" && classes.active)} onClick={() => {
          setTypeSelect('users');
          setFlag(true)
        }}>Users</button>
      </Grid> */}
      <div className={classes.FollowingWrapper}>
        {isLoading && <Loading />}
        {/* {typeSelect === 'maps' && <FollowingMain setDefault={setDefault} />}
        {typeSelect === 'users' && <Follower setDefault={setDefault} />} */}
         <FollowingMain />
      </div>

    </div>
  );
}

export default Following;
