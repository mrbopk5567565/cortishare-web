import React, { memo } from 'react';
import useStyles from './styles';
import logo from '../../asset/img/ic-loading.gif'
import clsx from 'clsx'
import Images from 'config/images'

const LoadingIconMore = memo(({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.loadingWrapper, className && classes[className])}>
      <img src={logo} alt="loading-more" />
    </div>
  );
});
export default LoadingIconMore;
