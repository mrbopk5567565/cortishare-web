import { APIInstance } from '../configApi';
export const cancelSubscription = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/CancelSubscription`)
  return res
};

export const updateSubscription = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/UpdateSubscription`, data)
  return res
};

export const createSubscription = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/CreateSubscription`, data)
  return res
};

export const getBillingDetail = async (data) => {
  const page = 1;
  const size = 10;
  const res = await APIInstance.get(`${process.env.REACT_APP_API}​/api/app/Customer/GetTransactionHistory?page=${page}&size=${size}`)
  return res
};




