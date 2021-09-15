import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_ERROR } from 'redux/reducers/authentication/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { changePassword, resetPassword } from 'services/authentication/authenApi'

function* changePasswordRequest(action) {

  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(changePassword, action.payload);
    if (response.success) {
      yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
      action.onSuccess()
    }
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* ResetPasswordRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(resetPassword, action.payload);
    if (response) {
      yield put({ type: RESET_PASSWORD_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
      action.onSuccess();
    }
  } catch (error) {
    yield put({ type: RESET_PASSWORD_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }

}

function* handleChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordRequest);
  yield takeLatest(RESET_PASSWORD_REQUEST, ResetPasswordRequest);
}

export default handleChangePassword;