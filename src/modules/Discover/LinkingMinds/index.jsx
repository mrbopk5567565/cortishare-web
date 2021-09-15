import React, { useState, useEffect,useCallback } from 'react';
import { Grid, FormControl, TextField, InputAdornment, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { TabsCustom, Layout, Loading } from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom';
import LinkingMindsPost from '../LinkingMindsPost'
import LinkingMindsMap from '../LinkingMindsMap'
import LinkingMindsUsers from '../LinkingMindsUsers'
import Images from 'config/images'
import { 
  SET_PARAMS_MAP_DISCOVER, 
  SET_PARAMS_SEARCH_ALL,
  GET_ALL_MAP_DISCOVER_REQUEST, 
  SEARCH_ALL_REQUEST,
} from 'redux/reducers/discover/actionTypes';
import FilterMap from '../Maps/components/FilterMap';
import {LoadingIconMore} from 'components'
import InfiniteScroll from 'react-infinite-scroll-component';
import useStylesCommon from 'utils/stylesCommon';
import clsx from 'clsx';

const LinkingMinds = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const paramsMapDiscovery = useSelector((state) => state.discover.paramsMapDiscovery)
  const paramsSearchAll = useSelector((state) => state.discover.paramsSearchAll)
  const isLoading = useSelector((state) => state.global.isLoading)
  const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const searchAll = useSelector((state) => state.discover.searchAll)
  const { categories, category_select } = useSelector((state) => state.category)
  const [nodeLoad,setNodeLoad] = useState(null)
  const refLoad = useCallback(node => setNodeLoad(node))
  const [flag, setFlag] = useState(false)
  const classesCommon = useStylesCommon()
  // const matchDiscover = useRouteMatch('/discover');
  // const matchLinking = useRouteMatch('/discover/linking-minds');
  
  // useEffect(() => {
  //   dispatch({
  //     type: SET_PARAMS_MAP_DISCOVER,
  //     payload: { ...paramsMapDiscovery, search: paramsMapDiscovery.search }
  //   })
  // }, [])
  

  // useEffect(() => {
  //   dispatch({
  //     type: GET_ALL_MAP_DISCOVER_REQUEST,
  //     payload: {
  //       data: {
  //         ...paramsMapDiscovery,
  //         categoryId: 0,
  //         // tableType: 2,
  //       },
  //       loadMore: false
  //     },
  //   })
  //   return () => {
  //     dispatch({
  //       type: SET_PARAMS_MAP_DISCOVER,
  //       payload: { ...paramsMapDiscovery, search: '' }
  //     })
  //   }
  // }, [])

  useEffect(() => {
    dispatch({
      type: SET_PARAMS_SEARCH_ALL,
      payload: { ...paramsSearchAll, Search: paramsSearchAll.Search }
    })
    dispatch({
      type: SEARCH_ALL_REQUEST,
      payload: {
        ...paramsSearchAll
      },
      isLoading: true,
      isLoadMore: false,
      onSuccess: () => setFlag(true),
    })
    return () => {
      dispatch({
        type: SET_PARAMS_SEARCH_ALL,
        payload: { ...paramsSearchAll, Search: '' }
      })
    }
  }, [])

  useEffect(() => {
    if(!flag || isLoading || !searchAll) return
    const headerHeight = document.getElementById('header-map') ? document.getElementById('header-map').clientHeight : 0
    const bodyHeight = document.getElementById('body-linking-minds') ? document.getElementById('body-linking-minds').clientHeight : 0
    if(window.innerHeight > (headerHeight + bodyHeight) && paramsSearchAll.Page < paramsSearchAll.pageTotal) {
      loadMore()
    }
  }, [searchAll, isLoading])
  
  /*
    categoryId = 0 : get all caterogies
    tableType = 1 : Map
    tableType = 2 : POST
    tableType = 3 : User
  */
  // useEffect(() => {
  //   const options= {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0
  //   }
    
  //   const loadMore = (entries) => {
  //     if(paramsMapDiscovery.totalPage && paramsMapDiscovery.page < paramsMapDiscovery.totalPage && entries[0].isIntersecting && Math.floor(entries[0].intersectionRatio) === 1) { 
  //       dispatch({
  //         type: GET_ALL_MAP_DISCOVER_REQUEST,
  //         payload: {data: {...paramsMapDiscovery}, loadMore:true},
  //       })
  //     }
  //   }
  //   const observer =new IntersectionObserver(loadMore,options)
  //   if(nodeLoad){
  //     observer.observe(nodeLoad)
  //   }
  //   return () => {nodeLoad && observer.unobserve(nodeLoad)}
  // },[nodeLoad,paramsMapDiscovery.totalPage,paramsMapDiscovery.page,paramsMapDiscovery.categoryId, paramsMapDiscovery.tableType])


  const tabs = [
    {
      label: 'Boards',
      value: 1,
      component: <LinkingMindsMap />,
      onClick: () => {
        dispatch({
          type: SEARCH_ALL_REQUEST,
          payload: {
            ...paramsSearchAll,
            "TableType": 1,
            Page: 1,
            CategoryId: category_select.id_selected,
          },
          isLoading: true,
          isLoadMore: false,
          onSuccess: () => setFlag(true),
        })
      },
    },
    {
      label: 'Post',
      value: 2,
      component: <LinkingMindsPost />,
      onClick: () => {
        dispatch({
          type: SEARCH_ALL_REQUEST,
          payload: {
            ...paramsSearchAll,
            "TableType": 2,
            Page: 1,
            CategoryId: 0,
          },
          isLoading: true,
          isLoadMore: false,
          onSuccess: () => setFlag(true),
        })
      },
    },
    {
      label: 'Users',
      value: 3,
      component: <LinkingMindsUsers />,
      onClick: () => {
        dispatch({
          type: SEARCH_ALL_REQUEST,
          payload: {
            ...paramsSearchAll,
            "TableType": 3,
            Page: 1,
            CategoryId: 0,
          },
          isLoading: true,
          isLoadMore: false,
          onSuccess: () => setFlag(true),
        })
      },
    },
  ]

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   dispatch({
  //     type: GET_ALL_MAP_DISCOVER_REQUEST,
  //     payload: paramsMapDiscovery,
  //   })
  //   handleSearch()
  // }

  // const handleChange = e => {
  //   dispatch({
  //     type: SET_PARAMS_MAP_DISCOVER,
  //     payload: { ...paramsMapDiscovery, search: e.target.value }
  //   })
  // }

  const handleSearch = () => {
  }

  const loadMore = () => {
    dispatch({
      type: SEARCH_ALL_REQUEST,
      payload: { ...paramsSearchAll, Page: paramsSearchAll.Page += 1 },
      isLoading: false,
      isLoadMore: true,
    })
  }

  return (
    <div id='body-linking-minds'>
      {isLoading && !flag && <Loading />}
      {flag &&
        <InfiniteScroll
          className={classes.dropdown}
          dataLength={searchAll.length}
          next={loadMore}
          hasMore={paramsSearchAll.Page < paramsSearchAll.pageTotal}
          loader={<LoadingIconMore />}
        >
          <Layout>
            <Grid 
              container 
              classes={{ 
                root: clsx(
                  classes.layout, 
                  // ((paramsSearchAll.TableType === 1 || paramsSearchAll.TableType === 3) && searchAll.length !== 0) 
                  //   && classesCommon.layout,
                  // ((paramsSearchAll.TableType === 1 || paramsSearchAll.TableType === 3) && searchAll.length === 0) 
                  //   && classesCommon.layoutDefault,
                  // (paramsSearchAll.TableType === 2 && searchAll.length !== 0) && classesCommon.layoutGrid,
                  // (paramsSearchAll.TableType === 2 && searchAll.length === 0) && classesCommon.layoutGridDefault,
                )
              }}
            >
              <FilterMap />
              <div style={{width: '100%'}}>
                <TabsCustom data={tabs} />
              </div>
            </Grid>
          </Layout>
        </InfiniteScroll>
      }
    </div>
  );
}

export default connect()(LinkingMinds);