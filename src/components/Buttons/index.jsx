import React, { memo } from 'react';
import { Button, colors } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import { push } from 'connected-react-router';
const Buttons = memo((props) => {
  const style = useStyles();
  const { disabled, btnType, children, onClick, classes, fullWidth, form = '', typeSubmit = true, redBtn =false } = props;
  let attributeForm = {}
  if (form)
    attributeForm.form = form
  if (typeSubmit)
    attributeForm.type = "submit"
  return (
    <Button
      className={
        clsx(
          style.root,
          // disabled && style.btnDisabled,
          btnType === 'height' && style.btnHeight,
          btnType === 'large' && style.btnLarge,
          btnType === 'medium' && style.btnMedium,
          btnType === 'small' && style.btnSmall,
          btnType === 'darkActive' && style.btnDarkActive,
          btnType === 'darkDisable' && style.btnDarkDisable,
          redBtn && style.btnRed)

      }
      disabled={disabled}
      disableFocusRipple={true}
      disableRipple={true}
      fullWidth={fullWidth}
      onClick={onClick}
      {...attributeForm}
      // classes={classes}
      classes={{
        ...classes,
        disabled: style.btnDisabled
      }}
    // classes={{
    //   root: clsx(
    //     style.root,
    //     disabled && style.btnDisabled,
    //     btnType === 'large' && style.btnLarge,
    //     btnType === 'medium' && style.btnMedium,
    //     btnType === 'small' && style.btnSmall,
    //     btnType === 'darkActive' && style.btnDarkActive,
    //     btnType === 'darkDisable' && style.btnDarkDisable
    //   ),
    //   ...classes

    // }}
    >
      {children}
    </Button>
  );
});
export default Buttons;



