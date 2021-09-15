import React, { useState, useEffect, useRef } from 'react';
import { Dialog} from '@material-ui/core';
import { GET_ALL_BY_CUSTOMER_REQUEST,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS,
  SET_SELECT_NODE,
} from 'redux/reducers/map/actionTypes'
import { UPDATE_MOVE_POST_REQUEST } from 'redux/reducers/node/actionTypes'
import { ADD_NODE_TO_OTHER_MAP_REQUEST } from 'redux/reducers/tag/actionTypes'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import MindElixir, { E } from "mind-elixir";
import {CloseButton, MapToolBar} from 'components'
import useStyles from './styles'
import Images from 'config/images'
import { useHistory, useParams } from 'react-router-dom';

const formatPath = (node) =>{
  if(!node)
    return ''
  let loopPath = node.topic
  let copyNode = node.parent
  while (copyNode){
    loopPath = copyNode.topic + '/' +loopPath
    copyNode = copyNode.parent
  }
  return loopPath
}
const MovePost = ({ 
  openMovePost, 
  handleClose,
  itemData,
  exceptCurrentMap, 
  type, 
  formData,
  description,
  fileServerDelete,
}) => {
  const history = useHistory()
  const maps = useSelector(state => state.map.maps)
  const dataMindMapAddOtherNode = useSelector(state => state.map.dataMindMapAddOtherNode)
  const currentRootMap = useSelector(state => state.map.currentRootMap)
  const dispatch = useDispatch()  
  const [mindMap,setMindMap] = useState()
  const [curMapId,setCurMapId] = useState('')
  const mindmapRef = useRef(null)
  const [curNode, setCurNode] = useState(null)
  const classes = useStyles()
  const selectNode = useSelector((state) => state.map.selectNode)
  const selectMap = useSelector((state) => state.map.selectNode.mapId)
  const postDetail = useSelector((state) => state.node.postDetail)  
  const isLoading = useSelector((state) => state.global.isLoading)
  const params = useParams()

  const handleToCenter = () =>{
    if(curNode)
      E(curNode.id, mindMap).scrollIntoView({ block: "center", inline: "center" })
  }
  const handleZoomOut = () =>{
    if(!mindMap || mindMap.scaleVal < 0.5) 
      return
    mindMap.scale(mindMap.scaleVal - 0.2)
  }
  const handleZoomIn = () =>{
    if (!mindMap) 
      return
    mindMap.scale(mindMap.scaleVal + 0.2);
  }
  const handleFullScreen = () => {
    if (!mindMap) return;
      mindMap.container.requestFullscreen()
  }
  const handleTreeView = () => {
    if (!mindMap) 
      return
    mindMap.initRightTree()
  }
  const handleMindMapSide = () => {
    if (!mindMap) 
      return
    mindMap.initSide()
  }

  const handleChangeMap = (e) =>{
    dispatch({
      type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
      payload: {
        id: e.target.value
      },
    })
    setCurNode(null)
    setCurMapId(e.target.value)
  }

  const handleAddToOtherMap = () => {
    const onSuccess = () => {
      handleClose()
      dispatch({
        type: SET_SELECT_NODE,
        payload: {
          root: curNode.root,
          topic: curNode.topic,
          nodeId: curNode.id,
          mapId: curNode.mapId,
        }
      })
      if (curNode.root) {
        history.push(`/board/${curNode.mapId}`)
      } else {
        history.push(`/board/${curNode.mapId}/node/${curNode.id}`)
      }
    }

    dispatch({
      type: UPDATE_MOVE_POST_REQUEST,
      payload: {
        "mapId": params.mapId,
        // "postId": params.postId,
        // "oldParentNodeId": postDetail.parentNodeId,
        "postId": itemData.postId,
        "oldParentNodeId": itemData.parentNodeId,
        "newParentNodeId": curNode.id,
      },
      
      onSuccess: onSuccess,
    })
  }

  const closePopup = () => {
    handleClose()
  }
  // const getmaps = () =>{
  //   if(!exceptCurrentMap)
  //     return maps
  //   else
  //     return maps.filter(item => item.id !== currentRootMap)
  // }
  // useEffect(() => {
  //   dispatch({
  //     type: GET_ALL_BY_CUSTOMER_REQUEST,
  //     payload: {
  //       page: 1,
  //       size: 100,
  //     },
  //   })
  //   return () => {
  //     dispatch({
  //       type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS,
  //       payload: {},
  //     })
  //   }
  // },[])

  useEffect(() =>{
    if(dataMindMapAddOtherNode.nodeData && mindmapRef && mindmapRef.current){
      const curMindMap = new MindElixir({
        data: {nodeData: dataMindMapAddOtherNode.nodeData},
        el: '#currentMap',
        direction: MindElixir.SIDE,
        draggable: false, // default true
        contextMenu: false, // default true
        toolBar: false, // default true
        nodeMenu: false,
        keypress:false,
        isTagging: false,
        editable: false,
        removeAddNodeButton: true
      })
      if(dataMindMapAddOtherNode.viewType && dataMindMapAddOtherNode.viewType === 'TreeView')
        curMindMap.initRightTree()
      else
        curMindMap.initSide();
      // curMindMap.init()
      curMindMap.onRedirectPath = (node) => setCurNode(node)
      setMindMap(curMindMap)

    }
  },[dataMindMapAddOtherNode.nodeData, mindmapRef])

  return (  
    <Dialog
      open={openMovePost}
      onClose={handleClose}
      fullScreen
      classes={{paper: classes.containerDialog}}
      onClick={(e) => e.stopPropagation()}
    >
      
      <div className={classes.wrapperMapToolBar}>
        <MapToolBar
          handleMindMapSide ={handleMindMapSide}
          handleTreeView = {handleTreeView}
          handleZoomIn = {handleZoomIn}
          handleZoomOut = {handleZoomOut}
          handleFullScreen = {handleFullScreen}
          handleToCenter ={handleToCenter}
        />
      </div>
      <div className={classes.wrapperClosePopUp}>
        <CloseButton textButton={'Exit'} handleClick={closePopup}/>
      </div>
      <div
        ref ={mindmapRef}
        id="currentMap"
        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
      >
      </div>
      <div className={classes.footerAddNode}>
        <div className={classes.titleSelect}>Selected Node: <span className={classes.currentPath}>{formatPath(curNode)}</span></div>
        <button disabled={isLoading || !!!curNode} className={classes.submitBtn} onClick={handleAddToOtherMap}>Submit</button>
      </div>
    </Dialog>

  )
}
  export default MovePost;