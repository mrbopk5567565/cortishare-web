import { APIInstance } from '../configApi';

export const getAllMap = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/Home/GetAllMap`, { params: data })
  return res.result;
};

export const getMyFeed = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/Home/GetMyFeed`, { params: data })
  return res.result;
};