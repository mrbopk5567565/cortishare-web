import { takeLatest, call, put, delay, select } from 'redux-saga/effects';
import {
  GET_ALL_BY_CUSTOMER_REQUEST,
  GET_ALL_BY_CUSTOMER_SUCCESS,
  GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_REQUEST,
  GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_SUCCESS,
  GET_POSTS_BY_MAP_ID_REQUEST,
  COUNT_VIEWER_TO_RECENT,
  GET_POSTS_BY_MAP_ID_SUCCESS,
  SAVE_FOLLOW_MAP_REQUEST,
  SAVE_FOLLOW_MAP_SUCCESS,
  GET_MIND_MAP_DATA_REQUEST,
  GET_MIND_MAP_DATA_SUCCESS,
  SET_SELECT_NODE,
  GET_FOLLOWING_CUSTOMERS_REQUEST,
  GET_FOLLOWING_CUSTOMERS_SUCCESS,
  SET_LOADING_FOLLOW,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS
} from 'redux/reducers/map/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import { getAllByCustomer, getAllByCustomerIdAndFollowing, getPostsByMapId, saveFollowMap, getMindMapData, countViewerToRecent } from 'services/map/mapApi';
import { getFollowingCustomers } from 'services/following/followingApi'

import { toast } from 'react-toastify';
import { SET_BREADCRUMBS } from 'redux/reducers/global/actionTypes'

function* getAllByCustomerRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(getAllByCustomer, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_ALL_BY_CUSTOMER_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getAllByCustomerIdAndFollowingRequest(action) {
  try {
    if (action.isLoading) {
      yield put({ type: SET_IS_LOADING })
    }
    const response = yield call(getAllByCustomerIdAndFollowing, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* countViewerToRecentMap(action) {
  try {
    if (action.onSuccess) {
      action.onSuccess();
    }
    yield call(countViewerToRecent, action.payload);
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* getPostsByMapIdRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })

    if (action.isAllowLoadMindmap) {
      const responseMindMap = yield call(getMindMapData, { id: action.payload.mapId })
      if (responseMindMap.success) {
        yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
        // if(action.setSelectRootNode){
        //   yield put({
        //     type: SET_SELECT_NODE,
        //     payload: {
        //       nodeId: responseMindMap.result.nodeData.id,
        //       mapId: responseMindMap.result.nodeData.mapId,
        //       root: true,
        //       topic: responseMindMap.result.nodeData.topic
        //     },
        //   })
        // }
      }
    }

    const response = yield call(getPostsByMapId, action.payload);

    if (response && Object.keys(response).length !== 0) {
      yield put({ type: GET_POSTS_BY_MAP_ID_SUCCESS, payload: response })
      yield put({
        type: SET_BREADCRUMBS,
        payload: {
          privacy: response.privacyName ? response.privacyName.toLowerCase() : '',
          breadcrumbs: [{
            label: response.title,
            id: response.id,
            type: 'Map'
          }]
        }
      })
      if (action.onSuccess) {
        action.onSuccess();
      }
    }
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    if (action.onFail) {
      action.onFail()
    }
    toast.error(error.response && error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getMindMapDataRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const dataMindMap = yield select((state) => state.map.dataMindMap)
    // if (Object.keys(dataMindMap).length === 0) {
    const responseMindMap = yield call(getMindMapData, action.payload)
    if (responseMindMap.success) {
      yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
    }
    // }
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getMindMapForOtherNodeRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const responseMindMap = yield call(getMindMapData, action.payload)
    if (responseMindMap.success) {
      yield put({ type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS, payload: responseMindMap.result })
    }
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* saveFollowMapRequest(action) {
  try {
    yield put({ type: SET_LOADING_FOLLOW, payload: true })
    const response = yield call(saveFollowMap, action.payload);
    const getMap = yield call(getPostsByMapId, action.data);
    yield put({ type: GET_POSTS_BY_MAP_ID_SUCCESS, payload: getMap })

    yield put({ type: SAVE_FOLLOW_MAP_SUCCESS, payload: response })
    if (action.isRefresh) {
      const responseMindMap = yield call(getMindMapData, { id: action.data.mapId })
      if (responseMindMap.success) {
        yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
      }
    }
    yield put({ type: SET_LOADING_FOLLOW, payload: false })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_LOADING_FOLLOW, payload: false })
  }
}

function* getFollowingCustomersRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(getFollowingCustomers, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: GET_FOLLOWING_CUSTOMERS_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleAllByCustomer() {
  yield takeLatest(GET_ALL_BY_CUSTOMER_REQUEST, getAllByCustomerRequest);
  yield takeLatest(GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_REQUEST, getAllByCustomerIdAndFollowingRequest);
  yield takeLatest(GET_FOLLOWING_CUSTOMERS_REQUEST, getFollowingCustomersRequest);
  yield takeLatest(GET_POSTS_BY_MAP_ID_REQUEST, getPostsByMapIdRequest);
  yield takeLatest(COUNT_VIEWER_TO_RECENT, countViewerToRecentMap);
  yield takeLatest(SAVE_FOLLOW_MAP_REQUEST, saveFollowMapRequest);
  yield takeLatest(GET_MIND_MAP_DATA_REQUEST, getMindMapDataRequest);
  yield takeLatest(GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST, getMindMapForOtherNodeRequest)
}

export default handleAllByCustomer
