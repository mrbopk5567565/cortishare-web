import { toast } from 'react-toastify'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  SEARCH_KEYMAP_SUCCESS,
  SEARCH_KEYMAP_REQUEST,
} from 'redux/reducers/map/actionTypes'
import { searchMapByKeyWord } from 'services/map/mapApi'

function* searchByKeyMap(action) {
  try {
    const response = yield call(
      searchMapByKeyWord,
      action.payload ? action.payload : '',
    )
    yield put({ type: SEARCH_KEYMAP_SUCCESS, payload: response.result.data })
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
}

function* handleSearchByKeyMap() {
  yield takeLatest(SEARCH_KEYMAP_REQUEST, searchByKeyMap)
}

export default handleSearchByKeyMap
