import React, { useState, useEffect, useMemo, memo, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from '@material-ui/core';
import Images from 'config/images'

import MindElixir, { E } from "mind-elixir";
import useStyles from './styles'
import { data2, data3 } from './data';
import { useHistory, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import { GET_NODE_BY_TAG_REQUEST, ADD_NODE_TO_OTHER_MAP_REQUEST } from 'redux/reducers/tag/actionTypes'
import { SET_TITLE_NODE } from 'redux/reducers/node/actionTypes'
import { useDispatch, useSelector } from 'react-redux';
import DialogConfirmDeleteNode from 'modules/MyMap/DialogConfirmDeleteNode';
import {
  CREATE_NODE_REQUEST,
  UPDATE_NODE_REQUEST,
  UPDATE_EXPAND_NODE_REQUEST,
  DELETE_NODE_REQUEST,
  UPDATE_MOVE_NODE_REQUEST,
  CREATE_POST_REQUEST,
} from 'redux/reducers/node/actionTypes';
import {
  SET_SELECT_NODE,
  UPDATE_VIEW_TYPE_MAP_REQUEST,
  GET_MIND_MAP_DATA_REQUEST
} from 'redux/reducers/map/actionTypes';
import PopupUpgrade from 'components/PopupUpgrade'
import { formatNodeData, isMobile, checkPaymentStatus } from 'helpers'
import {CloseButton, CloseButtonMobile} from 'components'
import clsx from 'clsx'


const useWindowWidth = () => {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return widthWindow
}

const MindMap = forwardRef(({ data, handleTagUI, handleToPost }, ref) => {
  const rootTag = 'rootTag'
  const history = useHistory()
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const { mapId, nodeId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false)
  const locations = useLocation()
  // const mapId = useSelector((state) => state.map.selectNode.mapId)
  const selectNode = useSelector((state) => state.map.selectNode)
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const currentRootMap = useSelector((state) => state.map.currentRootMap)
  const createPost = useSelector((state) => state.node.createPost)
  const nodeDetail = useSelector((state) => state.node.nodeDetail)
  const tagList = useSelector((state) => state.tag.tagList)
  const { info, payment } = useSelector((state) => state.profile)
  const mindMapRef = useRef(null)
  const [mindMap, setMindMap] = useState(null)
  const [tagSelect, setTagSelect] = useState({})
  const [nodeOntag, setNodeOnTag] = useState(null)
  const [tagMap, setTagMap] = useState(null)
  const customer = JSON.parse(localStorage.getItem('customer'))
  const [excludeNodeTag, setExcludeNodeTag] = useState([])
  const [isOpenConfirmDeleteNode, setIsOpenConfirmDeleteNode] = useState(false)
  const [isDeleteNodeBelongOtherMap, setIsDeleteNodeBelongOtherMap] = useState(false)
  const [isOpenValidateEdit, setIsOpenValidateEdit] = useState(false)
  const stateWindowWidth = useWindowWidth()
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const checkFreePlan = [0,2,4].includes(checkPaymentStatus({ customer: info, payment: payment }))
  const checkPermission = dataMindMap && (dataMindMap.mapPermission === 'Edit' || dataMindMap.mapPermission === 'Owner')

  const dataMindmapDefault = {
    nodeData: {
      id: null,
      topic: 'Welcome Cortishare',
      root: true,
      children: [],
    }
  }
  const colorList = [
    '#0070C9',
    '#4D9BDA',
    '#E25376',
    '#EB87A0',
    '#00B1C9',
    '#4DC9DA',
    '#F4D017',
    '#F7DE5D',
    '#2BE07F',
    '#6BEAA6',
    '#EA8F24',
    '#F1B166',
    '#E21818',
    '#EB5E5E',
  ]
  useImperativeHandle(ref, () => ({
    handleToCenter() {
      // if(Object.keys(tagSelect).length !== 0)
      if (tagMap) {
        nodeOntag.scrollIntoView({ block: "center", inline: "center" })
        return
      }
      else if (!mindMap) return;
      // mindMap.toCenter()
      E(selectNode.nodeId,mindMap).scrollIntoView({ block: "center", inline: "center" });

    },
    handleZoomOut() {
      if (tagMap) {
        if (tagMap.scaleVal >= 0.5)
          tagMap.scale(tagMap.scaleVal - 0.2)
        return
      }
      else if (!mindMap || mindMap.scaleVal < 0.5) return;
      mindMap.scale(mindMap.scaleVal - 0.2)
    },
    handleZoomIn() {
      if (tagMap) {
        tagMap.scale(tagMap.scaleVal + 0.2)
        return
      }
      else if (!mindMap) return;
      mindMap.scale(mindMap.scaleVal + 0.2);
    },
    // Now, fullscreen for Right View, keysearch: ref = rightViewRef
    // handleFullScreen() {
    //   if (tagMap) {
    //     tagMap.mindElixirBox.requestFullscreen()
    //     return
    //   }
    //   else if (!mindMap) return;
    //   mindMap.mindElixirBox.requestFullscreen()
    // },
    handleTreeView() {
      if (tagMap) {
        tagMap.initRightTree()
        return
      }
      else if (!mindMap) return;
      if(dataMindMap.viewType !== 'TreeView'){
        mindMap.initRightTree()
        if(checkPermission ){
          dispatch({
            type: UPDATE_VIEW_TYPE_MAP_REQUEST,
            payload: {
              mapId: currentRootMap,
              viewType: 'TreeView'
            }
          })
        }
      }
    },
    handleMindMapSide() {
      if (tagMap) {
        tagMap.initSide()
        return
      }
      else if (!mindMap) return;
      if(dataMindMap.viewType !== 'MapView'){
        mindMap.initSide()
        if(checkPermission ){
          dispatch({
            type: UPDATE_VIEW_TYPE_MAP_REQUEST,
            payload: {
              mapId: currentRootMap,
              viewType: 'MapView'
            }
          })
        }
      }
    }
  }));
  const handleClickTagOnTagView = (tag) =>{
    if(!(tagSelect && tagSelect.curTag && tagSelect.curTag === tag.curTag))
      handleClickTagOnNode(tag)
  }
  
  const handleClickTagOnNode = (tag) =>{
    if(checkPermission){
      setTagSelect(tag)
      setExcludeNodeTag([])
      dispatch({
        type: GET_NODE_BY_TAG_REQUEST,
        payload: {
          tagName: tag.curTag.substring(1),
          mapId: currentRootMap,
          nodeId: selectNode.nodeId
        },
        removeAllChoice: true
      })
  }

  }
  const handleCloseTagMap = () => {
    setTagSelect({})
    setNodeOnTag(null)
    setTagMap(null)
    redirectPath(E(selectNode.nodeId,mindMap).nodeObj,false,true)
    // history.push({
    //   pathname: `/board/${currentRootMap}/node/${selectNode.nodeId}`
    // })
  }

  const handleChangeTextFromParent = (value) => {
    dispatch({
      type: SET_TITLE_NODE,
      payload: value
    })
  }

  const handleDragNode = (objDragNode, objDropNode) => {
    dispatch({
      type: UPDATE_MOVE_NODE_REQUEST,
      payload: {
        nodeId: objDragNode.id,
        oldParentNodeId: objDragNode.parentNodeId,
        newParentNodeId: objDropNode.id,
        mapId: currentRootMap,
      },
      loadMindMap: true,
      onSuccess:  (dataMindMap) => {
        if (mindMap) {
          mindMap.nodeData = { ...mindMap.nodeData, ...formatNodeData(dataMindMap.nodeData) }
          mindMap.refresh(true)
        }
      }
    })
  }
  
  const createNodeRequest = (nodeObj) => {
    const onSuccess = (newNodeId, newNode, newDataMindMap) => {
      mindMap.nodeData = { ...mindMap.nodeData, ...formatNodeData(newDataMindMap.nodeData) }
      mindMap.refresh(true)
      redirectPath(E(newNodeId,mindMap).nodeObj)
    }
    
    let parentNodeObj = null
    let background = null
    const curEl = E(selectNode.nodeId,mindMap)
    if (curEl) {
      parentNodeObj = curEl.nodeObj
    }
    if (parentNodeObj.root) {
      background = null
    } else if (parentNodeObj.style && parentNodeObj.style.background) {
      background = parentNodeObj.style.background
    }
    const onFail = () => {
      if (mindMap) {
        mindMap.removeNode()
      }
    }

    let randomBgColor = Math.floor(Math.random() * colorList.length)
    let formDataPost = {
      parentNodeId: selectNode.nodeId,
      title: nodeObj.topic || 'sinnnn',
      direction: nodeObj.direction,
      "Icons": [],
      "style": {
        "background": background ? background : colorList[randomBgColor],
      },
    }

    if(!nodeObj.parent.root)
      delete formDataPost.direction

    dispatch({
      type: CREATE_NODE_REQUEST,
      payload: formDataPost,
      mapId: selectNode.mapId,
      onSuccess: onSuccess,
      onFail: onFail,
    })
  }
  const formatTreeTag =(curTagSelect, curListTag) =>{
    let data= {
      id: rootTag,
      topic: curTagSelect.topic,
      root: true,
      tagActive: curTagSelect.curTag,
      expanded: true,
      children: []
    }
    curListTag.forEach(item => {
      data.children.push({
        ...item, ...{
          topic: item.topic,
          expanded: false
        }
      })
    })
    curTagSelect.nodeObj.children.filter(item => item.belongOtherMap).forEach(item => {
      delete item.parent
      data.children.push(item)
    })
    const loopFormatTreeTag = (tree, preNode=undefined) =>{
      if(!tree)
        return
      if (preNode) {
        tree.firstChildTag = !!preNode.root
        if(tree.belongOtherMap)
          tree.typeTag =  'available'
        else
          tree.typeTag =  'relate'
      }
      for (let idx = 0; idx < tree.children.length; idx++) {
        loopFormatTreeTag(tree.children[idx], tree)
      }
    }
    loopFormatTreeTag(data)
    return data
  }
  const checkNotAllowDropNode =  (dropNodeObj,dragNodeObj) =>{
    if(!checkFreePlan)
      return false
    if(dropNodeObj.level + dragNodeObj.deepestNodeLevel >= 5){
      setIsOpenUpgrade(true)
      return true
    }
    return false
  }

  const handleChooseNodeOnTag = (nodeOnTag) => {
    redirectPath(nodeOnTag,true)
    setNodeOnTag(E(nodeOnTag.id, tagMap))
  }

  const handleRemoveRelateNodeOnTag = (nodeObj) => {
    setExcludeNodeTag([...excludeNodeTag, { id: nodeObj.id }])
  }

  const handleAddRelateNodeOnTag = (nodeObj) => {
    const loopMoveTag = (node) =>{
      if(!node)
        return
      node.typeTag ='available'
      for (let idx =0 ; idx < node.children.length; idx++){
        loopMoveTag(node.children[idx])
      }
    }
    const formatItemAdd = (item) =>{
      item.belongOtherMap = true
      item.firstNodeOtherMap = true
      const loopFormatItemChildren = (childItem) =>{
        if(!childItem)
          return
        childItem.belongOtherMap= true
        childItem.firstNodeOtherMap = false
        for (let idx =0 ; idx < childItem.children.length; idx++){
          loopFormatItemChildren(childItem.children[idx])
        }
      }
      for (let idx =0 ; idx < item.children.length; idx++){
        loopFormatItemChildren(item.children[idx])
      }
    }
    const addNodeTagToMindmap = (tree,node,parentNodeId) =>{
      if(!tree)
          return
      if(tree.id === parentNodeId){
        tree.children.push(node)
        return
      }
      for (let idx =0 ; idx < tree.children.length; idx++){
        addNodeTagToMindmap(tree.children[idx],node,parentNodeId)
      }
    }
    if(tagMap){
      let itemAdd
      const newChildren = tagMap.nodeData.children.map(item =>{
        if(item.id ===  nodeObj.id){
          loopMoveTag(item)
          itemAdd = item
        }
        return item
      }) 
      // formatItemAdd(itemAdd)
      // addNodeTagToMindmap(mindMap.nodeData, itemAdd, selectNode.nodeId)
      // mindMap.refresh(true)
      tagMap.nodeData.children = newChildren
      tagMap.refresh(true)
    }

    dispatch({
      type: ADD_NODE_TO_OTHER_MAP_REQUEST,
      payload: {
        mapId: currentRootMap,
        parentNodeId: selectNode.nodeId,
        nodeId: nodeObj.id
      }
    })
  }

  const editNodeRequest = (nodeObj) => {
    let formDataPost ={
      parentNodeId: nodeObj.root ? null : nodeObj.parent.id,
      title: nodeObj.topic,
      direction: nodeObj.direction,
      "Icons": [],
      "style": {
        // "color": "",
        "background": nodeObj.background ? nodeObj.background : nodeObj.style.background ? nodeObj.style.background : null
        // "fontSize": ""
      },
    }
    const onSuccess = (dataMindMap) => {
      if (mindMap) {
        mindMap.nodeData = { ...mindMap.nodeData, ...formatNodeData(dataMindMap.nodeData) }
        mindMap.refresh(true)
      }
    }
    dispatch({
      type: UPDATE_NODE_REQUEST,
      payload: formDataPost,
      nodeId: nodeObj.id,
      root: nodeObj.root,
      mapId: currentRootMap,
      dispatch,
      onSuccess,
    })
  }

  const handleDeleteNode = () => {
    setIsOpenConfirmDeleteNode(false)
    const onSuccess = () => {
      if (mindMap) {
        const el = E(selectNode.nodeId,mindMap)
        const parentElObj = el.nodeObj.parent
        mindMap.removeNode(el)
        redirectPath(parentElObj)
      }
    }

    dispatch({
      type: DELETE_NODE_REQUEST,
      payload: {
        mapId: currentRootMap,
        nodeId: selectNode.nodeId,
      },
      onSuccess: onSuccess,
    })
  }
  const updateExpandNode = (nodeObj) => {
    if(checkPermission){
      let formUpdate ={
        expanded: nodeObj.expanded,
        nodeId: nodeObj.id,
        mapId: currentRootMap
      }
      dispatch({
        type: UPDATE_EXPAND_NODE_REQUEST,
        payload: formUpdate,
      })
    }
  }
  const handleCloseConfirmDeleteNode = () => {
    setIsOpenConfirmDeleteNode(false)
  }

  const deleteNodeRequest = () => {
    const nodeObj = E(selectNode.nodeId,mindMap).nodeObj
    if (!checkPermission || nodeObj.root ||  (nodeObj.belongOtherMap && !nodeObj.firstNodeOtherMap))
      return
    setIsDeleteNodeBelongOtherMap(!!nodeObj.belongOtherMap)
    setIsOpenConfirmDeleteNode(true)
  }

  const redirectPath = (node,forTag=false,loadMindMap=false) => {
    if (node) {
      if (node.root) {
        if(forTag)
          history.push({
            pathname: `/board/${currentRootMap}/node/${selectNode.nodeId}`
          })
        else
          history.push({
            pathname: `/board/${currentRootMap}`
          })
      } else {
        history.push({
          pathname: `/board/${currentRootMap}/node/${node.id}`
        })
      }
    }
    !forTag && dispatch({
      type: SET_SELECT_NODE,
      payload:{
        nodeId: node.id,
        mapId: node.mapId,
        root: node.root,
        topic: node.topic,
        // parent: node.parent
      },
    })
    loadMindMap && dispatch({
      type: GET_MIND_MAP_DATA_REQUEST,
      payload: {
        id: currentRootMap
      }
    })
  }

  const redirectRoutePost = () => {
    if (checkFreePlan) {
      if (dataMindMap.totalPostCreated && dataMindMap.totalPostCreated >= 80) {
        setIsOpenUpgrade(true)
        return false
      }
    }
    if(window.innerWidth <= 600) {
      handleToPost && handleToPost()
    }

    // history.push({
    //   pathname: `/new-post/board/${selectNode.mapId}/node/${selectNode.nodeId}`,
    // })

    const onSuccess = (new_post) => {
      history.push({
        pathname: `/edit-post/${new_post.post.postId}/board/${selectNode.mapId}/node/${new_post.parentNodeId}`,
      })
    }

    let formDataPost = new FormData()
    formDataPost.append("ParentNodeId", selectNode.nodeId)
    formDataPost.append("Title", 'New Post')
    formDataPost.append("Description", '')
    formDataPost.append("Url", '')
    // formData.upload.filter(item => item.type === 'clientFile').map((item) => {
    //   if (formData.post === 'url') {
    //     formDataPost.append("PostMediaUrl", item.url)
    //   } else {
    //     formDataPost.append("PostMedia", item.url)
    //   }
    // })

    // isDraft
    formDataPost.append("isDraft", true)

    dispatch({
      type: CREATE_POST_REQUEST,
      payload: formDataPost,
      mapId: selectNode.mapId,
      onSuccess: onSuccess,
    })
  }

  let urlSearchParams = new URLSearchParams(locations.search);
  // let mapId = urlSearchParams.get("map")
  let parentNodeId = urlSearchParams.get("parentNode")

  let options = useMemo(() => {
    return {
      el: '#map',
      direction: MindElixir.SIDE,
      // create new map data
      data: MindElixir.new('new topic'),
      // the data return from `.getAllData()`
      // data: { ...},
      data: Object.keys(data).length !== 0 ? { ...data } : dataMindmapDefault,
      draggable: checkPermission, // default true
      contextMenu: checkPermission, // default true
      toolBar: false, // default true
      nodeMenu: checkPermission, // default true
      editable: checkPermission,
      removeAddNodeButton: !checkPermission,
      keypress: true, // default true
      locale: 'en', // [zh_CN,zh_TW,en,ja] waiting for PRs
      overflowHidden: false, // default false
      primaryLinkStyle: 1, // [1,2] default 1
      primaryNodeVerticalGap: 25, // default 25
      primaryNodeHorizontalGap: 100, // default 65
      contextMenuOption: {
        focus: false,
        link: true,
        extend: [
          // {
          //   name: 'Delete Node',
          //   onclick: () => {
          //     // console.log(mindMap)
          //     // alert('extend menu')
          //   },
          // },
        ],
      },
      allowUndo: false,
      isTagging: false,
      before: {
        insertSibling(el, obj) {
          return true
        },
        async addChild(el, obj) {

          // Check map own
          if (checkPermission) {
            // await sleep(0)
            return true
          }
          return false
          // return true

        },
      },
      colorList: colorList,
    }
  }, [data])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    // setTimeout(() => {
    const mindMap = new MindElixir({
      ...options,
    });
    if(dataMindMap.viewType && dataMindMap.viewType === 'TreeView')
      mindMap.initRightTree()
    else
      mindMap.initSide();
    // mindMap.toCenter();
    mindMap.getAllDataString()
    
    if(isMobile()) { // scale if Mobile
      mindMap && mindMap.scale(mindMap.scaleVal - 0.5)
    }
    
    mindMap.bus.addListener('operation', operation => {
      console.log('operation', operation)
      if (operation.name !== 'finishEdit') window.currentOperation = operation
    })
    setMindMap(mindMap)
  }, [options])
  
  useEffect(() =>{
    if(mapId && mindMap && mindMap.nodeData.id){
      const curNode = nodeId ? (E(nodeId,mindMap) && E(nodeId,mindMap).nodeObj) : mindMap.nodeData
      if(curNode) {
        dispatch({
          type: SET_SELECT_NODE,
          payload:{
            nodeId: curNode.id,
            mapId: curNode.mapId,
            root: curNode.root,
            topic: curNode.topic,
            // parent: node.parent
          }
        })
      }
    }
  },[mindMap, nodeId, mapId])

  useEffect(() => {
    if (mindMap) {
      mindMap.onChangeText = (value) => handleChangeTextFromParent(value)
      mindMap.onCreateNodeRequest = (nodeObj) => createNodeRequest(nodeObj)
      mindMap.onEditNodeRequest = (nodeObj) => editNodeRequest(nodeObj)
      mindMap.onDeleteNodeRequest = () => deleteNodeRequest()
      mindMap.onRedirectPath = (node) => redirectPath(node)
      mindMap.onRedirectRoutePost = () => redirectRoutePost()
      mindMap.onUpdateExpandNode = (nodeObj) => updateExpandNode(nodeObj)
      mindMap.onValidateEdit = () => setIsOpenValidateEdit(true)
      mindMap.OnDragNode = handleDragNode
      mindMap.onClickTag = handleClickTagOnNode
      mindMap.checkNotAllowDropNode  = checkNotAllowDropNode
    }
  }, [mindMap, selectNode, nodeDetail])

  useEffect(() => {
    if (mindMap) {
      mindMap.mapPermission = dataMindMap.mapPermission
      mindMap.before = {
        ...mindMap.before,
        async addPost(el, obj) {
          if(!checkFreePlan)
            return true
          if(dataMindMap.totalPostCreated && dataMindMap.totalPostCreated >= 80){
            setIsOpenUpgrade(true)
            return false
          }
          if (checkPermission) {
            // await sleep(0)
            return true
          }
          return false
        },
        
        async addChild(el, obj) {
          // Check map own
          if(!checkFreePlan)
            return true
          if ((mindMap.currentNode.nodeObj.level && mindMap.currentNode.nodeObj.level >= 5) || ( dataMindMap.totalNodeCreated && dataMindMap.totalNodeCreated >= 40)  ) {
            setIsOpenUpgrade(true)
            return false
          }
          if (checkPermission) {
            // await sleep(0)
            return true
          }
          return false
        },
      }
    }
  }, [mindMap])

  useEffect(() => {
    if (mindMap) {
      mindMap.selectNode(E(selectNode.nodeId,mindMap))
    }
  }, [selectNode,mindMap])

  useEffect(() =>{
    if(Object.keys(tagSelect).length !== 0){
      const tagMindmap = new MindElixir({
        data: {nodeData: {}},
        el: '#mapTagging',
        direction: MindElixir.SIDE,
        draggable: false, // default true
        contextMenu: false, // default true
        toolBar: false, // default true
        nodeMenu: false,
        isTagging: true,
        editable: false,
      })
      tagMindmap.init()
      setNodeOnTag(E(rootTag,tagMindmap))
      setTagMap(tagMindmap)
    }
  },[tagSelect])

  useEffect(() =>{
    if(tagMap){
      const formatTreeTagData = formatTreeTag(tagSelect, tagList)
      tagMap.nodeData = formatTreeTagData
      tagMap.refresh(true)
    }
  },[tagList])

  useEffect(() =>{
    if(tagMap){
      tagMap.onClickTag = handleClickTagOnTagView
      tagMap.selectNode(E(rootTag,tagMap))
      tagMap.onRedirectPath = handleChooseNodeOnTag
      tagMap.onAddRelateNode = handleAddRelateNodeOnTag
      tagMap.onRemoveRelateNode = handleRemoveRelateNodeOnTag
      tagMap.before = {
        ...tagMap.before,
        async addRelateNode() {
          if(!checkFreePlan)
            return true
          if ((mindMap.currentNode.nodeObj.level && mindMap.currentNode.nodeObj.level >= 5) || ( dataMindMap.totalNodeCreated && dataMindMap.totalNodeCreated >= 40)  ) {
            setIsOpenUpgrade(true)
            return false
          }  
          if (checkPermission) {
            // await sleep(0)
            return true
          }
          return false
        },
      }
      // addRelateNode: async function (nodeObj) {
      //   if (
      //     !this.before.addRelateNode ||
      //     (await this.before.addRelateNode())
      //   ) {
      //     mind.onAddRelateNode && this.onAddRelateNode(nodeObj)
      //   }
      // },,
      // tagMap.onRedirectPath = (node) => redirectPath(node,true)
    }
  },[tagMap, selectNode])

  useEffect(() =>{
    handleTagUI(!!tagMap)
  }, [tagMap])

  useEffect(() => {
    excludeNodeTag.length && dispatch({
      type: GET_NODE_BY_TAG_REQUEST,
      payload: {
        tagName: tagSelect.curTag.substring(1),
        excludeNodeIds: excludeNodeTag,
        mapId: currentRootMap,
        nodeId: selectNode.nodeId
      }
    })
  }, [excludeNodeTag])
  useEffect(() => {
    return () =>{
      if(mindMap && mindMap.eventMove){
        mindMap.eventMove.unset()
      }        
    }
  },[mindMap]);
  return (
    <>
      <div
        id="map"
        ref={mindMapRef}
        style={{ width: '100%', height: 'calc(100% - 65px)', overflowY: 'auto' }}
      // className={classes.mindmap}
      >
      </div>
      { Object.keys(tagSelect).length !== 0 &&
        <>
          <div
            id="mapTagging"
            style={{ width: '100%', height: '100%', overflowY: 'auto', position: 'absolute' }}
          >
          </div>
          {stateWindowWidth <= 600 ?
            <div className={classes.wrapperButtonCloseMoble}>
              <CloseButtonMobile handleClick = {handleCloseTagMap}/>
            </div>
          :
            <div className={clsx(classes.wrapperButtonClose, document.body.offsetWidth - widthSplit - 536 < 210 && classes.screenSizeSmall) }>
              <CloseButton handleClick={handleCloseTagMap} className={classes.cusCloseButton} />
            </div>
          }
          {/* <Box className={classes.closeTagWrapper} onClick={() => handleCloseTagMap()}>
            <img src={Images.icCloseRed} />
            <div className={classes.closeTitleTag}>Close</div>
          </Box> */}
        </>
      }
      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={() => setIsOpenUpgrade(false)} />}
      <DialogConfirmDeleteNode
        open={isOpenConfirmDeleteNode}
        onClose={handleCloseConfirmDeleteNode}
        isDeleteNodeBelongOtherMap={isDeleteNodeBelongOtherMap}
        handleDeleteNode={handleDeleteNode}
        handleCloseConfirmDeleteNode={handleCloseConfirmDeleteNode} />
       {/* <Dialog
        open={isOpenConfirmDeleteNode}
        onClose={handleCloseConfirmDeleteNode}
        aria-labelledby="alert-dialog-delete-node-title"
        aria-describedby="alert-dialog-delete-node-description"
      >
        <DialogTitle id="alert-dialog-delete-node-title">Delete Node Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-node-description">
            {isDeleteNodeBelongOtherMap ?
              'Are you sure? This cannot be undone.You will remove this added node from your board.'
            :
              'Are you sure? This cannot be undone. Your posts under this node will be transferred to a higher node'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteNode} color="primary" autoFocus>
            Ok
          </Button>
          <Button onClick={handleCloseConfirmDeleteNode} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>  */}
      <Dialog
        open={isOpenValidateEdit}
        onClose={() => setIsOpenValidateEdit(false)}
        aria-describedby="alert-dialog-edit-node-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-edit-node-description">
            Node name is limited at 40 characters
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenValidateEdit(false)} color="primary" >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})

export default MindMap
