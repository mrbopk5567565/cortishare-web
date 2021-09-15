import React, { useEffect, memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useStyles from './styles';
import Images from 'config/images'
import { Dropdown, PopupShare } from 'components'
import clsx from 'clsx'

const Modal = memo(({
  isFollow,
  isInvite = false,
  isOwner = false,
  isCard = false,
  isScale = false,
  isScaleLeft,
  listDropDown,
  type = 'dropdown',
  isHover = true,
  item,
  customStyle,
  handleSetCustomer,
}) => {
  const classes = useStyles(isCard);
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    e.stopPropagation()
    setOpen((prev) => !prev);
    if(isInvite) handleSetCustomer()
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isHover && isCard) {
      handleClickAway()
    }
  })

  const switchContentModal = () => {
    switch (type) {
      case 'dropdown':
        if (listDropDown.length === 0) return
        return <Dropdown isOwner={isOwner} listDropDown={listDropDown} handleClickAway={handleClickAway} isHover={isHover} />
      case 'share':
        return <PopupShare item={item} handleClickAway={handleClickAway} isHover={isHover} />
      default:
        break;
    }
  }

  const handleFindHidePost = () => {
    if (isScale && listDropDown.length !== 0) {
      const index = listDropDown.findIndex(item => item.click)
      if (listDropDown[index].label === 'Hide Post') {
        return true
      }
    }
    return false
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={clsx(
        classes.root, 
        isScale && classes.scale,
        isScale && !isScaleLeft && classes.scaleRight,
        isOwner && classes.owner
        )}
      >
        <div className={classes.containerIcon} onClick={handleClick} >
          {isScale && isScaleLeft && 
            <>
              <img className="left" src={Images.caretLeft} alt=""/>
            </>
          }
          {isScale && !isScaleLeft && 
            <>
              <img className="right" src={Images.caretRight} alt=""/>
            </>
          }
          {isFollow &&
            <>
              {type === 'dropdown' ?
                <div className={classes.iconControl} onClick={handleClick}>
                  <img src={Images.icEdit} onClick={handleClick} alt="" className={classes.navigation} />
                </div>
                :
                <div className={classes.iconControl} onClick={handleClick}>
                  <img src={Images.icShare} onClick={handleClick} alt="" className={classes.navigation} />
                </div>
              }
            </>
          }
          {isCard &&
            <>
              {type === 'dropdown' ?
                <div className={classes.iconControl} onClick={handleClick}>
                  <img src={Images.icNavigationHoriz} alt="" className={classes.navigation} />
                </div>
                :
                <div className={classes.iconControl} onClick={handleClick}>
                  <img src={Images.icDarkShare} alt="" className={classes.navigation} />
                </div>
              }
            </>
          }
          {isOwner && type === 'dropdown' &&
            <div onClick={handleClick}>
              <img src={Images.icExpandMore} alt="" />
            </div>
          }
        </div>
        {open ? (
          <div className={
            clsx(
              classes.dropdown,
              isInvite && classes.dropdownInvite,
              isScale && classes.dropdownScale,
              isCard && (type === 'share' ? classes.cardShare : classes.card),
              handleFindHidePost() && classes.left
            )
          }
          style={customStyle}
          >
            {switchContentModal()}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
})

export default Modal
