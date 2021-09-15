import React, { useEffect, useState } from 'react';
import { Grid, FormControl, TextField, IconButton, InputAdornment } from '@material-ui/core';
// import { Loading } from 'components'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Images from 'config/images'
import {
  SET_PARAMS_MAP_DISCOVER,
  SET_PARAMS_SEARCH_ALL,
  GET_ALL_MAP_DISCOVER_REQUEST,
  SEARCH_ALL_REQUEST,
} from 'redux/reducers/discover/actionTypes';
import { SET_CATEGORY_SEARCH_DEFAULT } from 'redux/reducers/category/actionTypes'
import CloseIcon from '@material-ui/icons/Close';
import PopupFilter from '../PopupFilter';
import { Text } from 'components'
import { isMobile } from 'helpers'

const FilterMap = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  // const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const paramsMapDiscovery = useSelector((state) => state.discover.paramsMapDiscovery)
  const paramsSearchAll = useSelector((state) => state.discover.paramsSearchAll)
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { category_select } = useSelector((state) => state.category)
  const matchDiscover = useRouteMatch('/search');
  const matchLinking = useRouteMatch('/search/linking-minds');

  const handleOpenFilter = () => {
    console.log(111111111)
    setIsOpenFilter(true);
  }

  const handleCloseFilter = () => {
    setIsOpenFilter(false);
  }

  const handleResetFilter = () => {
    dispatch({
      type: SET_CATEGORY_SEARCH_DEFAULT,
    })

    if(matchDiscover && matchDiscover.isExact) {
      dispatch({
        type: GET_ALL_MAP_DISCOVER_REQUEST,
        payload: { data: { ...paramsMapDiscovery, categoryId: 0, tableType: 1 }, loadMore: false }
      })
    } else if (matchLinking && matchLinking.isExact) {
      dispatch({ 
        type: SEARCH_ALL_REQUEST, 
        payload: {
          ...paramsSearchAll,
          Page: 1,
          CategoryId: 0,
        },
        isLoading: true,
        isLoadMore: false,
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: SEARCH_ALL_REQUEST,
      payload: {
        ...paramsSearchAll,
        Page: 1,
      },
      isLoading: true,
      isLoadMore: false,
    })
    handleSearch()
  }

  const handleChange = e => {
    dispatch({
      type: SET_PARAMS_SEARCH_ALL,
      payload: { ...paramsSearchAll, "Search": e.target.value }
    })
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_PARAMS_MAP_DISCOVER,
        payload: { ...paramsMapDiscovery, search: '' }
      })
    }
  }, [])

  const handleSearch = () => {
    history.push('/search/linking-minds')
  }

  const renderLabel = () => {
    return (
      (category_select.label.label_parent || category_select.label.label_child) &&
      <Grid container alignItems="center" justify="space-between" classes={{ root: classes.showTextSection }}>
        <Text classes={{ root: classes.showTextParent }}>{category_select.label.label_parent} </Text>
        {category_select.label.label_child && <Text classes={{ root: classes.showTextParent }}>/ {category_select.label.label_child}</Text>}
        <CloseIcon onClick={handleResetFilter} classes={{ root: classes.showTextClose }} />
      </Grid>
    )
  }

  const renderFilter = () => {
    if (category_select.label.label_parent || category_select.label.label_child) return (<img onClick={handleOpenFilter} src={Images.icFiltered} alt={Images.icFiltered} className={classes.iconSearch} />);
    else return (<img onClick={handleOpenFilter} src={Images.icFilter} alt={Images.icFiltered} className={classes.iconSearch} />);
  }

  return (
    <Grid container classes={{ root: classes.root }}>
      <form onSubmit={handleSubmit} className={ matchDiscover && matchDiscover.isExact ? classes.formFuild : classes.form}>
        <FormControl variant="outlined" fullWidth >
          <TextField
            value={paramsSearchAll.Search}
            margin="normal"
            placeholder={isMobile() ? "Search" : "Search for board, user or post"}
            fullWidth
            className={classes.searchInput}
            color="primary"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            InputProps={{
              classes: {
                root: classes.customInput,
                adornedEnd: classes.adornedEndInput,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit} classes={{ root: classes.rootIcBtn }}>
                    <img src={Images.icSearch} alt="" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </FormControl>
      </form>

      {/* {((matchDiscover && matchDiscover.isExact) || (matchLinking && matchLinking.isExact && paramsSearchAll.TableType === 1)) && */}
      {/* {((matchDiscover && matchDiscover.isExact) )&&
        <>
          {isOpenFilter && <PopupFilter handleCloseFilter={handleCloseFilter} />}
          {renderFilter()}
          {paramsMapDiscovery.tableType === 1 && <Grid className={classes.listSearch}>
            {renderLabel()}
          </Grid>}
        </>
      } */}
    </Grid>
  );
};
export default FilterMap;