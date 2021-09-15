import { takeLatest, call, put, delay, select } from 'redux-saga/effects';
import {
  SEARCH_MAP_BY_KEY_REQUEST,
  SEARCH_MAP_BY_KEY_SUCCESS,
  SEARCH_MAP_BY_KEY_ERROR,
  SET_LOADING_SEARCH_MY_MAP
} from 'redux/reducers/map/actionTypes'

import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { searchMap } from 'services/map/mapApi'
import { toast } from 'react-toastify';

function* searchMapByKeyRequest(action) {
  try {
    yield put({ type: SET_LOADING_SEARCH_MY_MAP, payload: true })
    const response = yield call(searchMap, action.payload ? action.payload : '');
    yield put({ type: SEARCH_MAP_BY_KEY_SUCCESS, payload: response.data })
    yield put({ type: SET_LOADING_SEARCH_MY_MAP, payload: false })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_LOADING_SEARCH_MY_MAP, payload: false })
  }
}


function* handleSearchMapRequest() {
  yield takeLatest(SEARCH_MAP_BY_KEY_REQUEST, searchMapByKeyRequest);

}

export default handleSearchMapRequest;
