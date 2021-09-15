import produce from 'immer';
import {
  SET_IS_LOADING,
  SET_IS_NOT_LOADING,
  SET_CONTENT_ERROR,
  SET_WIDTH_LEFT_SPLIT,
  SET_IS_EDIT_MAP,
  SET_BREADCRUMBS,
  SET_SHOW_HELPER,
  GET_FOLLOWING_MAPS_SUCCESS,
} from './actionTypes';

const initial = {
  isLoading: false,
  contentError: {},
  widthSplit: window.innerWidth * 1 / 3,
  isEditMap: false,
  dataHeader: {
    breadcrumbs: [],
    privacy: '',
  },
  showHelper: false,
  followingMaps: {
    data: [],
    pageNumber: 0,
    pageTotal: 1,
    pageSize: 10,
  }
};

export const globalReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_IS_LOADING: {
        draft.isLoading = true;
        break;
      }
      case SET_IS_NOT_LOADING: {
        draft.isLoading = false;
        break;
      }
      case SET_CONTENT_ERROR: {
        draft.contentError = action.payload;
        break;
      }
      case SET_WIDTH_LEFT_SPLIT: {
        draft.widthSplit = action.widthSplit;
        break;
      }
      case SET_IS_EDIT_MAP: {
        draft.isEditMap = action.payload;
        break;
      }
      case SET_BREADCRUMBS: {
        draft.dataHeader = {...draft.dataHeader, ...action.payload};
        break;
      }
      case SET_SHOW_HELPER: {
        draft.showHelper = action.payload;
        break
      }
      case GET_FOLLOWING_MAPS_SUCCESS: {
        if (action.payload.page > draft.followingMaps.pageNumber) {
          draft.followingMaps.data = [...draft.followingMaps.data, ...action.payload.data]
        } else {
          draft.followingMaps.data = action.payload.data
        }
        draft.followingMaps.pageNumber = action.payload.page
        draft.followingMaps.pageSize = action.payload.size
        draft.followingMaps.pageTotal = action.payload.pageTotal
        break
      }
      default: {
        break;
      }
    }
  });
export default {
  globalReducer,
};
