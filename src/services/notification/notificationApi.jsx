import { APIInstance } from '../configApi';
export const getNotificationApi = async (data) => {
  // const res = await APIInstance.get(
  //   `${process.env.REACT_APP_API}/api/app/map/Create`, data, config)
  // return res;
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Notification/GetAllByCustomerId?page=${data.page}&size=${data.size}`)
  return res
};

export const updateStatusNotiApi = async (data) => {
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Notification/Update?NotificationId=${data.NotificationId}`)
  return res
}

export const checkNewNotificationApi = async () =>{
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Notification/CheckNotification`)
  return res
}

export const accpetCollaborate = async (data) =>{
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Notification/AcceptCollaborate?mapId=${data.mapId}&notificationId=${data.notificationId}`)
  return res
}

export const rejectCollaborate = async (data) =>{
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/Notification/RejectCollaborate?mapId=${data.mapId}&notificationId=${data.notificationId}`)
  return res
}

export const getCollaborate = async (data) =>{
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/Notification/ViewSchema?mapId=${data.mapId}&notificationId=${data.notificationId}`)
  return res
}
