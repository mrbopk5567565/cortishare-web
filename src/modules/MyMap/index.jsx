import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MapDetail from './MapDetail'
import { Header } from 'components'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // height: '100vh'
      position: 'relative',
    }
  })
);

const data = [
  {
    label: 'Plant',
    url: '/plant-taxonomy',
  },
  {
    label: 'Paper Plants',
    url: '/paper-plants',
  },
  {
    label: 'image',
    url: '/',
  },
]

const MyMap = ({ match }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header match={match} isDark={true} privacy="public" dataBreadcrumbs={data} />
      <MapDetail />
    </div>
  );
}

export default MyMap;
