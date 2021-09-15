import { APIInstance } from '../configApi';

export const getFollowingCustomers = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/Customer/GetFollowingCustomers`, { params: data })
  return res.result;
};
