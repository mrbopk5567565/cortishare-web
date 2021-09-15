import React, { useState, } from 'react';
import { Dialog, DialogContent, Grid, FormControl, InputAdornment, TextField, IconButton, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx'
import 'react-tagsinput/react-tagsinput.css';
import CloseIcon from '@material-ui/icons/Close';
import Images from '../../config/images';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import {
  SET_PARAMS_SEARCH_ALL,
  SEARCH_ALL_REQUEST,
} from 'redux/reducers/discover/actionTypes';
import { Autocomplete } from '@material-ui/lab';
import { SEARCH_KEYMAP_REQUEST } from 'redux/reducers/map/actionTypes';

const MobileSearch = ({ openMobileSearch, handleClose, isMap }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const matchLinkingMinds = useRouteMatch('/search/linking-minds');
  const paramsSearchAll = useSelector((state) => state.discover.paramsSearchAll)
  const searchKey = useSelector((state) => state.map.searchKey)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const loadingSearch = useSelector((state) => state.map.loadingSearch)
  const [searchKeyMap, setSearchKeyMap] = useState('')

  const handleChangeSearch = e => {
    dispatch({
      type: SET_PARAMS_SEARCH_ALL,
      payload: { ...paramsSearchAll, Search: e.target.value }
    })
  }
  const handleChangeKeymap = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchKeyMap(value)
    if (isMap) {
      searchInBoard(value);
    }
  }
  const searchInBoard = (value) => {
    dispatch({
      type: SEARCH_KEYMAP_REQUEST,
      payload: {
        mapId: currentRootMap,
        keyWord: value ? value : searchKeyMap,
      },
    })
  }
  const handleClickTitle = (option) => {
    const checkMaporNode = option && option.parentNodeId !== null;
    if (!option) return
    if (option.type === 'Post') {
      history.push(`/board/${option.mapId}/post/${option.postId}`)
    } else if (option.type === 'Node' && !checkMaporNode) {
      history.push(`/board/${option.mapId}`)
    } else if (option.type === 'Node' && checkMaporNode) {
      history.push(`/board/${option.mapId}/node/${option.id}`)
    }
  }

  const handleSubmitSearch = e => {
    e.preventDefault()
    if (matchLinkingMinds && matchLinkingMinds.isExact) {
      dispatch({
        type: SEARCH_ALL_REQUEST,
        payload: {
          ...paramsSearchAll,
          "TableType": 1,
          Page: 1,
        },
        isLoading: true,
        isLoadMore: false,
      })
    }

    if (isMap) {
      dispatch({
        type: SEARCH_KEYMAP_REQUEST,
        payload: {
          mapId: currentRootMap,
          keyWord: searchKeyMap,
        },
      })
    } else {
      history.push('/search/linking-minds')
      handleClose()
    }
  }



  return (
    <Dialog
      open={openMobileSearch}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      <div className={classes.buttonClose} onClick={handleClose}>
        <img src={Images.icCloseBig} alt="close-dialog" />
      </div>
      <DialogContent classes={{ root: classes.containerBody }}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
          classes={{ root: classes.layoutLogin }}
        >
          <span className={classes.HeaderTitle}>Search</span>
          <form onSubmit={handleSubmitSearch} className={classes.form}>
            <FormControl variant="outlined" fullWidth classes={{ root: clsx(classes.rootFormControl, isMap && classes.formControlMap) }}>
              {isMap ?
                <Autocomplete
                  fullWidth={true}
                  classes={{
                    root: classes.searchInput,
                    option: classes.option,
                    listbox: classes.listbox,
                    popupIndicatorOpen: classes.popupIndicatorOpen,
                    clearIndicator: classes.clearIndicator,
                  }}
                  options={searchKey}
                  getOptionLabel={(option) => option.title}
                  popupIcon={<SearchIcon></SearchIcon>}
                  onChange={(e, newValue) => handleClickTitle(newValue)}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <div className={classes.containerOption}>
                        <p className={classes.titleSearch}>{option.title}</p>
                        <p className={classes.descriptionSearch} style={{ color: '#B5B5B5' }}>{option.type}</p>
                      </div>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={handleChangeKeymap}
                      placeholder={'Search in this Board'}
                      fullWidth={true}
                      variant="outlined"
                      InputProps={{
                        classes: { input: classes.inputSearch },
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingSearch ? (
                              <CircularProgress
                                style={{ color: 'inherit' }}
                                size={20}
                              />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                :
                <TextField
                  value={paramsSearchAll.Search}
                  margin="normal"
                  // placeholder={isMap ? "Search in this map" : "Search your maps"}
                  placeholder={"Search boards"}
                  fullWidth
                  color="primary"
                  variant="outlined"
                  classes={{ root: classes.rootTextField }}
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" classes={{ root: classes.rootInputAdornment }}>
                        <IconButton onClick={handleSubmitSearch}>
                          {isMap ? <img src={Images.icSearchWhite} alt="" /> : <img src={Images.icSearch} alt="" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChangeSearch}
                />}
            </FormControl>
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default MobileSearch;