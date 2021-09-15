import { APIInstance } from '../configApi';

let initData = {
  "userNameOrEmailAddress": "sin21",
  "password": "123123123",
  "rememberClient": true
}

export const login = async (data = initData) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/Login`, data);
  return res.result
};

export const register = async (data = initData) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/Register`, data);
  return res.success;
};

export const changePassword = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/ChangePassword`, data);
  return res;
};

export const resetPassword = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/ResetPassword`, data);
  return res;
};

export const verifyEmailApi = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/VerifyRegisteredEmail?token=${data}`);
  return res;
}

export const resentEmailApi = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/TokenAuth/ResendVerificationMail`,data);
  return res;
}

export const unsubcribeEmail = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Notification/UnsubscribeEmail?token=${data}`);
  return res;
}