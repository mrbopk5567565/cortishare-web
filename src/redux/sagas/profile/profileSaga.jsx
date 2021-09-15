import { takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  HANDLE_GET_INFO_REQUEST, HANDLE_GET_INFO_SUCCESS, HANDLE_GET_INFO_DETAIL_REQUEST, HANDLE_GET_INFO_DETAIL_SUCCESS, HANDLE_SAVE_INFO_REQUEST, HANDLE_SAVE_INFO_SUCCESS, HANDLE_FOLLOW_REQUEST
  , HANDLE_FOLLOW_SUCCESS,
  HANDLE_ADD_PAYMENT_METHOD,
  HANDLE_DELETE_PAYMENT_METHOD,
  HANDLE_DEACTIVE_ACCOUNT,
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
  UPDATE_HELPER_USER_SUCCESS,
  UPDATE_HELPER_USER_REQUEST
} from 'redux/reducers/profile/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING,SET_SHOW_HELPER } from 'redux/reducers/global/actionTypes'
import {
  getCustomerProfile,
  getAllPlan,
  apiFollow,
  getDetailProfile,
  saveDetailProfile,
  addPaymentMethod,
  deactiveAccount,
  deletePaymentMethod,
  updateHelper

} from 'services/customerProfile/customerProfileApi'
import {
  cancelSubscription,
  updateSubscription,
  createSubscription,
  getBillingDetail
} from 'services/payment/paymentApi'
import { toast } from 'react-toastify';

