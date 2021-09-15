import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { 
  GET_INFO_INVITE_MAP,
  GET_ALL_USER_TO_INVITE,
  UPDATE_INVITE_COLLAB, 
  GET_INFO_INVITE_MAP_SUCCESS, 
  CONCAT_USER_INVITE_COLLAB, 
  UPDATE_INVITE_USER,
  UPDATE_PERMISSION,
  REMOVE_PERMISSION,
  GET_MIND_MAP_DATA_SUCCESS,
  REQUEST_PERMISSION,
  GENERATE_AND_REMOVE_LINK_REQUEST,
  GENERATE_AND_REMOVE_LINK_SUCCESS,
  VALIDATE_LINK_REQUEST,
  VALIDATE_LINK_SUCCESS,
  GET_MAP_SHARING_MINDMAP,
} from 'redux/reducers/map/actionTypes'
import { 
  getInfoInviteMap, 
  getAllUserToInvite, 
  updateInviteUser, 
  updatePermission, 
  removePermission, 
  getMindMapData,
  requestPermission,
  generateAndRemoveLink,
  validateLink,
} from 'services/map/mapApi';
import { SET_IS_LOADING, SET_IS_NOT_LOADING } from 'redux/reducers/global/actionTypes'

import { toast } from 'react-toastify';


function* getInfoInviteMaplRequest(action) {
  try {
    const response = yield call(getInfoInviteMap, action.payload.mapId);
    if(response && response.result)
      yield put({ type: GET_INFO_INVITE_MAP_SUCCESS, payload: response.result })
    if(action.isRefresh) {
      const responseMindMap = yield call(getMindMapData, { id: action.payload.mapId })
      if (responseMindMap.success) {
        yield put({ type: GET_MAP_SHARING_MINDMAP, payload: responseMindMap.result.mapShareLink })
        yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
      }
    }
    if(action.onSuccess) {
      action.onSuccess()
    }
  } catch (error) {
    toast.error(error.response.data.error.message)
  }

}
function* getAllUserToInviteRequest(action) {
  try {
    if(action.payload.type === 'newSearchPatern')
      yield put({
        type: UPDATE_INVITE_COLLAB,
        payload: {
          user: [],
          searchPatern: '',
          page: 0,
          totalPage: 0,
          loadingUser: true
        }
      })
    else
      yield put({
        type: UPDATE_INVITE_COLLAB,
        payload: {
          loadingUser: true
        }
      })
    if(!action.payload.data.searchPatern)
      yield put({
        type: UPDATE_INVITE_COLLAB,
        payload: {
          user: [],
          searchPatern: '',
          page: 0,
          totalPage: 0,
          loadingUser: false
        }
      })
    else{
      const response = yield call(getAllUserToInvite, {
        Keyword: action.payload.data.searchPatern, 
        PageNumber: action.payload.data.page, 
        PageSize: action.payload.data.pageSize
      })
      if(response && response.result){
        const result = response.result
        if(action.payload.type === 'newSearchPatern'){
          yield put({
            type: UPDATE_INVITE_COLLAB,
            payload: {
              user: result.data,
              searchPatern: action.payload.data.searchPatern,
              page: action.payload.data.page,
              totalPage: result.pageTotal,
              loadingUser: false
            }
          })
        }
        else{
          yield put({
            type: CONCAT_USER_INVITE_COLLAB,
            payload: {
              user: result.data,
              page: action.payload.data.page,
              loadingUser: false
            }
          })
        }
      }
    }
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
}

function* updateInviteUserRequest(action){
  try {
    const response = yield call(updateInviteUser, action.payload);
    if(response && response.success) {
      if(action.onSuccess) {
        action.onSuccess()
      }
      toast.success('Invited users')
    }
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
}

function* updatePermissionRequest(action){
  try {
    const response = yield call(updatePermission, action.payload);
    if(response && response.success)
      toast.success('Updated permission')
    if (action.onSuccess) {
      action.onSuccess()
    }
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
}

function* removePermissionRequest(action){
  try {
    const response = yield call(removePermission, action.payload);
    if(response && response.success)
      toast.success('Remove Permission Success!')
    if (action.onSuccess) {
      action.onSuccess()
    }  
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
}

function* requestPermissionRequest(action){
  try {
    const response = yield call(requestPermission, action.payload);
    if(response && response.success)
      toast.success('Sent your request')
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
} 

function* generateAndRemoveLinkRequest(action){
  try {
    const response = yield call(generateAndRemoveLink, action.payload);
    if(response && response.success && response.result)
      toast.success('Create Link Success')
    yield put({ type: GENERATE_AND_REMOVE_LINK_SUCCESS, payload: response.result })
  } catch (error) {
    toast.error(error.response.data.error.message)
  }
} 

function* validateLinkRequest(action){
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(validateLink, action.payload);
    if (response.success) {
      action.history.push(`/board/${response.result.mapId}`)
    } else {
      action.history.push('/')
    }
    yield put({ type: VALIDATE_LINK_SUCCESS, payload: response.result })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message)
    yield put({ type: SET_IS_NOT_LOADING })
  }
} 

function* handleInfoInviteMap() {
  yield takeLatest(GET_INFO_INVITE_MAP, getInfoInviteMaplRequest);
  yield takeLatest(GET_ALL_USER_TO_INVITE, getAllUserToInviteRequest)
  yield takeLatest(UPDATE_INVITE_USER, updateInviteUserRequest)
  yield takeLatest(UPDATE_PERMISSION, updatePermissionRequest)
  yield takeLatest(REMOVE_PERMISSION, removePermissionRequest)
  yield takeLatest(REQUEST_PERMISSION, requestPermissionRequest)
  yield takeLatest(GENERATE_AND_REMOVE_LINK_REQUEST, generateAndRemoveLinkRequest)
  yield takeLatest(VALIDATE_LINK_REQUEST, validateLinkRequest)
}

export default handleInfoInviteMap