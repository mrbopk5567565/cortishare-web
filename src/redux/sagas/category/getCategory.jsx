import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR } from 'redux/reducers/category/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { getCategory } from 'services/category/categoryApi'

function* getCategoryRequest() {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(getCategory);
    if (response) {
      yield put({ type: GET_CATEGORY_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    yield put({ type: GET_CATEGORY_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }

}

function* handleGetCategory() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategoryRequest);
}

export default handleGetCategory
