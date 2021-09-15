import { takeLatest, call, put, delay, select } from 'redux-saga/effects';
import {
  CREATE_NODE_REQUEST,
  UPDATE_NODE_REQUEST,
  UPDATE_EXPAND_NODE_REQUEST,
  UPDATE_MOVE_NODE_REQUEST,
  DELETE_NODE_REQUEST,
  GET_DETAIL_POST_BY_ID_REQUEST,
  GET_COLLECT_IMAGES_FROM_URL_REQUEST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  UPDATE_MOVE_POST_REQUEST,
  CREATE_POST_ERROR,
  GET_POSTS_BY_NODE_ID_REQUEST,
  SET_IS_LOADING_POST,
  SET_IS_NOT_LOADING_POST,
  CREATE_NODE_SUCCESS,
  UPDATE_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  GET_DETAIL_POST_BY_ID_SUCCESS,
  GET_COLLECT_IMAGES_FROM_URL_SUCCESS,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_ERROR,
  DELETE_POST_SUCCESS,
  GET_NODES_BY_ID_REQUEST,
  GET_NODES_BY_ID_SUCCESS,
  GET_NODES_BY_ID_ERROR,
  ADD_COMMENT_POST,
  DELETE_POST_REQUEST,
  GET_POSTS_BY_NODE_ID_SUCCESS,
  SET_LOADING_COMMENT,
  GET_COMMENT_BY_MAP_ID_REQUEST,
  GET_COMMENT_BY_MAP_ID_SUCCESS,
  SET_IS_NOT_LOADING_CREATE_POST
} from 'redux/reducers/node/actionTypes'
import {
  GET_MIND_MAP_DATA_SUCCESS,
  SET_SELECT_NODE,
  GET_POSTS_BY_MAP_ID_REQUEST,
  GET_MIND_MAP_TEST,
} from 'redux/reducers/map/actionTypes'
import { SET_IS_LOADING, SET_IS_NOT_LOADING, SET_CONTENT_ERROR } from 'redux/reducers/global/actionTypes'
import {
  createNode,
  updateNode,
  updateNodeExpand,
  updateNodeMove,
  deleteNode,
  createPost,
  updatePost,
  updatePostMove,
  getDetailPost,
  addCommentPostApi,
  deleteFile,
  getCollectImages,
  getPostsByNodeId,
  getNodesByMapId,
} from 'services/node/nodeApi'
import { getMindMapData } from 'services/map/mapApi'
import { getCommentsByNodeId } from 'services/node/nodeApi'
import { toast } from 'react-toastify';
import { SET_BREADCRUMBS } from 'redux/reducers/global/actionTypes'

function* createNodeRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(createNode, action.payload, action.mapId);
    if (response.success) {
      const responseMindMap = yield call(getMindMapData, { id: action.mapId })
      if (action.onSuccess) {
        response.result.topic = response.result.title
        response.result.id = response.result.nodeId
        action.onSuccess(response.result.nodeId, response.result, responseMindMap.result);
      }
      yield put({ type: CREATE_NODE_SUCCESS, payload: response })

      // Customer dont want to show when handle on map
      // toast.success("Create Node Success !");

      // const responseMindMap = yield call(getMindMapData, { id: action.mapId })
      // if (responseMindMap.success) {
      //   yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
      // }

      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    if (action.onFail) {
      action.onFail()
    }
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getCommentByMapIdRequest(action) {
  try {
    if(action.payload.pageNumber >= 2 ) {
      yield put({ type: SET_LOADING_COMMENT, payload: true })
    }
    const response = yield call(getCommentsByNodeId, action.payload);
    if (response.result) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      yield put({ type: GET_COMMENT_BY_MAP_ID_SUCCESS, payload: response.result })
      yield put({ type: SET_LOADING_COMMENT, payload: false })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_LOADING_COMMENT, payload: false })
  }
}

function* updateExpandNodeRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(updateNodeExpand, action.payload)
    // yield put({ type: SET_IS_NOT_LOADING })

  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* updateNodeMoveRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(updateNodeMove, action.payload)
    if (response.success && action.loadMindMap) {
      const responseMindMap = yield call(getMindMapData, { id: action.payload.mapId })
      if (action.onSuccess) {
        action.onSuccess(responseMindMap.result);
      }
    }
    // yield put({ type: SET_IS_NOT_LOADING })

  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* updateNodeRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(updateNode, action.payload, action.nodeId)
    if (response.success) {
      action.dispatch({ 
        type: GET_POSTS_BY_NODE_ID_REQUEST, 
        payload: { nodeId: action.nodeId, mapId: action.mapId }, 
      })
    }
    yield put({ type: SET_IS_NOT_LOADING })

  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* deleteNodeRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(deleteNode, action.payload);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }

      yield put({ type: DELETE_NODE_SUCCESS, payload: response })
      toast.success("Delete Node Success!");
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* deletePostRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(deleteNode, { nodeId: action.payload.nodeId, mapId: action.payload.mapId });
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }

      yield put({ type: DELETE_POST_SUCCESS, payload: action.payload.postId })
      toast.success("Delete Post Success!");

      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getDetailPostByIdRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING_POST })
    const response = yield call(getDetailPost, action.payload);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      yield put({ type: GET_DETAIL_POST_BY_ID_SUCCESS, payload: response.result })
      let mapId = action.payload.mapId
      let parentNodeId
      if (response.result.post.isLinkPost) {
        parentNodeId = response.result.post.parentNodeId
      } else {
        parentNodeId = response.result.parentNodeId
      }
      yield put({
        type: SET_SELECT_NODE,
        payload: {
          nodeId: parentNodeId,
          mapId: mapId,
          root: response.result.pathObjects.length === 2,
        },
      })
      const arrBreadCrumb = []
      if (response.result.pathObjects) {
        for (const item of response.result.pathObjects) {
          yield arrBreadCrumb.push({
            id: item.id,
            label: item.name,
            type: item.type
          })
        }
      }
      yield put({
        type: SET_BREADCRUMBS,
        payload: {
          privacy: response.result.privacyName ? response.result.privacyName.toLowerCase() : '',
          breadcrumbs: arrBreadCrumb
        }
      })
      const dataMindMap = yield select((state) => state.map.dataMindMap)
      if (Object.keys(dataMindMap).length === 0) {
        // let mapId;
        // if (response.result.post.isLinkPost) {
        //   mapId = response.result.post.mapId
        // } else {
        //   mapId = response.result.mapId
        // }
        const responseMindMap = yield call(getMindMapData, { id: action.payload.mapId })
        if (responseMindMap.success) {
          yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
        }
      }
      yield put({ type: SET_IS_NOT_LOADING_POST })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING_POST })
  }
}

function* getCollectImagesFromUrl(action) {
  try {
    const response = yield call(getCollectImages, action.payload);
    if (response.success && (response.result !== null && response.result.length !== 0)) {
      yield put({ type: GET_COLLECT_IMAGES_FROM_URL_SUCCESS, payload: response.result })
      if (action.onSuccess) {
        action.onSuccess();
      }
    } else {
      toast.error('No images found. Check your URL and try again.')
      yield put({ type: GET_COLLECT_IMAGES_FROM_URL_SUCCESS, payload: [] })
    }
    yield put({ type: SET_IS_NOT_LOADING_CREATE_POST })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING_CREATE_POST })
  }
}

function* createPostRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING_POST })
    const response = yield call(createPost, action.payload, action.mapId);
    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess(response.result);
      }
      yield put({ type: CREATE_POST_SUCCESS, payload: response.result })
      // toast.success("Create Post Success!");

      // const responseMindMap = yield call(getMindMapData, { id: action.mapId })
      // if (responseMindMap.success) {
      //   yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
      // }
      yield put({ type: SET_IS_NOT_LOADING_POST })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING_POST })
    // yield put({ type: CREATE_POST_ERROR, payload: response })

  }
}


function* updatePostRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING_POST })
    const response = yield call(updatePost, action.payload, action.nodeId);
    if (action.postMediaIds && action.postMediaIds.length)
      for (const item of action.postMediaIds) {
        yield call(deleteFile, { postMediaId: item })
      }

    if (response.success) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      toast.success("Update Post Success!");
      yield put({ type: SET_IS_NOT_LOADING_POST })
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING_POST })
    // yield put({ type: UPDATE_POST_ERROR, payload: response })
  }
}

