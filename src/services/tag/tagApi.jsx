import { APIInstance } from '../configApi';
export const getNodeByTagApi = async (data) => {
  let paramsExcludeNode = ''
  if(data.excludeNodeIds && data.excludeNodeIds.length){
    data.excludeNodeIds.forEach(item => {
      paramsExcludeNode += `&ExcludeNodeIds=${item.id}`
    })
  }
  // /api/app/node/GetNodesByTagName?TagName=tag1&ExcludeNodeIds=589&ExcludeNodeIds=590
  const res = await APIInstance.get(`${process.env.REACT_APP_API}/api/app/node/GetNodesByTagName?TagName=${data.tagName}${paramsExcludeNode}&MapId=${data.mapId}&NodeId=${data.nodeId}&PageSize=6`)
  return res
};

export const addOtherNodeToMapApi = async (data) => {
  // /api/app/node/GetNodesByTagName?TagName=tag1&ExcludeNodeIds=589&ExcludeNodeIds=590
  const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/map/AddToMyMap`,data)
  return res
};

