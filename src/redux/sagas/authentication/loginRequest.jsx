import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from 'redux/reducers/authentication/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { login } from 'services/authentication/authenApi'
import { APIInstance } from 'services/configApi'

function* loginRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(login, action.payload);
    if (response) {
      yield put({ type: LOGIN_SUCCESS, payload: response })
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('customer', JSON.stringify(response))
      APIInstance.defaults.headers.common['Authorization'] = `Bearer ${response.token}`

      if (action.onSuccess) {
        action.onSuccess(response)
      }
      if (action.handleSubmitCard) {
        yield action.handleSubmitCard(response)
      }
      yield put({ type: SET_IS_NOT_LOADING })
      if (!action.isReload) {
        action.history.push('/')
      } else {
        window.location.reload();
      }

    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error.response.data.error.message })
    yield put({ type: SET_IS_NOT_LOADING })
  }

}

function* handleLogin() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}

export default handleLogin
