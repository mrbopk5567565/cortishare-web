import produce from 'immer';
import {
  CREATE_MAP_ERROR,
  CREATE_MAP_SUCCESS,
  UPDATE_MAP_ERROR,
  UPDATE_MAP_SUCCESS,
  GET_ALL_BY_CUSTOMER_SUCCESS,
  GET_MAP_DETAIL_SUCCESS,
  GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_SUCCESS,
  GET_POSTS_BY_MAP_ID_SUCCESS,
  SAVE_FOLLOW_MAP_SUCCESS,
  SEARCH_TAGS_SUCCESS,
  SET_SELECT_NODE,
  GET_MIND_MAP_DATA_SUCCESS,
  UPDATE_MIND_MAP_DATA_VIEW,
  GET_INFO_INVITE_MAP_SUCCESS,
  UPDATE_INVITE_COLLAB,
  CONCAT_USER_INVITE_COLLAB,
  ADD_USER_INVITE,
  REMOVE_USER_INVITE,
  UPDATE_USER_INVITE_PERMISSION,
  SEARCH_MAP_BY_KEY_SUCCESS,
  SET_LOADING_SEARCH_MY_MAP,
  SET_LOADING_FOLLOW,
  RESET_MINDMAP,
  SET_BLUR,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS,
  RESET_MAP_DETAIL,
  SEARCH_KEYMAP_SUCCESS,
  GENERATE_AND_REMOVE_LINK_SUCCESS,
  VALIDATE_LINK_SUCCESS,
  GET_MAP_SHARING_MINDMAP,
  RESET_LIST_USER_INVITE,
  GET_PENDING_MAP_SHARING_SUCCESS,
  GET_FOLLOWING_CUSTOMERS_SUCCESS,
} from './actionTypes';

import {
  DELETE_POST_SUCCESS
} from 'redux/reducers/node/actionTypes';

import { formatNodeData, omitNodeOtherMap } from 'helpers'
const initInviteCollab = {
  inviteUser: [],
  listUsers: {
    userOwner: [],
    userEdits: [],
    userViews: [],
    userPendings: [],
    userNew: [],
  },
  numberOfCollaborators: 0,
  user: [],
  searchPatern: '',
  page: 0,
  totalPage: 0,
  pageSize: 10,
  loadingUser: false,
  mapShareLink: {
    url: '',
    enable: false,
  },
  inviteByLink: 0,
}
const initial = {
  maps: [],
  page: 1,
  totalPage: 0,
  pageSize: 12,
  mapUpdate: {},
  followings: {},
  followingsMap: {
    data: [],
    page: 1,
    pageTotal: 0,
    size: 12,
  },
  viewMap: {},
  viewMorePost: false,
  isFollow: null,
  searchTags: [],
  selectNode: {
    nodeId: null,
    mapId: null,
    root: false,
    topic: null
  },
  dataMindMap: {},
  currentRootMap: null,
  dataMindMapAddOtherNode: {},
  searchKeyWord: [],
  loadingSearch: false,
  inviteCollab: initInviteCollab,
  loadingFollow: false,
  isBlur: false,
  searchKey: [],
  pendingMapSharing: null,
  followingsCustomer: {
    data: [],
    page: 0,
    size: 0,
    pageTotal: 0,
  }
};

