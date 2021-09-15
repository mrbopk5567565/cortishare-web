import { takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  GET_ALL_MAP_DISCOVER_REQUEST,
  CONCAT_DISCOVER,
  UPDATE_DISCOVER,
  SET_PARAMS_MAP_DISCOVER,
  SEARCH_ALL_REQUEST,
  SEARCH_ALL_SUCCESS,
  SET_PARAMS_SEARCH_ALL,
} from 'redux/reducers/discover/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { getAllMapDiscover, searchAll } from 'services/discover/discoverAPI'
import { toast } from 'react-toastify';

function* getAllMapDiscoverRequest(action) {
  try {
    if(!action.payload.loadMore){
      yield put({ type: SET_IS_LOADING })
      yield put({ type: UPDATE_DISCOVER, payload: [] })
      const response = yield call(getAllMapDiscover, {...action.payload.data,page: 1});
      let maxPage =0 
      if (Object.keys(response).length !== 0) {
        maxPage = response.pageTotal
        yield put({ type: UPDATE_DISCOVER, payload: response.data })
        yield put({ type: SET_PARAMS_MAP_DISCOVER, payload: {...action.payload.data,page: 1,pageTotal: maxPage } })
      } else {
        yield put({ type: UPDATE_DISCOVER, payload: [] })
        yield put({ type: SET_PARAMS_MAP_DISCOVER, payload: {...action.payload.data,page: 0,pageTotal: 0 } })
      }
      if (action.onSuccess) {
        action.onSuccess()
      }
      yield put({ type: SET_IS_NOT_LOADING })
    }
    else{
      // if(action.payload.data.maxPage && action.payload.data.page <= action.payload.data.maxPage){
      const response = yield call(getAllMapDiscover, {...action.payload.data,page: action.payload.data.page+1});
      if (Object.keys(response).length !== 0) {
        yield put({ type: CONCAT_DISCOVER, payload: response.data })
      } else {
        yield put({ type: CONCAT_DISCOVER, payload: [] })
      }
      if (action.onSuccess) {
        action.onSuccess()
      }
      yield put({ type: SET_PARAMS_MAP_DISCOVER, payload: {...action.payload.data,page: action.payload.data.page+1, pageTotal: action.payload.data.pageTotal } })
      // }
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }



  //   yield put({ type: SET_IS_LOADING })
  //   const response = yield call(getAllMapDiscover, action.payload.data);
  //   if (Object.keys(response).length !== 0) {
  //     yield put({ type: GET_ALL_MAP_DISCOVER_SUCCESS, payload: response.data })
  //   } else {
  //     yield put({ type: GET_ALL_MAP_DISCOVER_SUCCESS, payload: [] })
  //   }
  //   yield put({ type: SET_PARAMS_MAP_DISCOVER, payload: action.payload.data })
  //   yield put({ type: SET_IS_NOT_LOADING })
  // } catch (error) {
  //   toast.error(error.response.data.error.message);
  //   yield put({ type: SET_IS_NOT_LOADING })
  // }
}

function* searchAllRequest(action) {
  try {
    if (action.isLoading) {
      yield put({ type: SET_IS_LOADING })
    } else {
      // Not need Loading
    }
    yield put({ type: SET_PARAMS_SEARCH_ALL, payload: { ...action.payload, pageTotal: 0 } })
    const response = yield call(searchAll, action.payload);
    if (Object.keys(response).length !== 0) {
      if (action.onSuccess) {
        action.onSuccess()
      }
      yield put({ type: SET_PARAMS_SEARCH_ALL, payload: { ...action.payload, Page: response.page, pageTotal: response.pageTotal} })
      yield put({ 
        type: SEARCH_ALL_SUCCESS, 
        payload: response.data,
        isLoadMore: action.isLoadMore,
      })
    }
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* discoverSaga() {
  yield takeLatest(GET_ALL_MAP_DISCOVER_REQUEST, getAllMapDiscoverRequest);
  yield takeLatest(SEARCH_ALL_REQUEST, searchAllRequest);
}

export default discoverSaga
