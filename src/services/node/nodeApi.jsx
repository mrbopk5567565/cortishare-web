import { APIInstance } from '../configApi';
import isImageUrl from 'is-image-url'

const config = {
  headers: {
    // 'Content-Type': 'multipart/form-data',
    // "Content-Type": "application/json; charset=utf-8",
  }
}
export const createNode = async (formData, mapId) => {
  if (!mapId) return;
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/node/CreateNode?mapId=${mapId}`, formData);
  return res;
};

export const updateNode = async (data, nodeId) => {
  if (!nodeId || !data) return;
  const res = await APIInstance.put(
    `${process.env.REACT_APP_API}​/api/app/node/UpdateNode?nodeId=${nodeId}`, data, config)
  return res;
};

export const updateNodeExpand = async (data) => {
  if (!data) return;
  const res = await APIInstance.patch(
    `${process.env.REACT_APP_API}​/api/app/node/UpdateNode`, data, config)
  return res;
};

export const updateNodeMove = async (data) => {
  if (!data) return;
  const res = await APIInstance.patch(
    `${process.env.REACT_APP_API}​/api/app/node/UpdateNode`, data)
  return res;
};

export const deleteNode = async (object) => {
  if (!object) return;
  const { mapId, nodeId } = object;
  const res = await APIInstance.delete(
    `${process.env.REACT_APP_API}​/api/app/node/DeleteNode?mapId=${mapId}&nodeId=${nodeId}`
  )
  return res
}

export const getDetailPost = async (object) => {
  if (!object) return;
  const { mapId, postId } = object;
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/node/GetPostById?postId=${postId}&mapId=${mapId}`)
  return res;
};

export const getCollectImages = async (object) => {
  if (!object) return;
  const { sourceUrl } = object;
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/resource/CollectImagesFromUrl?sourceUrl=${sourceUrl}`)
  const result = res.result && res.result.filter(item => isImageUrl(item) && item)
  res.result = result
  return res;
};

export const createPost = async (formData, mapId) => {
  // if (!mapId) return;
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/node/CreatePost?mapId=${mapId}`, formData, config)
  return res;
};

export const updatePost = async (formData, nodeId) => {
  if (!nodeId) return;
  const res = await APIInstance.put(
    `${process.env.REACT_APP_API}/api/app/node/UpdatePost?nodeId=${nodeId}`, formData, config)
  return res;
};

export const updatePostMove = async (data) => {
  if (!data) return;
  const res = await APIInstance.patch(
    `${process.env.REACT_APP_API}/api/app/node/UpdatePost`, data)
  return res;
};

export const getNodesByMapId = async (data) => {
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/map/GetNodesByMapId`, { params: data }, config)
  return res.result;
};

export const addCommentPostApi = async (data) => {
  const res = await APIInstance.post(
    `${process.env.REACT_APP_API}/api/app/Postcomment/Insert`, data)
  return res
}

export const deleteFile = async (data) => {
  const res = await APIInstance.delete(
    `${process.env.REACT_APP_API}/api/app/postmedia/Delete?postMediaId=${data.postMediaId}`)
  return res
}
export const getPostsByNodeId = async (object) => {
  if (!object) return;
  console.log('objectobject', object)
  const { nodeId, pageSize, pageNumber, mapId } = object;
  let pageSizeRequest = pageSize || 20;
  let pageNumberRequest = pageNumber || 1;
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/node/GetPostsByNodeId?NodeId=${nodeId}&mapId=${mapId}&SortColumn=creationTime&SortOrder=desc&PageSize=${pageSizeRequest}&PageNumber=${pageNumberRequest}`);
  return res;
};

export const getCommentsByNodeId = async (object) => {
  if (!object) return;
  const { postId, pageSize, pageNumber } = object;
  let pageSizeRequest = pageSize || 10;
  let pageNumberRequest = pageNumber || 1;
  const res = await APIInstance.get(
    `${process.env.REACT_APP_API}/api/app/PostComment/GetPostComment?PostId=${postId}&SortColumn=creationTime&SortOrder=desc&PageSize=${pageSizeRequest}&PageNumber=${pageNumberRequest}`)
  return res;
};