import produce from 'immer';
import {
  GET_ALL_MAP_REQUEST,
  GET_ALL_MAP_SUCCESS,
  GET_ALL_MAP_ERROR,
  GET_MY_FEED_SUCCESS,
} from './actionTypes';

const initial = {
  recents: {
    data: [],
    age: 1,
    size: 20,
    pageTotal: 0,
  },
  myFeed: {
    data: [],
    page: 1,
    size: 20,
    pageTotal: 0,
  },
};

export const HomeReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_MAP_SUCCESS: {
        draft.recents.data =  action.payload.page > draft.recents.page ? draft.recents.data.concat(action.payload.data) : action.payload.data
        draft.recents.page = action.payload.page;
        draft.recents.size = action.payload.size;
        draft.recents.pageTotal = action.payload.pageTotal;
        break;
      }
      case GET_MY_FEED_SUCCESS: {
        if (!action.payload.data) {
          draft.myFeed.data = []
        } else {
          draft.myFeed.data = action.payload.page > draft.myFeed.page ? draft.myFeed.data.concat(action.payload.data) : action.payload.data
        }
        draft.myFeed.page = action.payload.page;
        draft.myFeed.size = action.payload.size;
        draft.myFeed.pageTotal = action.payload.pageTotal;
        break;
      }
      default:
        break;
    }
  });
export default {
  HomeReducer,
};
