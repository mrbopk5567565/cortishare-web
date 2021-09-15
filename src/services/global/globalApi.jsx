import { APIInstance } from '../configApi';

export const getFollowingMaps = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/map/GetFollowingMaps`, { params: data })
  return res.result;
};
