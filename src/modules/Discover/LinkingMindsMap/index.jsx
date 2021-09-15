import React, { useState } from 'react';
import { Grid  } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { CardCustom, LayoutMap} from 'components'
import { useHistory } from 'react-router-dom';
import clsx from 'clsx'
import useStylesCommon from 'utils/stylesCommon';
import EditMap from 'modules/MyMap/EditMap'

const LinkingMindsMap = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const searchAll = useSelector((state) => state.discover.searchAll)
  const classesCommon = useStylesCommon()
  const isEditMap = useSelector((state) => state.global.isEditMap)

  const handleClick = () => {
    console.log("vo click r");
  }

  const handleClosePopup = () => {
    dispatch({
      type: 'SET_IS_EDIT_MAP', payload: false
    })
  }

  return (
    <Grid 
      container 
      classes={{ 
        root: clsx(
          classes.root, 
          searchAll.length !== 0 ? classesCommon.layout : classesCommon.layoutDefault,
        ) 
      }}
    >
      <LayoutMap mapData={searchAll} />
      {isEditMap && <EditMap showPopupEdit={isEditMap} handleClosePopup={handleClosePopup} />}
    </Grid>
  );
}

export default connect()(LinkingMindsMap);