import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@material-ui/core';
import {
  GET_ALL_BY_CUSTOMER_REQUEST,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
  GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS
} from 'redux/reducers/map/actionTypes'
import { ADD_NODE_TO_OTHER_MAP_REQUEST } from 'redux/reducers/tag/actionTypes'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import MindElixir, { E } from "mind-elixir";
import { CloseButton, MapToolBar, CloseButtonMobile, Buttons } from 'components'
import useStyles from './styles'
import Images from 'config/images'
import PopupUpgrade from 'components/PopupUpgrade'
import CreateMap from 'modules/Home/CreateMap'
import clsx from 'clsx'
import { checkPaymentStatus, checkLongString } from 'helpers'
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const formatPath = (node) => {
  if (!node)
    return ''
  let countNode = 1
  let loopPath = checkLongString(node.topic)
  let copyNode = node.parent
  while (copyNode) {
    countNode += 1
    if (countNode > 3)
      break
    if (countNode === 3) {
      if (copyNode.parent)
        loopPath = '.../' + loopPath
      else
        loopPath = checkLongString(copyNode.topic) + '/' + loopPath
    }
    else
      loopPath = checkLongString(copyNode.topic) + '/' + loopPath
    copyNode = copyNode.parent

  }
  return loopPath
}

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

const SelectExistingMap = ({ openSelectExistingMap, handleClose, exceptCurrentMap, type }) => {
  const maps = useSelector(state => state.map.maps)
  const dataMindMapAddOtherNode = useSelector(state => state.map.dataMindMapAddOtherNode)
  const currentRootMap = useSelector(state => state.map.currentRootMap)
  const dispatch = useDispatch()
  const [mindMap, setMindMap] = useState()
  const [curMapId, setCurMapId] = useState('')
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  const mindmapRef = useRef(null)
  const [curNode, setCurNode] = useState(null)
  const classes = useStyles()
  const selectNode = useSelector((state) => state.map.selectNode)
  const postDetail = useSelector((state) => state.node.postDetail)
  const isLoading = useSelector((state) => state.global.isLoading)
  const { info, payment } = useSelector((state) => state.profile)
  const stateWindowWidth = useWindowWidth()
  const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)

  const checkFreePlan = [0, 2, 4].includes(checkPaymentStatus({ customer: info, payment: payment }))

  // console.log('item maps:', maps);
  // console.log('currentRootMap:', currentRootMap);
  const handleToCenter = () => {
    if (curNode)
      E(curNode.id, mindMap).scrollIntoView({ block: "center", inline: "center" })
  }
  const handleZoomOut = () => {
    if (!mindMap || mindMap.scaleVal < 0.5)
      return
    mindMap.scale(mindMap.scaleVal - 0.2)
  }
  const handleZoomIn = () => {
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

  const handleChangeMap = (e) => {
    dispatch({
      type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_REQUEST,
      payload: {
        id: e.target.value
      },
    })
    setCurNode(null)
    setCurMapId(e.target.value)
  }

  const renderFooterMobile = () => {
    return (
      <div className={classes.footerAddNodeMobile}>
        <div className={clsx(classes.titleSelect, classes.titleSelectMobile)}>Selected Node: </div>
        <div className={clsx(classes.currentPath, classes.currentPathMobile)}>{formatPath(curNode) == '' ? <span>- -</span> : formatPath(curNode)}</div>
        <button disabled={isLoading || !!!curNode} className={clsx(classes.submitBtn, classes.submitBtnMobile)} onClick={handleAddToOtherMap}>Submit</button>
      </div>
    )
  }

  const handleAddToOtherMap = () => {

    if (checkFreePlan) {
      if ((curNode.level && curNode.level >= 5) || (dataMindMapAddOtherNode.mapUsage.totalNodeCreated && dataMindMapAddOtherNode.mapUsage.totalNodeCreated >= 40)) {
        setIsOpenUpgrade(true)
        return
      }
    }
    const onSuccess = () => {

      //mixPanel
      mixPanel.track(EventPage.SaveNodeOrPost)

      handleClose()
      if (type === 'post')
        toast.success("Post added successfully!")
      else
        toast.success("Node added successfully!")
    }
    let dataObj = {
      mapId: curNode.mapId,
      parentNodeId: curNode.id,
    }
    if (type === 'post')
      dataObj.postId = postDetail.post.postId
    else
      dataObj.nodeId = selectNode.nodeId
    dispatch({
      type: ADD_NODE_TO_OTHER_MAP_REQUEST,
      payload: dataObj,
      onSuccess
    })
  }

  const handleClickCreateMap = () => {
    setIsOpenCreateMap(true)
  }

  const handleCloseCreateMap = () => {
    setIsOpenCreateMap(false)
  }


  const closePopup = () => {
    handleClose()
  }
  const getmaps = () => {
    if (!currentRootMap)
      return maps
    else
      return maps.filter(item => item.id !== currentRootMap)
  }
  useEffect(() => {
    dispatch({
      type: GET_ALL_BY_CUSTOMER_REQUEST,
      payload: {
        page: 1,
        size: 100,
      },
    })
    return () => {
      dispatch({
        type: GET_MIND_MAP_DATA_FOR_ADD_OTHER_NODE_SUCCESS,
        payload: {},
      })
    }
  }, [])

  useEffect(() => {
    if (dataMindMapAddOtherNode.nodeData && mindmapRef && mindmapRef.current) {
      const curMindMap = new MindElixir({
        data: { nodeData: dataMindMapAddOtherNode.nodeData },
        el: '#currentMap',
        direction: MindElixir.SIDE,
        draggable: false, // default true
        contextMenu: false, // default true
        toolBar: false, // default true
        nodeMenu: false,
        keypress: false,
        isTagging: false,
        editable: false,
        removeAddNodeButton: true
      })
      curMindMap.onRedirectPath = (node) => setCurNode(node)
      if (dataMindMapAddOtherNode.viewType && dataMindMapAddOtherNode.viewType === 'TreeView')
        curMindMap.initRightTree()
      else
        curMindMap.initSide();
      // curMindMap.init()
      setMindMap(curMindMap)

    }
  }, [dataMindMapAddOtherNode.nodeData, mindmapRef])

  return (
    <Dialog
      open={openSelectExistingMap}
      onClose={handleClose}
      fullScreen
      classes={{ paper: classes.containerDialog }}
    >
      <div className={clsx(classes.wrapperSelect, stateWindowWidth <= 600 ? classes.wrapperSelectMobile : classes.wrapperSelectDesktop)}>
        <select className={classes.selectMap} required onChange={handleChangeMap} value={curMapId}>
          <option value='' disabled >--Select board--</option>
          {getmaps(maps).map((item, idx) => (
            <option key={item.id} value={item.id}>
              {item.title + '-' + item.id}
            </option>
          ))}
        </select>
        <img src={Images.icSelect} className={classes.customIconSelect} alt='' />
      </div>
      <div className={classes.wrapperMapToolBar}>
        <MapToolBar
          handleMindMapSide={handleMindMapSide}
          handleTreeView={handleTreeView}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleFullScreen={handleFullScreen}
          handleToCenter={handleToCenter}
          isSelectMap={stateWindowWidth > 600 ? false : true}
          closePopup={closePopup}
        />
      </div>
      {stateWindowWidth > 600 &&
        <div className={classes.wrapperClosePopUp}>
          <CloseButton textButton={'Exit'} handleClick={closePopup} />
        </div>
      }

      <div
        ref={mindmapRef}
        id="currentMap"
        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
      >
      </div>
      {!mindMap &&
        <div className={classes.wrapperEmptyMap}>
          <div className={classes.emptyMap}>
            <img src={Images.icMapEmpty} alt='' />
            <div className={classes.titleEmpty}>{maps.length < 1 ?
              <>
                <p>You currently have no Boards to add this to. Click on the button to create one.</p>
                <Buttons btnType="medium" onClick={handleClickCreateMap}>Create Board</Buttons>
                {isOpenCreateMap && <CreateMap openCreateMap={isOpenCreateMap} handleClose={handleCloseCreateMap} />}
              </> :
              'Select board to add'
            }
            </div>
          </div>
        </div>
      }
      {stateWindowWidth > 600 ?
        <div className={classes.footerAddNode}>
          <div className={classes.titleSelect}>Selected Node: <span className={classes.currentPath}>{formatPath(curNode)}</span></div>
          <button disabled={isLoading || !!!curNode} className={classes.submitBtn} onClick={handleAddToOtherMap}>Submit</button>
        </div>
        :
        <div>
          {renderFooterMobile()}
        </div>
      }

      {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={() => setIsOpenUpgrade(false)} />}
    </Dialog>

  )
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const maps = useSelector(state => state.map.maps)
  // const dataMindMap = useSelector((state) => state.map.dataMindMap)
  // const nodesSelect = useSelector((state) => state.node.nodesSelect)
  // const nodesByMapid = useSelector((state) => state.node.nodesByMapid)
  // const classes = useStyles();
  // const [theme, setTheme] = useState(null);
  // const [data, setData] = useState([]);
  // const [cursor, setCursor] = useState(false);
  // const [showBreadcrumb, setShowBreadcrumb] = useState();
  // const [enableBtnCreate, setEnableBtnCreate] = useState(false)
  // const [isOpenUpgrade, setIsOpenUpgrade] = useState(false)
  // const [isOpenCreateMap, setIsOpenCreateMap] = useState(false)
  // const [formData, setFormData] = useState({
  //   map: '',
  //   node: '',
  // })
  // const { id, nodeId } = useParams()

  // useEffect(() => {
  //   dispatch({
  //     type: GET_ALL_BY_CUSTOMER_REQUEST,
  //     payload: {
  //       page: 1,
  //       size: 100,
  //     },
  //   })
  //   const defaultThemeItem = {
  //     ...defaultTheme,
  //     tree: {
  //       base: {
  //         color: "#000",
  //         backgroundColor: "#fff",
  //         paddingLeft: 14,
  //         listStyle: "none"
  //       },
  //       node: {
  //         subtree: {
  //           paddingLeft: 0,
  //           listStyle: "none",
  //         },
  //       },
  //     },
  //   };
  //   setTheme(defaultThemeItem)
  // }, [])

  // useEffect(() => {
  //   if(!formData.map) return
  //   dispatch({
  //     type: GET_NODES_BY_ID_REQUEST,
  //     payload: {
  //       mapId: formData.map,
  //       isIncludeRootNode: true
  //     }
  //   })
  // }, [formData.map])

  // useEffect(() => {
  //   if (!nodesByMapid) return;
  //   setData(nodesByMapid);
  // }, [nodesByMapid])

  // useEffect(() => {
  //   if (!nodesSelect) {
  //     setEnableBtnCreate(true)
  //     return;
  //   } else {
  //     setEnableBtnCreate(false)
  //   }
  //   setShowBreadcrumb(nodesSelect.pathLabels.join('/'));
  // }, [nodesSelect])

  // useEffect(() => {
  //   if(maps && maps[0]) {
  //     setFormData({
  //       ...formData,
  //       map: maps[0].id
  //     })
  //   }
  // }, [maps]) 

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // handleCreate()
  // }

  // const handleCreate = () => {
  //   if(nodesSelect !== null) {
  //     let payload = {
  //       mapId: formData.map,
  //       parentNodeId: nodesSelect.id,
  //     }
  //     if(nodeId) {
  //       payload.nodeId = Number(nodeId)
  //     } else {
  //       payload.postId = Number(id)
  //     }
  //     dispatch({
  //       type: ADD_NODE_TO_OTHER_MAP_REQUEST,
  //       payload,
  //       onSuccess: () => {
  //         toast.success("Post/node added successfully!")
  //         if(nodesSelect.idParent !== null) {
  //           history.push(`/board/${formData.map}/node/${nodesSelect.id}`)
  //         } else {
  //           history.push(`/board/${formData.map}`)
  //         }
  //       }
  //     })
  //     handleClose()
  //   } else {
  //     toast.error("Please select the button to add!");
  //   }
  // }

  // const handleChange = e => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // const onToggle = (node, toggled) => {
  //   let treeView = {...data};
  //   if (cursor) {
  //     cursor.active = false;
  //   }
  //   node.active = true;
  //   setCursor(node);
  //   treeView.toggled = toggled;
  //   treeView.active = true
  //   if(treeView.children) {
  //     findItemInTree(treeView.children, node.id, toggled);
  //   }
  //   setData(treeView);
  //   dispatch({
  //     type: SELECT_NODES_IN_TREE_VIEW,
  //     payload: node
  //   })
  // }

  // const findItemInTree = (tree, id, toggled) => {
  //   for (let item of tree) {
  //     if (item.id == id) {
  //       item.toggled = toggled;
  //       item.active = true
  //       return item;
  //     }
  //     else if (item.children.length > 0) {
  //       let findNode = findItemInTree(item.children, id);
  //       if (findNode) {
  //         findNode.toggled = toggled;
  //         item.active = true
  //         return findNode;
  //       }
  //     }
  //   }
  // }

  // const handleClickCreateMap = () => {
  //   setIsOpenCreateMap(true)
  // }

  // const handleCloseCreateMap = () => {
  //   setIsOpenCreateMap(false)
  // }

  // const handleOpenUpgrade = () => {
  //   setIsOpenUpgrade(true)
  // }

  // const handleCloseUpgrade = () => {
  //   setIsOpenUpgrade(false)
  // }

  // return (
  //   <div className={classes.root}>
  //     <Dialog
  //       open={openSelectExistingMap}
  //       onClose={handleClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //       classes={{ paper: classes.container }}
  //     >
  //       <DialogContent classes={{ root: classes.containerBody }}>
  //         <Grid
  //           container
  //           alignItems="center"
  //           direction="column"
  //           justify="center"
  //           classes={{ root: classes.layoutLogin }}
  //         >
  //           <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
  //             <form
  //               className={classes.formLogin}
  //               onSubmit={handleSubmit}
  //             >
  //               <Text size="medium">Select Map*</Text>
  //               <FormControl classes={{ root: classes.rootFormControl }}>
  //                 <Select
  //                   disableUnderline
  //                   IconComponent={() => (
  //                     <ExpandMoreIcon />
  //                   )}
  //                   classes={{ root: classes.rootSelect }}
  //                   onChange={handleChange}
  //                   name='map'
  //                   value={formData.map}>
  //                   {maps && maps.map((item, index) => (
  //                     <MenuItem value={item.id} key={index}> {item.title} </MenuItem>
  //                   ))}
  //                 </Select>
  //               </FormControl>
  //               <Text size="medium">Select Node</Text>
  //               <Text size="medium" color="mainColor">{nodesByMapid ? showBreadcrumb : 'This map has no nodes'}</Text>
  //               <FormControl classes={{ root: classes.rootFormControl }}>
  //                 <Treebeard
  //                   style={
  //                     theme
  //                   }
  //                   onToggle={onToggle}
  //                   decorators={{
  //                     Header: CustomHeader,
  //                     Container: CustomContainer,
  //                   }}
  //                   data={data} />
  //             </FormControl>
  //               {/* <FormControl classes={{ root: classes.rootFormControl }}>
  //                 <Select
  //                   disableUnderline
  //                   IconComponent={() => (
  //                     <ExpandMoreIcon />
  //                   )}
  //                   classes={{ root: classes.rootSelect }}
  //                   onChange={handleChange}
  //                   name='node'
  //                   value={formData.node}>
  //                   {optionNode && optionNode.map((item, index) => (
  //                     <MenuItem value={item.value} key={item.value}> {item.label} </MenuItem>
  //                   ))}
  //                 </Select>
  //               </FormControl> */}
  //               <Grid container item justify="space-between" alignItems="center" classes={{ root: classes.containerButton }}>
  //                 <Text size="medium"><span onClick={handleClickCreateMap}>Save to a New Map</span></Text>
  //                 <Buttons disabled={enableBtnCreate} btnType="large" onClick={handleCreate}>Create</Buttons>
  //               </Grid>
  //             </form>
  //           </Grid>
  //         </Grid>
  //       </DialogContent>
  //       {isOpenCreateMap && <CreateMap openCreateMap={isOpenCreateMap} handleClose={handleCloseCreateMap} handleOpenUpgrade={handleOpenUpgrade} handleCloseSelectExistingMap={handleClose}/>}
  //       {isOpenUpgrade && <PopupUpgrade openUpgrade={isOpenUpgrade} handleClose={handleCloseUpgrade} />}
  //     </Dialog>
  //   </div>
  // );
}

export default SelectExistingMap;