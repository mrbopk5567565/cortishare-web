import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from 'redux/reducers/authentication/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes'
import { register } from 'services/authentication/authenApi'

function* registerRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(register, action.payload);
    if (response) {
      yield put({ type: REGISTER_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
      if(action.callBack)
        yield action.callBack(action.payload);
      // localStorage.setItem('accessToken', response.accessToken);
    }
  } catch (error) {
    yield put({ type: REGISTER_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }

}

function* handleRegister() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
}

export default handleRegister
