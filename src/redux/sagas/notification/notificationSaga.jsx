import { takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_REQUEST_SUCCESS,
  UPDATE_LOADING_STATE,
  UPDATE_STATUS_NOTIFICATION,
  UPDATE_STATUS_NOTIFICATION_SUCCESS,
  CHECK_NEW_NOTIFICATION,
  UPDATE_IS_NEW_NOTIFICATION,
  ACCEPT_COLLABORATE_REQUEST,
  ACCEPT_COLLABORATE_SUCCESS,
  REJECT_COLLABORATE_REQUEST,
  REJECT_COLLABORATE_SUCCESS,
  GET_COLLABORATE_REQUEST,
  GET_COLLABORATE_SUCCESS,
} from 'redux/reducers/notification/actionTypes'
import { GET_MIND_MAP_DATA_SUCCESS } from 'redux/reducers/map/actionTypes'
import { getMindMapData } from 'services/map/mapApi'
import { getNotificationApi, updateStatusNotiApi, checkNewNotificationApi, accpetCollaborate,rejectCollaborate, getCollaborate } from 'services/notification/notificationApi'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'

import { toast } from 'react-toastify';

function* getNotification(action) {
  try {
    yield put({ type: UPDATE_LOADING_STATE, payload: true })
    const res = yield call(getNotificationApi, action.payload)
    if (res && res.result)
      yield put({ type: GET_NOTIFICATION_REQUEST_SUCCESS, payload: res.result })
      yield put({ type: UPDATE_LOADING_STATE, payload: false })
  }
  catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: UPDATE_LOADING_STATE, payload: false })
  }
}

function* updateStatusNoti(action) {
  try {
    const res = yield call(updateStatusNotiApi, action.payload)
    yield put({ type: UPDATE_STATUS_NOTIFICATION_SUCCESS, payload: { id: action.payload.NotificationId } })
  }
  catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* checkNewNotification(action) {
  try {
    const res = yield call(checkNewNotificationApi)
    if (res && res.result)
      yield put({ type: UPDATE_IS_NEW_NOTIFICATION, payload: res.result.totalNotificationCount ? true : false })
  }
  catch (error) {
    toast.error(error?.response?.data?.error?.message);
  }
}


function* acceptCollaborateRequest(action) {
  yield put({ type: UPDATE_LOADING_STATE, payload: true })
  try {
    const res = yield call(accpetCollaborate, action.payload)
    if (res && res.success) {
      yield put({ type: ACCEPT_COLLABORATE_SUCCESS, payload: { id: action.payload.notificationId } })
      if(action.isRefresh) {
        const responseMindMap = yield call(getMindMapData, { id: action.payload.mapId })
        if (responseMindMap.success) {
          yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
        }
      }
      if(action.onSuccess) action.onSuccess(action.payload.notificationId)
    }
    yield put({ type: UPDATE_LOADING_STATE, payload: false })
  }
  catch (error) {
    if (action.onFail && error.response.data.error.code === 100019) {
      action.onFail()
    }
    toast.error(error.response.data.error.message);
    yield put({ type: UPDATE_LOADING_STATE, payload: false })
  }
}


function* rejectCollaborateRequest(action) {
  yield put({ type: UPDATE_LOADING_STATE, payload: true })
  try {
    const res = yield call(rejectCollaborate, action.payload)
    if (res && res.success) {
      yield put({ type: REJECT_COLLABORATE_SUCCESS,payload: { id: action.payload.notificationId } })
      if(action.onSuccess) action.onSuccess(action.payload.notificationId)
    }
    yield put({ type: UPDATE_LOADING_STATE, payload: false })
  }
  catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: UPDATE_LOADING_STATE, payload: false })

  }
}

function* getCollaborateRequest(action) {
  try {
    const res = yield call(getCollaborate, action.payload)
    if (res && res.success) {
      yield put({ type: GET_COLLABORATE_SUCCESS, payload: res.result })
      if(action.onSuccess) action.onSuccess(action.payload.notificationId)
    }
  }
  catch (error) {
    toast.error(error.response.data.error.message);
  }
}


function* notificationSaga() {
  yield takeLatest(GET_NOTIFICATION_REQUEST, getNotification);
  yield takeLatest(UPDATE_STATUS_NOTIFICATION, updateStatusNoti)
  yield takeLatest(CHECK_NEW_NOTIFICATION, checkNewNotification)
  yield takeLatest(ACCEPT_COLLABORATE_REQUEST, acceptCollaborateRequest)
  yield takeLatest(REJECT_COLLABORATE_REQUEST, rejectCollaborateRequest)
  yield takeLatest(GET_COLLABORATE_REQUEST, getCollaborateRequest)
}

export default notificationSaga
