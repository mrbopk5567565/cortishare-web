import produce from 'immer';
import {
  HANDLE_GET_INFO_SUCCESS,
  HANDLE_GET_INFO_DETAIL_SUCCESS,
  HANDLE_SAVE_INFO_SUCCESS,
  HANDLE_FOLLOW_SUCCESS,
  HANDLE_GET_ALL_PLAN_REQUEST,
  HANDLE_GET_ALL_PLAN_SUCCESS,
  HANDLE_CANCEL_SUBSCRIPTION_SUCCESS,
  HANDLE_CANCEL_SUBSCRIPTION_ERROR,
  HANDLE_CANCEL_SUBSCRIPTION_REQUEST,
  HANDLE_CREATE_SUBSCRIPTION_SUCCESS,
  HANDLE_CREATE_SUBSCRIPTION_ERROR,
  HANDLE_CREATE_SUBSCRIPTION_REQUEST,
  HANDLE_UPDATE_SUBSCRIPTION_SUCCESS,
  HANDLE_UPDATE_SUBSCRIPTION_ERROR,
  HANDLE_UPDATE_SUBSCRIPTION_REQUEST,
  HANDLE_GET_BILLING_DETAIL_REQUEST,
  HANDLE_GET_BILLING_DETAIL_SUCCESS,
  HANDLE_GET_BILLING_DETAIL_ERROR,
  UPDATE_HELPER_USER_SUCCESS
} from './actionTypes';
import {isAuthentication} from 'helpers'
const initial = {
  detailProfile: {
    page: 1,
    totalPage: 0,
    size: 12,
    maps: [],
    info: {},
  },
  maps: [],
  info: {},
  plan: {},
  payment: {},
  paymentMethod: {},
  plans: [],
  billingDetail: [],
  isWatchedTutorial: null
};

export const ProfileReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HANDLE_GET_INFO_SUCCESS: {
        let maps = []
        if (action.payload.Customer.id === state.detailProfile.info.id) {
          maps = action.payload.Maps.page > state.detailProfile.page ? state.detailProfile.maps.concat(action.payload.Maps.data) : action.payload.Maps.data
        } else {
          maps = action.payload.Maps.data
        }
        draft.detailProfile.maps = maps;
        draft.maps = maps;
        draft.detailProfile.page = action.payload.Maps.page;
        draft.detailProfile.size = action.payload.Maps.size;
        if(isAuthentication(action.payload.Customer?.id)) {
          draft.isWatchedTutorial = action.payload.Customer.isWatchedTutorial;
        }
        draft.detailProfile.totalPage = action.payload.Maps.pageTotal;
        draft.detailProfile.info = action.payload.Customer;
        break;
      }
      case HANDLE_GET_INFO_DETAIL_SUCCESS: {
        draft.info = action.payload.customer;
        draft.plan = action.payload.plan;
        draft.payment = action.payload.payment;
        draft.paymentMethod = action.payload.paymentMethod;
        break;
      }
      case HANDLE_SAVE_INFO_SUCCESS: {
        break;
      }
      case HANDLE_FOLLOW_SUCCESS: {
        break;
      }
      case HANDLE_GET_ALL_PLAN_SUCCESS: {
        draft.plans = action.payload;
        break
      }
      case HANDLE_CANCEL_SUBSCRIPTION_SUCCESS: {

        break;
      }
      case HANDLE_CANCEL_SUBSCRIPTION_ERROR: {
        break;
      }
      case HANDLE_CANCEL_SUBSCRIPTION_REQUEST: {
        break;
      }
      case HANDLE_CREATE_SUBSCRIPTION_SUCCESS: {
        break;
      }
      case HANDLE_CREATE_SUBSCRIPTION_ERROR: {
        break;
      }
      case HANDLE_CREATE_SUBSCRIPTION_REQUEST: {
        break;
      }
      case HANDLE_UPDATE_SUBSCRIPTION_SUCCESS: {
        break;
      }
      case HANDLE_UPDATE_SUBSCRIPTION_ERROR: {
        break;
      }
      case HANDLE_UPDATE_SUBSCRIPTION_REQUEST: {
        break;
      }
      case HANDLE_GET_BILLING_DETAIL_ERROR: {
        break;
      }
      case HANDLE_GET_BILLING_DETAIL_REQUEST: {
        break;
      }
      case HANDLE_GET_BILLING_DETAIL_SUCCESS: {
        draft.billingDetail = action.payload;
        break;
      }
      case UPDATE_HELPER_USER_SUCCESS: {
        draft.isWatchedTutorial = true;
        break;
      }
      default: {
        break;
      }
    }
  });
export default {
  ProfileReducer,
};
