import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { 
  GET_FOLLOWING_MAPS_REQUEST,
  GET_FOLLOWING_MAPS_SUCCESS,
} from 'redux/reducers/global/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { getFollowingMaps } from 'services/global/globalApi';
import { toast } from 'react-toastify';

function* getFollowingMapsRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(getFollowingMaps, action.payload);
    console.log('aaaaaaaaaa', response)
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_FOLLOWING_MAPS_SUCCESS, payload: response })
    // yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    // yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* globalSaga() {
  yield takeLatest(GET_FOLLOWING_MAPS_REQUEST, getFollowingMapsRequest);
}

export default globalSaga
