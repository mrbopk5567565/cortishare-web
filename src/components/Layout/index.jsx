import React, { memo } from 'react';
import useStyles from './styles';
import { Grid } from '@material-ui/core'
import clsx from 'clsx'
import { useRouteMatch } from 'react-router-dom';

const Layout = memo(({ children }) => {
  const classes = useStyles();
  const matchHome = useRouteMatch('/');
  const matchLinking = useRouteMatch('/search/linking-minds');
  const matchSearch = useRouteMatch('/search');

  return (
    <Grid 
      container
      justify="center"
      classes={{ 
        root: clsx(
          classes.layoutCommon, 
          (
            (matchHome && matchHome.isExact) ||
            (matchLinking && matchLinking.isExact) ||
            (matchSearch && matchSearch.isExact)
          ) && classes.layoutHome
        )
      }}
    >
      {children}
    </Grid>
  );
});
export default Layout;