export const MapReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_MAP_SUCCESS: {
        // draft.mapUpdate = action.payload;
        break;
      }
      case CREATE_MAP_ERROR: {
        break;
      }
      case UPDATE_MAP_SUCCESS: {
        draft.mapUpdate = action.payload;
        break;
      }
      case UPDATE_MAP_ERROR: {
        break;
      }
      case GET_ALL_BY_CUSTOMER_SUCCESS: {
        draft.maps = action.payload.page > draft.page ? draft.maps.concat(action.payload.data) : action.payload.data
        draft.page = action.payload.page;
        draft.size = action.payload.size;
        draft.totalPage = action.payload.pageTotal;
        break;
      }
      case GET_ALL_BY_CUSTOMER_ID_AND_FOLLOWING_SUCCESS: {
        if (Object.keys(state.followingsMap).length !== 0) {
          action.payload.data = action.payload.page > state.followingsMap.page ? state.followingsMap.data.concat(action.payload.data) : action.payload.data
        }
        draft.followingsMap = {...draft.followingsMap, ...action.payload};
        break;
      }
      case GET_POSTS_BY_MAP_ID_SUCCESS: {
        if (Object.keys(state.viewMap).length !== 0 && state.viewMap.posts && Object.keys(state.viewMap.posts).length !== 0) {
          action.payload.posts.data = action.payload.posts.page > state.viewMap.posts.page ? state.viewMap.posts.data.concat(action.payload.posts.data) : action.payload.posts.data
        }
        draft.viewMap = action.payload;
        draft.viewMorePost = action.payload.posts.pageTotal > action.payload.posts.page ? true : false;
        break;
      }
      case SAVE_FOLLOW_MAP_SUCCESS: {
        draft.isFollow = action.payload;
        break;
      }
      case SEARCH_TAGS_SUCCESS: {
        draft.searchTags = action.payload;
        break;
      }
      case SET_SELECT_NODE: {
        draft.selectNode = action.payload;
        break;
      }
      case GET_MIND_MAP_DATA_SUCCESS: {
        draft.dataMindMap = action.payload;
        if (action.payload.nodeData) {
          draft.dataMindMap.nodeData = formatNodeData(action.payload.nodeData)
          draft.currentRootMap = action.payload.nodeData.mapId
        }
        break;
      }
      case UPDATE_MIND_MAP_DATA_VIEW: {
        state.dataMindMap.viewType = action.payload
        break;
      }
      case GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS: {
        draft.dataMindMapAddOtherNode = action.payload;
        if (action.payload.nodeData) {
          draft.dataMindMapAddOtherNode.nodeData = omitNodeOtherMap(action.payload.nodeData)
          // draft.currentRootMap = action.payload.nodeData.mapId
        }
        break;
      }
      case GET_MAP_DETAIL_SUCCESS: {
        draft.mapUpdate = action.payload;
        if (action.payload.tags === 'null') {
          draft.mapUpdate.tags = [];
        } else {
          let tags = action.payload.tags.split(',');
          tags = tags.map(item =>
            item = '#' + item
          );
          draft.mapUpdate.tags = tags;
        }
        break;
      }
      case GET_INFO_INVITE_MAP_SUCCESS: {
        let userOwner = [];
        let userEdits = [];
        let userViews = [];
        let userPendings = [];
        if (action.payload.length !== 0) {
          action.payload.map((user) => {
            if (user.status === "Accepted") {
              switch (user.permission) {
                case "Owner":
                  userOwner = [...userOwner, user]
                  break;
                case "Edit":
                  userEdits = [...userEdits, user]
                  break;
                case "View":
                  userViews = [...userViews, user]
                  break;

                default:
                  break;
              }
            } else {
              userPendings = [...userPendings, user]
            }
          })
        }

        draft.inviteCollab.listUsers.userOwner = userOwner
        draft.inviteCollab.listUsers.userEdits = userEdits
        draft.inviteCollab.listUsers.userViews = userViews
        draft.inviteCollab.listUsers.userPendings = userPendings
        draft.inviteCollab.inviteUser = [...userOwner, ...userEdits, ...userViews, ...userPendings]
        // draft.inviteCollab.inviteUser = action.payload
        draft.inviteCollab.numberOfCollaborators = userEdits.length
        break
      }
      case ADD_USER_INVITE: {
        draft.inviteCollab.listUsers.userNew = [...draft.inviteCollab.listUsers.userNew, action.payload]
        draft.inviteCollab.inviteUser = [...state.inviteCollab.inviteUser, action.payload]
        break
      }
      case REMOVE_USER_INVITE: {
        const data = draft.inviteCollab.inviteUser.filter(item => item.customerEmail !== action.payload.customerEmail)
        draft.inviteCollab.inviteUser = data
        if (action.payload.status === 'New') {
          const userNew = draft.inviteCollab.listUsers.userNew.filter((item) => item.customerEmail !== action.payload.customerEmail)
          draft.inviteCollab.listUsers.userNew = userNew
        }
        break;
      }
      case UPDATE_USER_INVITE_PERMISSION: {
        const data = draft.inviteCollab.inviteUser.map(item => {
          if (item.customerEmail === action.payload.customerEmail) return action.payload
          return item
        })
        draft.inviteCollab.inviteUser = data
        // payload: {
        //   customerId: customerInfo.customerId,
        //   customerEmail: customerInfo.customerEmail,
        //   customerFullName: customerInfo.customerFullName,
        //   permission: permission,
        //   customerUserName: customerInfo.customerUserName,
        //   profilePicture: customerInfo.profilePicture,
        //   id: null,
        //   status: "New",
        // }
        if (action.payload.status === 'New') {
          const userNew = draft.inviteCollab.listUsers.userNew.map((item) => {
            if (item.customerEmail === action.payload.customerEmail) return action.payload
            return item
          })
          draft.inviteCollab.listUsers.userNew = userNew
        }
        break;
      }
      case RESET_LIST_USER_INVITE: {
        draft.inviteCollab.listUsers = initInviteCollab.listUsers
        break;
      }
      case UPDATE_INVITE_COLLAB: {
        Object.entries(action.payload).forEach(([k, v]) => draft.inviteCollab[k] = v)
        break
      }
      case CONCAT_USER_INVITE_COLLAB: {
        Object.entries(action.payload).forEach(([key, val]) => {
          if (key !== 'user')
            draft.inviteCollab[key] = val
          else
            draft.inviteCollab.user = state.inviteCollab.user.concat(val)
        })
        break
      }
      case SEARCH_MAP_BY_KEY_SUCCESS: {
        draft.searchKeyWord = action.payload;
        break;
      }
      case SET_LOADING_SEARCH_MY_MAP: {
        draft.loadingSearch = action.payload;
        break;
      }
      case SET_LOADING_FOLLOW: {
        draft.loadingFollow = action.payload;
        break;
      }
      case RESET_MINDMAP: {
        return initial
        break;
      }
      case SET_BLUR: {
        draft.isBlur = action.payload;
        break;
      }
      case RESET_MAP_DETAIL: {
        draft.viewMap = {};
        break;
      }
      case SEARCH_KEYMAP_SUCCESS: {
        draft.searchKey = action.payload ? action.payload : []
        break
      }
      case GENERATE_AND_REMOVE_LINK_SUCCESS: {
        draft.inviteCollab.mapShareLink.url = action.payload
        if (!action.payload) {
          draft.inviteCollab.mapShareLink.enable = false
        }
        break
      }
      case GET_MAP_SHARING_MINDMAP: {
        draft.inviteCollab.mapShareLink = { ...draft.inviteCollab.mapShareLink, ...action.payload }
        break
      }
      case VALIDATE_LINK_SUCCESS: {
        draft.inviteCollab.inviteByLink = action.payload
        break
      }
      case DELETE_POST_SUCCESS: {
        if (action.payload && Object.keys(draft.viewMap).length !== 0) {
          draft.viewMap.posts.data = draft.viewMap.posts.data.filter((item) => item.postId !== action.payload)
        }
        break;
      }
      case GET_PENDING_MAP_SHARING_SUCCESS: {
        draft.pendingMapSharing = action.payload
        break;
      }
      case GET_FOLLOWING_CUSTOMERS_SUCCESS: {
        draft.followingsCustomer.data = action.payload.page > state.page ? state.followingsCustomer.data.concat(action.payload.data) : action.payload.data
        draft.followingsCustomer.page = action.payload.page;
        draft.followingsCustomer.size = action.payload.size;
        draft.followingsCustomer.pageTotal = action.payload.pageTotal;
        draft.followingsCustomer.totalCount = action.payload.totalCount;

        break;
      }
      default: {
        break;
      }
    }
  });
export default {
  MapReducer,
};
