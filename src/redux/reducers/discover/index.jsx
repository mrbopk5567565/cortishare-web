import produce from 'immer';
import {
  CONCAT_DISCOVER,
  UPDATE_DISCOVER,
  SET_PARAMS_MAP_DISCOVER,
  SEARCH_ALL_SUCCESS,
  SET_PARAMS_SEARCH_ALL,
  UPDATE_MAP_LINKINGMIND,
  DELETE_MAP_LINKINGMIND
} from './actionTypes';

/*
  categoryId = 0 : get all caterogies
  tableType = 1 : Map
  tableType = 2 : POST
  tableType = 3 : User
*/

const initial = {
  mapDiscover: [],
  paramsMapDiscovery: {
    "page": 1,
    "size": 20,
    "search": "",
    "categoryId": 0,
    "tableType": 1,
  },
  paramsSearchAll: {
    "Page": 1,
    "Size": 20,
    "Search": "",
    "CategoryId": 0,
    "TableType": 1,
  },
  searchAll: [],
};

export const DiscoverReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONCAT_DISCOVER: {
        draft.mapDiscover = state.mapDiscover.concat(action.payload)
        break;
      }
      case UPDATE_DISCOVER: {
        draft.mapDiscover = action.payload
        break;
      }
      case SET_PARAMS_MAP_DISCOVER: {
        draft.paramsMapDiscovery = action.payload;
        break;
      }
      case UPDATE_MAP_LINKINGMIND: {
        let {mapId, title, privacy, preview } = action.payload;
        let privacyName
        if (privacy == 1 ) {
          privacyName = 'Public'
        } else if ( privacy == 2 ) {
          privacyName = 'Closed'
        } else {
          privacyName = 'Private'
        }
        
        let listdata = state.searchAll;
        let index  = listdata.findIndex(item => item.id == mapId);
        let item = listdata[index];
        let newItem;
        if(preview !== "undefined") {
          newItem = {
            ...item,
            title,
            thumbnail: preview,
            privacyName, 
          }
        } else {
          newItem = {
            ...item,
            title,
            privacyName, 
          }
        }
        listdata[index] = newItem;
        draft.searchAll = [...listdata];
        break;
      }
      case SET_PARAMS_SEARCH_ALL: {
        draft.paramsSearchAll = action.payload ? action.payload : [];
        break;
      }
      case DELETE_MAP_LINKINGMIND: {
        draft.searchAll = state.searchAll.filter(item => item.id != action.payload)
        break;
      }
      case SEARCH_ALL_SUCCESS: {
        if (action.isLoadMore) {
          draft.searchAll = [...draft.searchAll, ...action.payload];
        } else {
          draft.searchAll = action.payload;
        }
        break;
      }
    }
  });
export default {
  DiscoverReducer,
};