function* handleGetInfo(action) {
  try {
    if (action.isNotLoadingPage) {
      //
    } else {
      yield put({ type: SET_IS_LOADING })
    }
    // const customer = JSON.parse(localStorage.getItem('customer'));
    // if (!customer.customerId) {
    //   toast.error('Id not found');
    // }
    const response = yield call(getCustomerProfile, action.payload);
    if (action.onSuccess) {
      action.onSuccess()
    }
    yield put({ type: HANDLE_GET_INFO_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleGetInfoDetail(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer.customerId) {
      toast.error('Id not found');
    }
    const response = yield call(getDetailProfile, customer.customerId);
    if (response) {
      yield put({ type: HANDLE_GET_INFO_DETAIL_SUCCESS, payload: response })
    }
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleSaveInfo(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(saveDetailProfile, action.payload);
    if (response) {

      yield put({ type: HANDLE_SAVE_INFO_SUCCESS, payload: response })
      yield put({ type: SET_IS_NOT_LOADING })
      if (action.callbackFunc) {
        action.callbackFunc();
      }
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleFollow(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(apiFollow, action.payload);
    if (response) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      yield put({ type: HANDLE_FOLLOW_SUCCESS, payload: response })
      if (action.isFollow) {
        toast.success("Unfollow Success!");
      } else {
        toast.success("Follow Success!");
      }
      // yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}
function* handleAddPaymentMethod(action) {
  try {
    const res = yield call(addPaymentMethod, action.payload)
    // dispatch({
    //   type: HANDLE_GET_INFO_DETAIL_REQUEST
    // })
    yield put({ type: SET_IS_NOT_LOADING })
    if (action.callbackFunc)
      yield action.callbackFunc()
  }
  catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}
function* handleDeletePaymentMethod(action) {
  try {
    const res = yield call(deletePaymentMethod, action.payload)
    if (action.callbackFunc) {
      yield action.callbackFunc()
      if (yield delay(1000, true)) {
        yield put({ type: HANDLE_GET_INFO_DETAIL_REQUEST })
      }
      yield put({ type: SET_IS_NOT_LOADING })
    }
  }
  catch (error) {
    toast.error('Something was wrong');
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleDeactiveAccount(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const res = yield call(deactiveAccount, action.payload)
    toast.success('Deactived account');
    localStorage.clear();
    yield put({ type: SET_IS_NOT_LOADING })
    action.onSuccess();
  }
  catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}


function* handleGetAllPlan(action) {
  try {
    if (action.isLoading) {
      yield put({ type: SET_IS_LOADING })
    }
    const res = yield call(getAllPlan)
    if (res.success) {
      yield put({ type: HANDLE_GET_ALL_PLAN_SUCCESS, payload: res.result })
    }
    yield put({ type: SET_IS_NOT_LOADING })
  }
  catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleUpdateSubscription(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const res = yield call(updateSubscription, action.payload)
    if (res.success) {
      yield put({ type: HANDLE_UPDATE_SUBSCRIPTION_SUCCESS })
      yield put({ type: HANDLE_GET_INFO_DETAIL_REQUEST })
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
    yield put({ type: SET_IS_NOT_LOADING })
  }
  catch (error) {
    if (action.onFailure) {
      yield action.onFailure()
    }
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: HANDLE_UPDATE_SUBSCRIPTION_ERROR })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleCreateSubscription(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const res = yield call(createSubscription, action.payload)
    if (res.success) {
      yield put({ type: HANDLE_CREATE_SUBSCRIPTION_SUCCESS, payload: res.result })
      if (action.onSuccess) {
        yield setTimeout(function () {
          action.onSuccess();
        }, 5000);
      }
    }
  }
  catch (error) {
    if (action.onFailure) {
      yield action.onFailure();
    }
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: HANDLE_CREATE_SUBSCRIPTION_ERROR })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleCancelSubscription(action) {
  try {
    const res = yield call(cancelSubscription, action.payload)
    if (res.success) {
      yield put({ type: HANDLE_CANCEL_SUBSCRIPTION_SUCCESS, payload: res.result })
      if (action.onSuccess) {
        yield action.onSuccess();
      }
    }
    if (res.failure) {
      toast.error('Something was wrong');
      yield put({ type: SET_IS_NOT_LOADING })
    }
  }
  catch (error) {
    toast.error('Something was wrong');
    if (action.response) {
      yield action.onFailure();
    }
    yield put({ type: HANDLE_CANCEL_SUBSCRIPTION_ERROR })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleGetBillingDetail(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const res = yield call(getBillingDetail, action.payload)
    if (res.success) {
      yield put({ type: HANDLE_GET_BILLING_DETAIL_SUCCESS, payload: res.result.data })
    }
    yield put({ type: SET_IS_NOT_LOADING })
  }
  catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: HANDLE_GET_BILLING_DETAIL_ERROR })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleUpdateHelperUser(){
  try {
    const res = yield call(updateHelper)
    if (res.success) {
      yield put({
        type: UPDATE_HELPER_USER_SUCCESS,
      })
    }
  }
  catch (error) {
    toast.error(error && error.response && error.response.data && error.response.data.error && error.response.data.error.message);
    yield put({ type: HANDLE_GET_BILLING_DETAIL_ERROR })
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* handleProfile() {
  yield takeLatest(HANDLE_GET_INFO_REQUEST, handleGetInfo);
  yield takeLatest(HANDLE_GET_INFO_DETAIL_REQUEST, handleGetInfoDetail);
  yield takeLatest(HANDLE_SAVE_INFO_REQUEST, handleSaveInfo);
  yield takeLatest(HANDLE_FOLLOW_REQUEST, handleFollow);
  yield takeLatest(HANDLE_ADD_PAYMENT_METHOD, handleAddPaymentMethod)
  yield takeLatest(HANDLE_DELETE_PAYMENT_METHOD, handleDeletePaymentMethod)
  yield takeLatest(HANDLE_DEACTIVE_ACCOUNT, handleDeactiveAccount)
  yield takeLatest(HANDLE_GET_ALL_PLAN_REQUEST, handleGetAllPlan)
  yield takeLatest(HANDLE_CANCEL_SUBSCRIPTION_REQUEST, handleCancelSubscription)
  yield takeLatest(HANDLE_CREATE_SUBSCRIPTION_REQUEST, handleCreateSubscription)
  yield takeLatest(HANDLE_UPDATE_SUBSCRIPTION_REQUEST, handleUpdateSubscription)
  yield takeLatest(HANDLE_GET_BILLING_DETAIL_REQUEST, handleGetBillingDetail)
  yield takeLatest(UPDATE_HELPER_USER_REQUEST, handleUpdateHelperUser)

}

export default handleProfile
