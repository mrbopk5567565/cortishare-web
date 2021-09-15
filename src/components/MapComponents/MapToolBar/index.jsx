import React, { useState, useEffect } from 'react'
import { Grid, Popover, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Images from 'config/images'
import clsx from 'clsx'

const useWindowWidth = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return widthWindow
}

const MapToolbar = (props) => {
  const {
    handleMindMapSide,
    handleTreeView,
    handleToCenter,
    handleZoomIn,
    handleZoomOut,
    handleFullScreen,
    isFullScreen,
    isSelectMap,
    showIconGoToPostMobile,
    goToPostMobile,
    closePopup,
    showCollab,
    titleCollab,
    permission,
    fnForPermisstion,
    exitCollabrator,
  } = props
  const [anchorElSelectView, setAnchorElSelectView] = useState(null);
  const stateWindowWidth = useWindowWidth()
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')
  const checkPermissionOwner = dataMindMap &&  dataMindMap.mapPermission === 'Owner'
  const checkPermissionEditAndView = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'View')
  const checkPermissionCustomer = dataMindMap &&  dataMindMap.mapPermission === (null)
  const handleCloseSelectView = (option = 0) => {
    setAnchorElSelectView(null)
    switch (option) {
      case 1:
        handleMindMapSide()
        break;
      case 2:
        handleTreeView()
        break;
      default:
        break;
    }
  }
  const classes = useStyles();

  const renderViewSelect = () => {
    return (
      <div className="view-dropdown item">
      <div className="viewTitle">View</div>
      {checkPermission && 
        <>
          <img 
            src={Images.icDropDown} 
            onClick={(e) => setAnchorElSelectView(e.currentTarget)}
            alt="dropdown-cortishare"
          />
          <Popover
            open={Boolean(anchorElSelectView)}
            anchorEl={anchorElSelectView}
            onClose={handleCloseSelectView}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseSelectView}>
                <MenuList>
                  <MenuItem onClick={() => handleCloseSelectView(1)}>Schematic View</MenuItem>
                  <MenuItem onClick={() => handleCloseSelectView(2)}>Tree View</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popover>
        </>
      }
    </div>
    )
  }

  const renderMindMap = () => {
    if(isSelectMap) return;
    return (
      <>
      {!isFullScreen && showCollab && !checkPermissionCustomer &&
        <div className="colab item">
          {/* {checkPermissionOwner &&
            <div className="colabborator">
              {titleCollab}
            </div>
          } */}
          {checkPermissionOwner && 
            <div className={`${checkPermissionOwner ? 'colabInvite' : 'colabborator'}`} onClick={() => { checkPermissionOwner && fnForPermisstion() }}>Invite Users</div>
          }
          {checkPermissionEditAndView &&
            <div 
              className={`${checkPermissionEditAndView ? 'colabInvite' : 'colabborator'}`} 
              onClick={() => { checkPermissionEditAndView && exitCollabrator() }}
            >
              Stop Access
            </div>
          }
        </div>
      }
      {!isFullScreen && renderViewSelect()}
      <div className="to-center item">
        <img onClick={handleToCenter} src={Images.icCenter} />
      </div>
      <div className="full-screen item">
        {isFullScreen ?
          <img onClick={handleFullScreen} src={Images.icCloseToolbar} />
          :
          <img onClick={handleFullScreen} src={Images.icFullScreen} />
        }
      </div>
      <div className="zoom-in-out">
        <img onClick={handleZoomOut} className="zoom-out-ic" src={Images.icZoomOut} />
        <img onClick={handleZoomIn} src={Images.icZoomIn} />
      </div>
      {showIconGoToPostMobile &&
        <div className="close-map">
          <img src={Images.icCloseToolbar} onClick={goToPostMobile} />
        </div>
      }
      </>
    )
  }

  const renderSelectMap = () => {
    if(!isSelectMap) return;
    return (
      <>
        <div className="to-center item">
          <img onClick={handleToCenter} src={Images.icCenter} />
        </div>
        {renderViewSelect()}
        <div className="select-close item">
          <img src={Images.icCloseToolbar} onClick={closePopup} />
        </div>
      </>
    )
  }


  return (
    <div className={classes.wrapperToolbar}>
      <div className={clsx(classes.toolbar, stateWindowWidth <= 600 ? classes.mobileToolbar : classes.destopToolbar)}>
        {renderSelectMap()}
        {renderMindMap()}
      </div>
    </div>
  )
}

export default MapToolbar