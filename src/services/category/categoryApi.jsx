import { APIInstance } from '../configApi';

export const getCategory = async () => {
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/map/GetCategories`);
  return res.result
};
