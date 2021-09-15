import produce from 'immer';
import { toast } from 'react-toastify';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESENT_EMAIL_ERROR,
  RESENT_EMAIL_SUCCESS,
} from './actionTypes';

const initial = {
  authentication: {},
  successLogin: false,
  successRegister: false,
  register: {}
};

export const authenticationReducer = (state = initial, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS: {
        draft.authentication = action.payload;
        draft.successLogin = true;
        // toast.success("Login Success!");
        break;
      }
      case LOGIN_ERROR: {
        toast.error(action.payload);
        break;
      }
      case REGISTER_SUCCESS: {
        draft.authentication = action.payload;
        draft.successRegister = true;
        toast.success("Register Success!");
        break;
      }
      case REGISTER_ERROR: {
        toast.error(action.payload);
        break;
      }
      case CHANGE_PASSWORD_SUCCESS: {
        toast.success("Change Password Success!");
        break;
      }
      case CHANGE_PASSWORD_ERROR: {
        toast.error(action.payload)
        break;
      }
      case RESET_PASSWORD_SUCCESS: {
        toast.success("Reset Password Success!");
        break;
      }
      case RESET_PASSWORD_ERROR: {
        toast.error(action.payload);
        break;
      }
      case RESENT_EMAIL_SUCCESS: {
        toast.success("New Confirmation Email Sent!");
        break;
      }
      case RESENT_EMAIL_ERROR: {
        toast.error(action.payload)
        break;
      }
      default: {
        break;
      }
    }
  });

