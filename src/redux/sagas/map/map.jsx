import { takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  CREATE_MAP_REQUEST,
  CREATE_MAP_SUCCESS,
  CREATE_MAP_ERROR,
  UPDATE_MAP_REQUEST,
  UPDATE_MAP_SUCCESS,
  UPDATE_VIEW_TYPE_MAP_REQUEST,
  DELETE_MAP_REQUEST,
  DELETE_MAP_SUCCESS,
  SEARCH_TAGS_REQUEST,
  SEARCH_TAGS_SUCCESS,
  UPDATE_MIND_MAP_DATA_VIEW,
  GET_PENDING_MAP_SHARING_REQUEST,
  GET_PENDING_MAP_SHARING_SUCCESS
} from 'redux/reducers/map/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { 
  createMap, 
  updateMap, 
  deleteMap, 
  searchTags, 
  updateViewTypeMap,
  getPendingMapSharing,
} from 'services/map/mapApi';
import { GET_COLLABORATE_SUCCESS } from 'redux/reducers/notification/actionTypes'
import { toast } from 'react-toastify';
import { HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_GET_INFO_REQUEST } from 'redux/reducers/profile/actionTypes'

function* createMapRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(createMap, action.payload);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess(response.result);
      }
      yield put({ type: CREATE_MAP_SUCCESS, payload: response })
      toast.success("Create Board Success!");
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    const codeMaxiumMap = 200002;
    if (error.response.data.error.code == codeMaxiumMap) {
      action.onFailure();
    }
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* updateMapRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(updateMap, action.payload);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      yield put({ type: UPDATE_MAP_SUCCESS, payload: {} })
      toast.success("Update Board Success!");
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function * updateViewTypeMapRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(updateViewTypeMap, action.payload);
    if (response.success) {
      yield put({ type: UPDATE_MIND_MAP_DATA_VIEW, payload: action.payload.viewType })
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* deleteMapRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer.customerId) {
      toast.error('Id not found');
    }
    const response = yield call(deleteMap, action.mapId);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      if (action.dispatch) {
        action.dispatch({ type: HANDLE_GET_INFO_DETAIL_REQUEST })
        action.dispatch({
          type: HANDLE_GET_INFO_REQUEST,
          payload: {
            customerId: customer.customerId,
          },
        })
      }
      yield put({ type: DELETE_MAP_SUCCESS, payload: response })
      toast.success("Delete Board Success!");
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* searchTagsRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(searchTags, action.searchTags);
    if (response.success) {
      // if (action.onSuccess) {
      //   action.onSuccess();
      // }
      yield put({ type: SEARCH_TAGS_SUCCESS, payload: response.result })
      // toast.success("Delete Map Success !");
      // yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getPendingMapSharingRequest(action) {
  try {
    const response = yield call(getPendingMapSharing, action.payload);
    if (response.success) {
      // if (action.onSuccess) {
      //   action.onSuccess();
      // }
      yield put({ type: GET_COLLABORATE_SUCCESS, payload: response.result })
      yield put({ type: GET_PENDING_MAP_SHARING_SUCCESS, payload: response.result })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleMap() {
  yield takeLatest(CREATE_MAP_REQUEST, createMapRequest);
  yield takeLatest(UPDATE_MAP_REQUEST, updateMapRequest);
  yield takeLatest(UPDATE_VIEW_TYPE_MAP_REQUEST, updateViewTypeMapRequest);
  yield takeLatest(DELETE_MAP_REQUEST, deleteMapRequest);
  yield takeLatest(SEARCH_TAGS_REQUEST, searchTagsRequest);
  yield takeLatest(GET_PENDING_MAP_SHARING_REQUEST, getPendingMapSharingRequest);

}

export default handleMap
