import React, { memo } from 'react';
import useStyles from './styles';
import { CardCustom } from 'components'
import { Grid } from '@material-ui/core'
import clsx from 'clsx'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { NotFoundItems, MapEmpty } from 'components'
const LayoutMap = memo(({ mapData }) => {
  const classes = useStyles();
  const matchProfile = useRouteMatch('/profile');
  const matchProfileOther = useRouteMatch('/search/profile/:id');

  return (
    <div className={classes.containerLayout}>
      <Grid
        container
        classes={{
          root: classes.containerMap,
          'spacing-xs-2': classes.spacingXS2
        }}
        spacing={2}
        // justify="center"
      >
        {(!mapData || (mapData && !mapData.length)) &&
          <Grid container direction="column" className={classes.wrapperNotfound}>
            {matchProfile && <MapEmpty isProfile={matchProfile} isCreate={true} content="You don’t have any Boards yet" />}
            {matchProfileOther && matchProfileOther.isExact && <MapEmpty isProfile={matchProfileOther} isCreate={false} content="No Boards to view yet" />}
            {!matchProfile && !matchProfileOther && <NotFoundItems />}
          </Grid>
        }
        {mapData.map((item, index) =>
          <Grid item 
            // xs={6} sm={4} md={3} xl={2} 
            key={index} classes={{ root: clsx(classes.card, classes.containerItem) }}
          >
            <CardCustom item={item} />
          </Grid>
        )}
      </Grid>
    </div>
  );
});
export default LayoutMap;
