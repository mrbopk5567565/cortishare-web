import React, { memo, useEffect, useState } from 'react';
import useStyles from './styles';
import { Text, Buttons } from 'components'
import clsx from 'clsx'

const Dropdown = memo((props) => {
  const classes = useStyles();
  const {
    listDropDown = [
      {
        label: 'Edit',
        // onClick: () => void,
      },
      {
        label: 'Share',
        // onClick: () => void,
      },
    ],
    handleClickAway,
    isHover,
    isOwner
  } = props;

  const handleClick = (e, item) => {
    e.stopPropagation()
    item.onClick()
    handleClickAway()
  }

  return (
    <>
      {listDropDown && listDropDown.length !== 0 &&
        <div className={clsx(classes.root)} >
          {listDropDown && listDropDown.length !== 0 && listDropDown.map((item, idx) => (
            <div 
              key={idx} 
              className={
                clsx(
                  classes.itemDropdown, 
                  item.click && classes.active, 
                  idx === listDropDown.length - 1 && isOwner && classes.owner
                )
              } 
              onClick={(e) => handleClick(e, item)}>
              {item.label}
            </div>
          ))}
        </div>
      }
    </>
  );
});
export default Dropdown;



