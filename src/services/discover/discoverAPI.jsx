import { APIInstance } from '../configApi';

export const getAllMapDiscover = async (data) => {
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}​/api/app/Discover/GetAll`, data)
  return res.result;
};

export const searchAll = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/search/SearchAll`,
    {
      params: data
    }
  )
  return res.result;
};