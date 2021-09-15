import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const Text = React.forwardRef((props, ref) => {
  const styles = useStyles();
  const {
    disabled,
    color,
    size, 
    level,
    type, 
    children,
    handleClick,
    classes,
    component = "p",
    align = 'inherit',
    ...rest
  } = props;

  // for tooltip
  const { onMouseOver, onMouseLeave } = rest;

  // let title = children.toString().split(",[object Object]")[0]
  return (
    <Typography
      className={
        clsx(
          styles.root,
          type === 'bold' && styles.bold,
          type === 'normal' && styles.normalWeight,
          handleClick && styles.link,
          size === 'biger' && styles.sizeBiger,
          size === 'big' && styles.sizeBig,
          size === 'large' && styles.sizeLarge,
          size === 'medium' && styles.sizeMedium,
          size === 'small' && styles.sizeSmall,
          size === 'mini' && styles.sizeMini,
          level === 'title' && styles.title,
          color === 'tooBlur' && styles.tooBlur,
          color === 'blur' && styles.blur,
          color === 'normal' && styles.normal,
          color === 'mainColor' && styles.mainColor,
        )
      }
      onClick={handleClick}
      // title={children ? title : null}
      classes={classes}
      ref={ref}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      variant="inherit"
      component={component}
      align={align}
    >
      {children}
    </Typography>
  );
});
export default Text;



