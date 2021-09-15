import produce from 'immer';
import {
  GET_NODE_BY_TAG_SUCCESS,
  ADD_NODE_TO_OTHER_MAP_SUCCESS
} from './actionTypes';

const initial = {
  tagList: []
};

export const TagReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NODE_BY_TAG_SUCCESS: {
        draft.tagList = action.payload ? action.payload : []
        break
      }
      case ADD_NODE_TO_OTHER_MAP_SUCCESS:{
        break
      }
      default: {
        break;
      }
    }
  });
export default {
  TagReducer,
};
