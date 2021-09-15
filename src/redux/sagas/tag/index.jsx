import { takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  GET_NODE_BY_TAG_REQUEST,
  GET_NODE_BY_TAG_SUCCESS,
  ADD_NODE_TO_OTHER_MAP_REQUEST,
  ADD_NODE_TO_OTHER_MAP_SUCCESS
} from 'redux/reducers/tag/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { toast } from 'react-toastify'
import { getNodeByTagApi, addOtherNodeToMapApi } from 'services/tag/tagApi'


function* getNodeByTag(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    if(action.removeAllChoice)
      yield put({ type: GET_NODE_BY_TAG_SUCCESS, payload: [] })
    const response = yield call(getNodeByTagApi, action.payload);
    yield put({ type: SET_IS_NOT_LOADING })
    if (response.success) {
      yield put({ type: GET_NODE_BY_TAG_SUCCESS, payload: response.result.data })
    }
  } catch (error) {
    if (action.onFail) {
      action.onFail()
    }
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}
function* addOtherNodeToMap(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(addOtherNodeToMapApi, action.payload);
    yield put({ type: SET_IS_NOT_LOADING })
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess()
      }
      yield put({ type: ADD_NODE_TO_OTHER_MAP_SUCCESS, payload: response.result.data })
    }
  } catch (error) {
    if (action.onFail) {
      action.onFail()
    }
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}
function* tagSaga() {
  yield takeLatest(GET_NODE_BY_TAG_REQUEST, getNodeByTag)
  yield takeLatest(ADD_NODE_TO_OTHER_MAP_REQUEST, addOtherNodeToMap)
}

export default tagSaga
