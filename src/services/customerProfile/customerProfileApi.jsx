import { APIInstance } from '../configApi';

export const getCustomerProfile = async (data) => {
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Customer/GetCustomerProfile`, { params: data });
  return res.result;
};

export const apiFollow = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/SaveFollowUsers?CustomeFollowingId=${data}`, );
  return res.success;
};

export const getDetailProfile = async (data) => {
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Customer/EditProfile?customerId=${data}`);
  return res.result;
};

export const saveDetailProfile = async (data) => {
  const res = await APIInstance.put(`${process.env.REACT_APP_API}/api/app/Customer/EditProfile`, data);
  return res.success;
};

export const updateHelper = async () => {
  const res = await APIInstance.patch(`${process.env.REACT_APP_API}/api/app/Customer/EditProfile`,{isWatchedTutorial: true});
  return res;
};

export const addPaymentMethod = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/AddPaymentMethod`, data);
  return res;
};

export const deletePaymentMethod = async (data) => {
  const res = await APIInstance.delete(`${process.env.REACT_APP_API}/api/app/Customer/DeletePaymentMethod?paymentMethodId=${data.paymentMethodId}`);
  return res;
};

export const getAllPlan = async (data) => {
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Customer/OptionUnlimitedPlan`);
  return res;
};

export const deactiveAccount = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Customer/DeactiveAccount`, data);
  return res;
};
