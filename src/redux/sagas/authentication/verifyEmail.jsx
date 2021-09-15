import { takeLatest, call, put } from 'redux-saga/effects';
import { VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_ERROR, UNSUBCRIBE_EMAIL_REQUEST } from 'redux/reducers/authentication/actionTypes';
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes';
import { verifyEmailApi, unsubcribeEmail } from 'services/authentication/authenApi';
import { toast } from 'react-toastify';

function* verifyEmailRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(verifyEmailApi, action.payload);
    if (response) {
      yield put({ type: SET_IS_NOT_LOADING });
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    // yield put({ type: VERIFY_EMAIL_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* unsubcribeEmailRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(unsubcribeEmail, action.payload);
    if (response) {
      yield put({ type: SET_IS_NOT_LOADING });
    }
  } catch (error) {
    if (action.history) {
      action.history.push('/')
    }
    // toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* verifyEmail() {
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmailRequest);
  yield takeLatest(UNSUBCRIBE_EMAIL_REQUEST, unsubcribeEmailRequest);
}

export default verifyEmail
