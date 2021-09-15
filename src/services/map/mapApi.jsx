import { APIInstance } from '../configApi';

const config = {
  headers: {
    // 'Content-Type': 'multipart/form-data',
    // "Content-Type": "application/json; charset=utf-8",
  }
}
export const createMap = async (data) => {
  if (!data) return;
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/map/Create`, data, config)
  return res;
};

export const searchMap = async (search) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/map/GetAllByCustomer?search=${search}`, config)
  return res.result;
};

export const updateMap = async (body) => {
  if (!body) return;
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}​/api/app/map/Update`, body, config)
  return res;
};

export const updateViewTypeMap = async (body) => {
  if (!body) return;
  const res = await APIInstance.patch(
    `${process.env.REACT_APP_API}​/api/app/map/UpdateMap`, body)
  return res;
};

export const deleteMap = async (mapId) => {
  if (!mapId) return;
  const res = await APIInstance.delete(
    `${process.env.REACT_APP_API}​/api/app/map/DeleteMap?mapId=${mapId}`
  )
  return res
}

export const getDetail = async (id) => {
  if (!id) return;
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/Update?mapId=${id}`, config)
  return res.result;
};

export const getAllByCustomer = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/map/GetAllByCustomer`, { params: data })
  return res.result;
};

export const getAllByCustomerIdAndFollowing = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/GetAllByCustomerIdAndFollowing`, { params: data })
  return res.result;
};

export const getPostsByMapId = async (data) => {
  const { id } = data
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/GetPostsByMapId`, { params: data })
  return res.result;
};

export const saveFollowMap = async (mapId) => {
  if (!mapId) return;
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/map/SaveFollowMap`, mapId)
  return res.result;
};

export const searchTags = async (search) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/SearchTags?search=${search}`)
  return res;
};

export const getMindMapData = async (data) => {
  const { id } = data
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/GetMindMapData?mapId=${id}`)
  return res;
};

export const getInfoInviteMap = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/mapsharing/GetAll?mapId=${data}`)
  return res;
}

export const getAllUserToInvite = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/Customer/Search?Keyword=${encodeURIComponent(data.Keyword)}&PageSize=${data.PageSize}&PageNumber=${data.PageNumber}`)
  return res;
}

export const updateInviteUser = async (data) => {
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}​/api/app/mapSharing/Invite`, data)
  return res;
}

export const updatePermission = async (data) => {
  const res = await APIInstance.put(
    `${process.env.REACT_APP_API}​/api/app/mapsharing/UpdatePermission`, data)
  return res;
}

export const removePermission = async (form) => {
  if (!form) return
  if (!form.mapSharingId) {
    const res = await APIInstance.delete(
      `${process.env.REACT_APP_API}​/api/app/mapsharing/RemovePermission?MapId=${form.mapId}&Email=${form.email}`)
    return res;
  } else {
    const res = await APIInstance.delete(
      `${process.env.REACT_APP_API}​/api/app/mapsharing/RemovePermission?MapSharingId=${form.mapSharingId}`)
    return res;
  }
}

export const requestPermission = async (data) => {
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/mapsharing/RequestPermission`, data)
  return res;
}

export const generateAndRemoveLink = async ({ mapId }) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/mapsharing/GenerateAndRemoveLink?mapId=${mapId}`)
  return res;
}

export const validateLink = async ({ token }) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/mapsharing/ValidateLink?token=${token}`)
  return res;
}

export const countViewerToRecent = async ({mapId}) => {
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}​/api/app/MapHistoryViewed/InsertOrUpdate?mapId=${mapId}`)
  return res;
}
export const searchMapByKeyWord = async ({ mapId, keyWord }) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/map/SearchNodes?MapId=${mapId}&Keyword=${keyWord}&PageSize=99`,
  )
  return res
}

export const getPendingMapSharing = async ({ mapId }) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}​/api/app/mapsharing/GetPendingMapSharing?MapId=${mapId}`,
  )
  return res
}

// export const inviteUserCollab = async (data) => {
//   const 
// }