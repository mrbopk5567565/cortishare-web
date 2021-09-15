import produce from 'immer';
import { urlify } from 'helpers'
import {
  CREATE_NODE_SUCCESS,
  UPDATE_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  GET_DETAIL_POST_BY_ID_SUCCESS,
  GET_COLLECT_IMAGES_FROM_URL_SUCCESS,
  CREATE_POST_SUCCESS,
  GET_NODES_BY_ID_SUCCESS,
  SELECT_NODES_IN_TREE_VIEW,
  SET_TITLE_NODE,
  DELETE_POST_SUCCESS,
  GET_POSTS_BY_NODE_ID_SUCCESS,
  SET_LOADING_COMMENT,
  GET_COMMENT_BY_MAP_ID_SUCCESS,
  RESET_NODE_POST,
  SET_IS_LOADING_CREATE_POST,
  SET_IS_NOT_LOADING_CREATE_POST,
  RESET_NODE_DETAIL,
  RESET_POST_DETAIL,
  SET_IS_LOADING_POST,
  SET_IS_NOT_LOADING_POST,
} from './actionTypes';

const initial = {
  isLoading: false,
  nodes: [],
  posts: [],
  nodeDetail: {},
  postDetail: {},
  collectImages: [],
  createPost: {},
  nodesByMapid: null,
  nodesSelect: null,
  titleNode: '',
  loadingComment: false,
  comments: [],
  totalCountComment: 0,
  pageTotalComment: 0,
  currentPageComment: 0,
  viewMoreComment: false,
  viewMorePost: false,
  isLoadingPost: false
};

export const NodeReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_IS_LOADING_CREATE_POST: {
        draft.isLoading = true;
        break;
      }
      case SET_IS_NOT_LOADING_CREATE_POST: {
        draft.isLoading = false;
        break;
      }
      case CREATE_NODE_SUCCESS: {
        break;
      }
      case UPDATE_NODE_SUCCESS: {
        break;
      }
      case DELETE_NODE_SUCCESS: {
        break;
      }
      case SET_TITLE_NODE: {
        draft.titleNode = action.payload;
        break;
      }
      case CREATE_POST_SUCCESS:
        draft.createPost = action.payload
        break;
      case GET_DETAIL_POST_BY_ID_SUCCESS: {
        draft.postDetail = action.payload
        break;
      }
      case GET_COLLECT_IMAGES_FROM_URL_SUCCESS: {
        draft.collectImages = action.payload || []
        break;
      }
      case GET_NODES_BY_ID_SUCCESS: {
        draft.nodesByMapid = action.payload;
        break;
      }
      case SELECT_NODES_IN_TREE_VIEW: {
        draft.nodesSelect = action.payload;
        break
      }
      case GET_POSTS_BY_NODE_ID_SUCCESS: {
        // let tags = action.payload.tags.split(',');
        // tags = tags.map(item =>
        //   item = '#' + item
        // );

        if (Object.keys(state.nodeDetail).length !== 0 && Object.keys(state.nodeDetail.posts).length !== 0 && Object.keys(action.payload).length !== 0) {
          action.payload.posts.data = action.payload.posts.page > state.nodeDetail.posts.page ? state.nodeDetail.posts.data.concat(action.payload.posts.data) : action.payload.posts.data
        }
        draft.nodeDetail = action.payload;
        draft.viewMorePost = action.payload.posts.pageTotal > action.payload.posts.page ? true : false;
        // draft.nodeDetail.tags = tags;
        break
      }
      case SET_LOADING_COMMENT: {
        draft.loadingComment = action.payload
        break;
      }
      case GET_COMMENT_BY_MAP_ID_SUCCESS: {
        draft.totalCountComment = action.payload.totalCount;
        draft.pageTotalComment = action.payload.pageTotal;
        draft.currentPageComment = action.payload.page;

        draft.viewMoreComment = action.payload.pageTotal > action.payload.page ? true : false;
        if (draft.currentPageComment > 1) {
          draft.comments = draft.comments.concat(action.payload.data);
        } else {
          draft.comments = action.payload.data
        }
        break;
      }
      case RESET_NODE_POST: {
        return initial
      }
      case RESET_NODE_DETAIL: {
        draft.nodeDetail = {}
        break;
      }
      case RESET_POST_DETAIL: {
        draft.postDetail = {}
        draft.comments = []
        break;
      }
      case DELETE_POST_SUCCESS: {
        if (action.payload && Object.keys(draft.nodeDetail).length !== 0) {
          draft.nodeDetail.posts.data = draft.nodeDetail.posts.data.filter((item) => item.postId !== action.payload)
        }
        break;
      }
      case SET_IS_LOADING_POST: {
        draft.isLoadingPost = true
        break;
      }
      case SET_IS_NOT_LOADING_POST: {
        draft.isLoadingPost = false
        break;
      }
      default: {
        break;
      }
    }
  });
export default {
  NodeReducer,
};
