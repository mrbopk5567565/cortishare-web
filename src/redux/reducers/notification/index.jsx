import produce from 'immer';
import {
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_REQUEST_SUCCESS,
  UPDATE_LOADING_STATE,
  UPDATE_STATUS_NOTIFICATION_SUCCESS,
  RESET_NOTIFICATION,
  UPDATE_IS_NEW_NOTIFICATION,
  ACCEPT_COLLABORATE_REQUEST,
  ACCEPT_COLLABORATE_SUCCESS,
  REJECT_COLLABORATE_REQUEST,
  REJECT_COLLABORATE_SUCCESS,
  GET_COLLABORATE_SUCCESS,
} from './actionTypes';


const initial = {
  newNotification: false,
  page: 0,
  totalPage: 0,
  size: 10,
  notis: [],
  loading: false,
  mapRequested: null,
};

export const NotificationReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_LOADING_STATE:{
        draft['loading'] = action.payload
        break
      }
      case RESET_NOTIFICATION:{
        Object.entries(initial).forEach(([k, v]) => {
          if(k !== 'mapRequested') {
            draft[k] = v;
          }
        })
        break
      }
      case GET_NOTIFICATION_REQUEST_SUCCESS:{
        draft['page'] = state.page + 1
        draft['totalPage'] = action.payload.pageTotal
        draft['notis'] = state.notis.concat(action.payload.data)
        draft['loading'] = false
        break
      }
      case ACCEPT_COLLABORATE_SUCCESS: {
        const idx = state.notis.findIndex(item => item.id === action.payload.id)
        if(idx > -1 ) {
          draft['notis'][idx].status = 'Accept';
          draft['notis'][idx].isRead = true
        }
        break;
      }
      case REJECT_COLLABORATE_SUCCESS: {
        const idx = state.notis.findIndex(item => item.id === action.payload.id)
        if(idx > -1 ) {
          draft['notis'][idx].status = 'Reject';
          draft['notis'][idx].isRead = true
        }
        break;
      }
      case UPDATE_STATUS_NOTIFICATION_SUCCESS:{
        const idx = state.notis.findIndex(item => item.id === action.payload.id)
        if(idx > -1 )
          draft['notis'][idx].isRead = true;
        break;
      }
      case GET_COLLABORATE_SUCCESS:{
        draft['mapRequested'] = action.payload
        break;
      }
      case UPDATE_IS_NEW_NOTIFICATION: {
        draft['newNotification'] = action.payload
        break;
      }
      default: {
        break;
      }
    }
  });
export default NotificationReducer

