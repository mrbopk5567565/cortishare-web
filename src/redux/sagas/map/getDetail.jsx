import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { GET_MAP_DETAIL_REQUEST, GET_MAP_DETAIL_SUCCESS, GET_MAP_DETAIL_ERROR } from 'redux/reducers/map/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR, SET_IS_EDIT_MAP } from 'redux/reducers/global/actionTypes'
import { getDetail } from 'services/map/mapApi'
import { toast } from 'react-toastify';

function* getMapDetailRequest(action) {
  try {

    yield put({ type: SET_IS_LOADING })
    const response = yield call(getDetail, action.payload);
    yield put({ type: GET_MAP_DETAIL_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
    if (response && Object.keys(response).length !== 0) {
      yield put({ type: SET_IS_EDIT_MAP, payload: true })
    }

    // if (action.handleSuccess) {
    //   action.handleSuccess();
    // }
  } catch (error) {
    // if (action.handleError) {
    //   action.handleError();
    // }
    yield put({ type: SET_IS_EDIT_MAP, payload: false })
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }

}

function* handleMapDetail() {
  yield takeLatest(GET_MAP_DETAIL_REQUEST, getMapDetailRequest);
}

export default handleMapDetail