function* updateMovePostRequest(action) {
  try {
    // yield put({ type: SET_IS_LOADING })
    const response = yield call(updatePostMove, action.payload)
    if (action.onSuccess) {
      action.onSuccess()
    }
    // yield put({ type: SET_IS_NOT_LOADING })

  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* addCommentPost(action) {
  try {
    // yield put({ type: SET_LOADING_COMMENT, payload: true })
    const response = yield call(addCommentPostApi, action.payload);
    if (response.success) {
      const postUpdateComment = yield call(getDetailPost, { 
        mapId: action.payload.mapId,
        postId: action.payload.postId
      })
      if (postUpdateComment.success)
        action.onSuccess();
    }
    // yield put({ type: GET_NODES_BY_ID_SUCCESS, payload: response })
    // yield put({ type: SET_LOADING_COMMENT, payload: false })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_LOADING_COMMENT, payload: false })
    // yield put({ type: GET_NODES_BY_ID_ERROR })

  }
}

function* getPostsByNodeIdRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    if (action.isAllowLoadMindmap) {
      const responseMindMap = yield call(getMindMapData, { id: action.mapId })
      if (responseMindMap.success) {
        yield put({ type: GET_MIND_MAP_DATA_SUCCESS, payload: responseMindMap.result })
      }
      
    }
    const response = yield call(getPostsByNodeId, action.payload);
    if (response.success) {
      yield put({ type: GET_POSTS_BY_NODE_ID_SUCCESS, payload: response.result })
      // yield put({
      //   type: SET_SELECT_NODE,
      //   payload: {
      //     nodeId: response.result.nodeId,
      //     mapId: response.result.mapId,
      //     root: false,
      //     topic: response.result.title
      //   },
      // })
      const arrBreadCrumb = []
      if (response.result.pathObjects) {
        for (const item of response.result.pathObjects) {
          yield arrBreadCrumb.push({
            id: item.id,
            label: item.name,
            type: item.type
          })
        }
      }
      yield put({
        type: SET_BREADCRUMBS,
        payload: {
          privacy: response.result.mapPrivacy ? response.result.mapPrivacy.toLowerCase() : '',
          breadcrumbs: arrBreadCrumb
        }
      })
      if (action.onSuccess) {
        action.onSuccess();
      }
      yield put({ type: SET_IS_NOT_LOADING })
    }
  } catch (error) {
    if (action.onFail) {
      action.onFail()
    }
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
  }
}

function* getNodesByMapIdRequest(action) {
  try {
    yield put({ type: SET_IS_LOADING })
    const response = yield call(getNodesByMapId, action.payload);
    yield put({ type: GET_NODES_BY_ID_SUCCESS, payload: response })
    yield put({ type: SET_IS_NOT_LOADING })
  } catch (error) {
    toast.error(error.response.data.error.message);
    yield put({ type: SET_IS_NOT_LOADING })
    yield put({ type: GET_NODES_BY_ID_ERROR })
  }
}


function* handleNode() {
  yield takeLatest(CREATE_NODE_REQUEST, createNodeRequest);
  yield takeLatest(UPDATE_NODE_REQUEST, updateNodeRequest);
  yield takeLatest(UPDATE_EXPAND_NODE_REQUEST, updateExpandNodeRequest);
  yield takeLatest(UPDATE_MOVE_NODE_REQUEST, updateNodeMoveRequest);
  yield takeLatest(DELETE_NODE_REQUEST, deleteNodeRequest);
  yield takeLatest(GET_DETAIL_POST_BY_ID_REQUEST, getDetailPostByIdRequest);
  yield takeLatest(GET_COLLECT_IMAGES_FROM_URL_REQUEST, getCollectImagesFromUrl);
  yield takeLatest(GET_NODES_BY_ID_REQUEST, getNodesByMapIdRequest);

  yield takeLatest(CREATE_POST_REQUEST, createPostRequest);
  yield takeLatest(UPDATE_POST_REQUEST, updatePostRequest);
  yield takeLatest(DELETE_POST_REQUEST, deletePostRequest)
  yield takeLatest(UPDATE_MOVE_POST_REQUEST, updateMovePostRequest)
  yield takeLatest(ADD_COMMENT_POST, addCommentPost)
  yield takeLatest(GET_POSTS_BY_NODE_ID_REQUEST, getPostsByNodeIdRequest)
  yield takeLatest(GET_COMMENT_BY_MAP_ID_REQUEST, getCommentByMapIdRequest)
}

export default handleNode
