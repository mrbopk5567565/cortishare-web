import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { RESENT_EMAIL_REQUEST, RESENT_EMAIL_ERROR, RESENT_EMAIL_SUCCESS } from 'redux/reducers/authentication/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { resentEmailApi } from 'services/authentication/authenApi'

function* resentEmailRequest(action) {

  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(resentEmailApi, action.payload);
    if (response.success) {
      yield put({ type: RESENT_EMAIL_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
      action.onSuccess()
    }
  } catch (error) {
    yield put({ type: RESENT_EMAIL_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleResentEmail() {
  yield takeLatest(RESENT_EMAIL_REQUEST, resentEmailRequest);
}

export default handleResentEmail;