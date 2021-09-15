import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { 
  GET_ALL_MAP_REQUEST,
  GET_ALL_MAP_SUCCESS,
  GET_MY_FEED_REQUEST,
  GET_MY_FEED_SUCCESS,
} from 'redux/reducers/home/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { getAllMap, getMyFeed } from 'services/home/homeAPI'
import { toast } from 'react-toastify';

function* getAllMapRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(getAllMap, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_ALL_MAP_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getMyFeedRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(getMyFeed, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_MY_FEED_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* homeSaga() {
  yield takeLatest(GET_ALL_MAP_REQUEST, getAllMapRequest);
  yield takeLatest(GET_MY_FEED_REQUEST, getMyFeedRequest);
}

export default homeSaga
