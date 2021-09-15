import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
// import { CardCustomFeed } from 'components'
import { CardAccount } from 'components'
import clsx from 'clsx'
import { NotFoundItems } from 'components'
import useStylesCommon from 'utils/stylesCommon';

const LinkingMindsUsers = () => {
  // const dispatch = useDispatch();
  const classes = useStyles();
  // const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const searchAll = useSelector((state) => state.discover.searchAll)
  const classesCommon = useStylesCommon()

  return (
    <div
      className={searchAll.length !== 0 ? classesCommon.layout : classesCommon.layoutDefault}
    >
      <Grid
        container
        alignItems="center"
        classes={{
          root: classes.root,
          'spacing-xs-2': classes.spacingXS2,
        }}
        spacing={2}
      >
        {(!searchAll || (searchAll && !searchAll.length)) &&
          <Grid container direction="column" className={classes.wrapperNotfound}>
            <NotFoundItems />
          </Grid>
        }
        {searchAll && searchAll.map((item, index) =>
          <CardAccount item={item} index={index} />
        )}
      </Grid>
    </div>
  );
}

export default connect()(LinkingMindsUsers);