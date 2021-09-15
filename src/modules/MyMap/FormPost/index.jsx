import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grid, Typography, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import { Buttons, Text, Loading, BreadcrumbsCustom, Tooltips, VideoCustom } from 'components'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DialogAddPost from '../DialogAddPost';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, Zoom } from 'react-toastify';
import {
  CREATE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  GET_DETAIL_POST_BY_ID_REQUEST,
  GET_COLLECT_IMAGES_FROM_URL_REQUEST,
  GET_POSTS_BY_NODE_ID_REQUEST,
  SET_IS_LOADING_CREATE_POST,
  RESET_NODE_DETAIL,
} from 'redux/reducers/node/actionTypes';
import DialogConfirmDeletePost from '../DialogConfirmDeletePost'
import { pdfjs, Document, Page } from 'react-pdf'
import { formatArrayBreadCrumb, validateError, checkLongString, isMobile } from 'helpers'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import {
  GET_MIND_MAP_DATA_REQUEST,
  SET_SELECT_NODE,
  RESET_MAP_DETAIL,
} from 'redux/reducers/map/actionTypes';
import { classesWidthSplit } from 'utils';
import { EventPage, PropertyName } from 'constants/mixpanel';
import { mixPanel } from 'services/mixpanel';
import QuillAutoDetectUrl, { QuillAutoDetectUrlOptions } from "quill-auto-detect-url";
import _ from 'lodash';
import { updatePost, deleteFile, createPost } from 'services/node/nodeApi'
import CheckIcon from '@material-ui/icons/Check';

Quill.register("modules/autoDetectUrl", QuillAutoDetectUrl);

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2
});

const FormPost = (props) => {
  const reactQuillRef = useRef(null)
  const matchEditPost = useRouteMatch('/edit-post/:id/board/:mapId/node/:nodeId');
  const matchCreatePost = useRouteMatch('/new-post/board/:mapId/node/:nodeId');
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams()
  const [isOpenEditTitle, setIsOpenEditTitle] = useState(false)
  const [isOpenDialogAddPost, setIsOpenDialogAddPost] = useState(false)
  const [isOpenDialogConfirmDelete, setIsOpenDialogConfirmDelete] = useState(false)
  // const titleNode = useSelector((state) => state.node.titleNode)
  const postDetail = useSelector((state) => state.node.postDetail)
  const nodeDetail = useSelector((state) => state.node.nodeDetail)
  const selectNode = useSelector((state) => state.map.selectNode)
  const selectMap = useSelector((state) => state.map.selectNode.mapId)
  const collectImages = useSelector((state) => state.node.collectImages)
  const [fileServerDelete, setFileServerDelete] = useState([])
  const [flag, setFlag] = useState(false)
  const [oldURL, setOldURL] = useState('')
  // const isLoading = useSelector((state) => state.global.isLoading)
  const isLoadingPost = useSelector((state) => state.node.isLoadingPost)
  const breadcrumbs = useSelector((state) => state.global.dataHeader.breadcrumbs)
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const isBlur = useSelector((state) => state.map.isBlur)
  const [stateSave, setStateSave] = useState({
    text: "",
    saving: SavingState.NOT_SAVED
  })
  const [isChanged, setIsChanged] = useState(false)
  const customer = localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'))

  const [formData, setFormData] = useState({
    title: 'New Post',
    post: 'upload',
    url: '',
    upload: [],
    preview: [],
    video: [],
    isDraft: false,
    // description: '',
  })
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({
    url: '',
    upload: '',
    preview: '',
    description: '',
    title: '',
  })
  const [isCheckSubmited, setIsCheckSubmited] = useState(false);
  const locations = useLocation()
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const postOwner = postDetail.post && !postDetail.post.isLinkDirectly && !postDetail.post.isLinkPost
  const [pageNumber, setPageNumber] = useState(1);
  const componentWillUnmount = useRef(false)

  let urlSearchParams = new URLSearchParams(locations.search);
  // let mapId = urlSearchParams.get("map")
  // let parentNodeId = urlSearchParams.get("parentNode")

  let toolbar

  if (isMobile()) {
    toolbar = {
      container: [
        ['bold', 'italic', 'underline'],
        [{ size: [] }],
        [{ 'color': [] }],
        [{ 'align': null }], [{ 'align': 'center' }],
        [{ 'list': 'ordered' }],
        ['link'], ['image'],
        ['undo', 'redo'],
      ],
    }
  } else {
    toolbar = {
      container: [
        ['bold', 'italic', 'underline'],
        [{ size: [] }],
        [{ 'color': [] }],
        [{ 'align': null }, { 'align': 'center' }],
        [{ 'list': 'ordered' }],
        [{ 'direction': 'rtl' }],
        ['link', 'image'],
        ['undo', 'redo'],
      ],
      // handlers: {
      //   'undo': myUndo,
      //   'redo': myRedo,
      // }
    }
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_NODE_DETAIL,
      })
      dispatch({
        type: RESET_MAP_DETAIL,
      })
    }
  }, [])

  const initChangeAndSave = () => {
    setIsChanged(true)
    setStateSave({ ...stateSave, saving: SavingState.NOT_SAVED });
  }

  const AutoSavePost = () => {
    if (!isChanged) return
    // handle case when wrong required
    let titleAutoSave;
    let descriptionAutoSave;
    const editor = reactQuillRef.current.getEditor();


    if (formData.title.length > 70 || formData.title.length < 1) {
      if (matchEditPost && matchEditPost.isExact) {
        return
        // titleAutoSave = postDetail.post.title
      } else {
        titleAutoSave = 'New Post'
      }
    } else {
      titleAutoSave = formData.title
    }

    if (editor.getLength() > 50000) {
      if (matchEditPost && matchEditPost.isExact) {
        return
        // descriptionAutoSave = postDetail.post.description
      } else {
        descriptionAutoSave = ''
      }
    } else {
      descriptionAutoSave = description
    }

    let formDataPost = new FormData()
    formDataPost.append("ParentNodeId", matchEditPost ? parseInt(postDetail.parentNodeId) : parseInt(params.nodeId))
    formDataPost.append("Title", titleAutoSave)
    formDataPost.append("Description", descriptionAutoSave)
    formDataPost.append("Url", formData.post === 'url' ? formData.url : '')
    formData.upload.filter(item => item.type === 'clientFile').map((item) => {
      if (formData.post === 'url') {
        formDataPost.append("PostMediaUrl", item.url)
      } else {
        formDataPost.append("PostMedia", item.url)
      }
    })

    if (matchEditPost && matchEditPost.isExact) {
      if (formData.isDraft) {
        formDataPost.append("isDraft", true)
      } else {
        formDataPost.append("isDraft", false)
      }
    } else {
      formDataPost.append("isDraft", true)
    }

    const AutoSave = async () => {
      setStateSave({ ...stateSave, saving: SavingState.SAVING });
      if (matchEditPost && matchEditPost.isExact) {
        await updatePost(formDataPost, postDetail.nodeId)
        if (fileServerDelete && fileServerDelete.length) {
          for (const item of fileServerDelete) {
            await deleteFile({ postMediaId: item })
          }
        }
        dispatch({
          type: GET_DETAIL_POST_BY_ID_REQUEST,
          payload: {
            mapId: params.mapId,
            postId: params.postId,
          }
        })
      } else {
        await createPost(formDataPost, params.mapId)
      }
      setIsChanged(false)
      setStateSave({ ...stateSave, saving: SavingState.SAVED });
    }

    AutoSave()
  }

  const handleAutoSaveDelayed = useCallback(_.debounce(AutoSavePost, 1500), [formData, description, fileServerDelete])

  // AutoSave when Edit Post
  useEffect(
    () => {
      if (matchEditPost && matchEditPost.isExact && !isCheckSubmited) {
        handleAutoSaveDelayed()
      }

      return handleAutoSaveDelayed.cancel;
    },
    [
      formData,
      description,
      fileServerDelete,
      handleAutoSaveDelayed,
      matchEditPost,
      isCheckSubmited,
      // isChanged,
    ]
  )

  // AutoSave as Draft when create Post
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true
    }
  }, [])
  useEffect(() => {
    return () => {
      if (componentWillUnmount.current && !isCheckSubmited) {
        if (matchCreatePost && matchCreatePost.isExact) {
          AutoSavePost()
        }
      }
    }
  }, [formData, description, fileServerDelete, isCheckSubmited, matchCreatePost])

  // useEffect(() => {
  //   if (matchEditPost && params.mapId) {
  //     dispatch({
  //       type: GET_MIND_MAP_DATA_REQUEST,
  //       payload: {
  //         id: params.mapId
  //       },
  //     })
  //   }
  // }, [])

  useEffect(() => {
    if (Object.keys(dataMindMap).length === 0 && params.mapId) {
      dispatch({
        type: GET_MIND_MAP_DATA_REQUEST,
        payload: {
          id: params.mapId
        },
      })
      dispatch({
        type: SET_SELECT_NODE,
        payload: {
          nodeId: params.nodeId,
          mapId: params.mapId,
          ...selectNode
        },
      })
    }
  }, [dataMindMap])

  useEffect(() => {
    if (postDetail && postDetail.post && matchEditPost) {
      setDescription(postDetail.post.description ? postDetail.post.description : '')
      let data = {
        ...formData,
        title: postDetail.post.title,
        post: 'upload',
        // description: '',
        preview: postDetail.post.postMedias.filter(item => item.contentType === 'Image' || item.contentType === 'Pdf').map(item => {
          return {
            id: item.postMediaId,
            url: item.pathUrl,
            type: item.contentType
          }
        }),
        upload: postDetail.post.postMedias.filter(item => item.contentType === 'Image' || item.contentType === 'Pdf').map(item => {
          return {
            id: item.postMediaId,
            type: 'serverFile',
            url: ''
            // url: checkFile(item.pathUrl)new File([""],item.pathUrl),
          }
        }),
        isDraft: postDetail.post.isDraft,
      }
      if (postDetail.url) {
        data.url = postDetail.url
        data.post = 'url'
        data.video = postDetail.post.postMedias.filter(item => item.contentType === 'Website/Video URL').map(item => {
          return {
            id: item.postMediaId,
            type: 'serverFile',
            url: ''
            // url: checkFile(item.pathUrl)new File([""],item.pathUrl),
          }
        })
      }
      setFormData(data)
      setFileServerDelete([])
    }
  }, [postDetail])

  useEffect(() => {
    if (matchEditPost && params.postId) {
      dispatch({
        type: GET_DETAIL_POST_BY_ID_REQUEST,
        payload: {
          mapId: params.mapId,
          postId: params.postId,
        }
      })
    }
    if (matchCreatePost && params.nodeId) {
      dispatch({
        type: GET_POSTS_BY_NODE_ID_REQUEST,
        payload: { nodeId: params.nodeId, mapId: params.mapId }
      })
    }
  }, [params])

  // useEffect(() => {
  //   if (!flag) return
  //   if (collectImages.length) {
  //     setIsOpenDialogAddPost(true)
  //   } else {
  //     toast.error("No website was found from this URL!");
  //   }
  // }, [collectImages])

  const handleSubmit = () => {
    if (validation() && validationDescription()) {
      let formDataPost = new FormData()
      formDataPost.append("ParentNodeId", matchEditPost ? parseInt(postDetail.parentNodeId) : parseInt(params.nodeId))
      formDataPost.append("Title", formData.title)
      formDataPost.append("Description", description)
      formDataPost.append("Url", formData.post === 'url' ? formData.url : '')
      formData.upload.filter(item => item.type === 'clientFile').map((item) => {
        if (formData.post === 'url') {
          formDataPost.append("PostMediaUrl", item.url)
        } else {
          formDataPost.append("PostMedia", item.url)
        }
      })

      // isDraft
      formDataPost.append("isDraft", false)

      if (matchEditPost) {
        const onSuccess = () => {
          setIsCheckSubmited(true)
          if (selectNode.root) {
            history.push(`/board/${postDetail.mapId}`)
          } else {
            history.push(`/board/${postDetail.mapId}/node/${postDetail.parentNodeId}`)
          }
        }
        dispatch({
          type: UPDATE_POST_REQUEST,
          payload: formDataPost,
          postMediaIds: fileServerDelete,
          nodeId: postDetail.nodeId,
          onSuccess: onSuccess,
        })
      } else {
        //mixPanel
        mixPanel.track(EventPage.CreatePost)

        const onSuccess = () => {
          setIsCheckSubmited(true)
          if (selectNode.root) {
            history.push(`/board/${params.mapId}`)
          } else {
            history.push(`/board/${params.mapId}/node/${params.nodeId}`)
          }
        }
        dispatch({
          type: CREATE_POST_REQUEST,
          payload: formDataPost,
          mapId: params.mapId,
          onSuccess: onSuccess,
        })
      }
      // dispatch({
      //   type: CREATE_NODE_REQUEST,
      //   payload: formDataPost,
      //   mapId: mapId,
      // })
    } else {
      console.log('noooooo', validation())
    }
  }

  const handleLoadError = (error) => {
    toast.error('Error while loading document! ' + error.message);
    setFormData({
      ...formData,
      upload: [],
      preview: []
    })
  }

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
  }
  // return text form text area
  // return true if empty

  const checkEmptyDescription = () => {
    const editor = reactQuillRef.current.getEditor();
    const unprivilegedEditor = reactQuillRef.current.makeUnprivilegedEditor(editor);
    return unprivilegedEditor.getText().trim() === '';
  };

  useEffect(() => {
    validation()
  }, [formData.title])

  const matchVideoUrl = (url) => {
    const p = /https:\/\/(?:www\.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
    const matches = url.match(p);
    if (matches) return matches[1];
    return false;
  }

  const validation = () => {
    const object = {
      url: '',
      preview: '',
      title: ''
    }
    let formIsValid = true;
    if (formData.title.length > 70 || formData.title.length < 1) {
      object.title = 'Your post name must be between 1 - 70 characters';
      formIsValid = false
    }
    if (formData.post === 'url') {
      if (formData.url === '') {
        // object.url = 'URL is required';
        // formIsValid = false
      } else if (!formData.upload.length === 0 && formData.url && !matchVideoUrl(formData.url)) {
        // object.preview = 'Image is required';
        // object.url = 'Choose image from this website';
        // formIsValid = false
      }
    } else {
      if (formData.upload.length === 0) {
        // object.preview = 'Image is required';
        // formIsValid = false
      }
    }
    // if (checkEmptyDescription(description.length > 50000)) {
    //   object.description = 'Description is required';
    //   formIsValid = false
    // }
    setErrors({ ...errors, ...object });
    return formIsValid
  }

  const handleEditTitle = () => {
    setIsOpenEditTitle(true)
  }

  const handleCloseDialogDelete = () => {
    setIsOpenDialogConfirmDelete(false)
  }
  const handleDeletePost = () => {
    const onSuccess = () => {
      history.push(`/board/${postDetail.mapId}/node/${postDetail.parentNodeId}`)
    }
    dispatch({
      type: DELETE_POST_REQUEST,
      payload: {
        postId: postDetail.post.postId,
        mapId: postDetail.mapId,
        nodeId: postDetail.nodeId
      },
      onSuccess: onSuccess

    })
  }

  const updateListImageToDelete = () => {
    const fileDel = formData.upload.filter(item => item.type === 'serverFile').map(item => item.id)
    if (fileDel) setFileServerDelete([...fileServerDelete, ...fileDel])
  }

  const updateURLVideoDelete = () => {
    const fileDel = formData.video.filter(item => item.type === 'serverFile').map(item => item.id)
    if (fileDel) setFileServerDelete([...fileServerDelete, ...fileDel])
  }

  const handleChange = e => {
    // initChangeAndSave()
    if (e.target.name === 'post') {
      updateListImageToDelete()
      setFormData({
        ...formData,
        upload: [],
        preview: [],
        post: e.target.value
      })
      return
    }
    if (e.target.name === 'url') {
      setOldURL(formData.url)
      initChangeAndSave()
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const checkValidFileUpload = (file) => {
    return file.type.split('/')[0] === 'image' || file.type === 'application/pdf'
  }
  const checkSizeFileUpload = (file) => {
    let maxSize;
    let type;
    if (file?.type.includes('image/')) {
      maxSize = 5120;
      type = "Image";
    } else {
      maxSize = 4096;
      type = "Pdf";
    }
    if ((file?.size / 1024) > maxSize) {
      toast.error(`Your ${type} must be less than ${type == 'Image' ? '5MB' : '4MB'}`)
      return false;
    }
    else {
      return true;
    }
  }

  const handleChangeUpload = e => {
    if (e.target.files.length > 8) {
      toast.error("Only up to 8 images can be uploaded!");
    }
    else {
      let checkTypefileUpload = true
      let checkSizeUpload = true
      for (let i = 0; i < e.target.files.length; i++) {
        if (!checkValidFileUpload(e.target.files[i])) {
          checkTypefileUpload = false
          break
        }
        if (!checkSizeFileUpload(e.target.files[i])) {
          checkSizeUpload = false;
        }
      }
      if (!checkTypefileUpload)
        toast.error("Only available for pdf and image")
      else if (!checkSizeUpload) {

      }
      else {
        let arrPreview = [...formData.preview];
        let arrUpload = [...formData.upload];
        // const idMax = Math.max.apply(Math, formData.upload.map(function (o) { return o.id; })) === Number('-Infinity') ? 0 : Math.max.apply(Math, formData.upload.map(function (o) { return o.id; }))
        for (let i = 0; i < e.target.files.length; i++) {
          const id = uuidv4()
          arrPreview.push({ id, url: URL.createObjectURL(e.target.files[i]), type: e.target.files[i].type === 'application/pdf' ? 'Pdf' : 'Image' })
          arrUpload.push({ id, url: e.target.files[i], type: 'clientFile' })
        }

        setFormData({
          ...formData,
          upload: arrUpload,
          preview: arrPreview
        })

        initChangeAndSave()
      }
    }
    document.getElementById('upload-file').value = ''
  }

  const handleClickAddPost = () => {
    const object = {
      url: '',
      preview: '',
      description: '',
    }
    if (formData.post === 'url') {
      if (formData.url == '') {
        object.url = 'URL is required';
        setErrors(object);
        return
      } else {
        setFlag(true)
        setErrors(object)
        if (matchVideoUrl(formData.url)) {
          updateListImageToDelete()
          setFormData({
            ...formData,
            upload: [],
            preview: [],
          })
          if (oldURL === formData.url) {
            toast.error("This URL already exists!", {
              transition: Zoom
            });
          } else {
            setOldURL(formData.url)
            toast.success("This URL is video!", {
              transition: Zoom
            });
          }
        } else {
          updateURLVideoDelete()
          dispatch({
            type: SET_IS_LOADING_CREATE_POST,
          })
          const onSuccess = () => {
            setIsOpenDialogAddPost(true)
          }
          dispatch({
            type: GET_COLLECT_IMAGES_FROM_URL_REQUEST,
            payload: {
              sourceUrl: formData.url,
            },
            onSuccess,
          })
        }
      }
    }
  }

  const handleCloseAddPost = () => {
    setIsOpenDialogAddPost(false)
  }

  const handleDelete = (id) => {
    const dataPreview = formData.preview.filter(item => item.id !== id)
    const dataUpload = formData.upload.filter(item => item.id !== id)
    const fileDel = formData.upload.find(item => item.id === id && item.type === 'serverFile')

    if (fileDel)
      setFileServerDelete([...fileServerDelete, fileDel.id])
    setFormData({
      ...formData,
      preview: dataPreview,
      upload: dataUpload
    })
    initChangeAndSave()
  }

  const handleChangeText = value => {
    setDescription(value)
    validationDescription()
    const textEl = reactQuillRef.current.getEditor().root
    const offset = textEl.scrollHeight - textEl.offsetHeight
    textEl.scrollTo(0, offset)

    initChangeAndSave()
    // textEl.root.scrollTop = textEl.root.scrollHeight -
    // console.log(reactQuillRef.current.getEditor().root.scrollHeight,textEl.root.scrollTop, , textEl.container.scrollTop, textEl.container.scrollHeight)
    // window.scrollTo(0,document.body.scrollHeight)

  }

  // Check maximum description 
  const validationDescription = () => {
    let description = '';
    let formIsValid = true;
    const editor = reactQuillRef.current.getEditor();
    if (editor.getLength() > 50000) {
      description = 'You have reached the maximum of 50,000 characters per post'
      formIsValid = false
    }
    setErrors({ ...errors, description: description })
    return formIsValid
  }


  // const myUndo = () => {
  //   let myEditor = reacQuillRef.getEditor();
  //   return myEditor.history.undo();
  // }

  // const myRedo = () => {
  //   let myEditor = reactQuillRef.getEditor();
  //   return myEditor.history.redo();
  // }

  const modulesReactQuill = {
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: false
    },
    toolbar: toolbar,
    autoDetectUrl: {
      urlRegularExpression: /(https?:\/\/|www\.)[\w-.]+\.[\w-.]+[\S]+/i,
    }, // or true

  }

  const icons = ReactQuill.Quill.import('ui/icons');
  icons['bold'] = `<img src=${Images.icBold} alt="" />`;
  icons['italic'] = `<img src=${Images.icItalicon} alt="" />`;
  icons['underline'] = `<img src=${Images.icUnderlined} alt="" />`;
  icons['color'] = `<img src=${Images.icSubtract} alt="" />`;
  icons['align'][''] = `<img src=${Images.icAlignLeft} alt="" />`;
  icons['align']['center'] = `<img src=${Images.icAlignCenter} alt="" />`;
  icons['direction'][''] = `<img src=${Images.icPath} alt="" />`;
  icons['list'] = `<img src=${Images.icListNumbered} alt="" />`;
  icons['link'] = `<img src=${Images.icLink} alt="" />`;
  icons['image'] = `<img src=${Images.icPicture} alt="" />`;
  icons['undo'] = `<img src=${Images.icUndo} alt="" />`;
  icons['redo'] = `<img src=${Images.icRedo} alt="" />`;

  const handleClickProfile = () => {
    if (!matchEditPost)
      history.push('/profile')
    else
      history.push(`/search/profile/${postDetail.customerId}`)
  }

  const handleChangeTitle = (e) => {
    setFormData({
      ...formData,
      title: e.target.value
    })
    initChangeAndSave()
  }

  const handleCancelCreate = () => {
    if (selectNode.root) {
      history.push(`/board/${params.mapId}`)
    } else {
      history.push(`/board/${params.mapId}/node/${params.nodeId}`)
    }
  }

  const AutoSaveDisplay = ({ saving }) => {
    let display;
    switch (saving) {
      case SavingState.SAVING:
        display = <span>saving...</span>;
        break;
      case SavingState.SAVED:
        display = (
          <>
            <img src={Images.icCloud} alt="cloud-cortishare"/><span>All Changes Saved</span>
          </>
        );
        break;
      default:
        display = <br />;
    }
    return <div className={classes.autoSaveDisplay}>{display}</div>;
  };

  const handleClosePost = () => {
    history.push(`/board/${params.mapId}/node/${params.nodeId}`)
  }

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      classes={{
        root: clsx(
          classes[`${classesWidthSplit(widthSplit)}`],
          classes.container,
          // widthSplit <= 678.5 && classes.responsiveContainer
        )
      }}
    >
      <div className={classes.closePostMobile} onClick={handleClosePost}>
        <img src={Images.icCloseBig} alt="close-cortishare"/>
      </div>
      <div className={classes.subTitle}>
        <>Post:<BreadcrumbsCustom data={formatArrayBreadCrumb(breadcrumbs)} type='breadcrumbPost' /></>
      </div>
      <Grid classes={{ root: classes.headerSection }}>
        <Grid classes={{ root: classes.containerTitle }}>
          <Grid container>
            {/* {isLoadingPost && <Loading />} */}
            {isOpenEditTitle ?
              <input
                autoFocus={isOpenEditTitle}
                value={formData.title}
                onChange={handleChangeTitle}
                onBlur={() => setIsOpenEditTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.keyCode === 13) {
                    setIsOpenEditTitle(false)
                    validation()
                  }
                }}
                className={classes.inputTitle}
              />

              :
              <Grid container justify="flex-start" alignItems="center">
                <Text handleClick={handleEditTitle} classes={{ root: classes.textTitle }}>{formData.title}</Text>
                <img src={Images.icEdit} alt="" onClick={handleEditTitle} className={classes.iconEdit} />
              </Grid>
            }
            <div className={classes.textError}>{errors.title}</div>
          </Grid>
          <Text classes={{ root: classes.subTitle }}>
            Added by <span onClick={handleClickProfile}>
              {`${checkLongString((matchEditPost && matchEditPost.isExact && Object.keys(postDetail).length !== 0) ?
                postDetail.createdBy :
                (matchCreatePost && matchCreatePost.isExact && customer && customer.userName), 20, 20)}`}
            </span> {` on ${moment().format('DD MMM')}`}
          </Text>
        </Grid>

        <Grid container alignItems="center" justify="flex-end" classes={{ root: classes.containerButton }}>
          {matchEditPost && <Text classes={{ root: classes.linkRemove }} handleClick={() => setIsOpenDialogConfirmDelete(true)} size="medium"><span>Remove Post</span></Text>}
          {matchCreatePost && <Text classes={{ root: classes.linkRemove }} handleClick={handleCancelCreate} size="medium"><span>Cancel</span></Text>}
          <Buttons classes={{ root: classes.btnSave }} btnType="large" disabled={isLoadingPost} onClick={handleSubmit}>Publish</Buttons>
          <div className={classes.closePost} onClick={handleClosePost}>
            <img src={Images.icCloseBig} alt="close-cortishare"/>
          </div>
        </Grid>
      </Grid>

      <AutoSaveDisplay saving={stateSave.saving} />

      <Grid container>
        <Grid container classes={{ root: clsx(classes.description, widthSplit <= 678.5 && classes.responsiveDescription) }}>
          <RadioGroup aria-label="gender" name="post" value={formData.post} onChange={handleChange} classes={{ root: classes.radioGroup }}>

            <FormControlLabel
              classes={{ root: classes.rootFormControlLabel }}
              value="upload"
              control={<Radio classes={{ root: classes.rootRadio, checked: classes.rootRadioChecked }} />}
              label={<Text size="medium">Upload image or PDF</Text>}
            />
            {formData.post === 'upload' ?
              <>
                <Grid container classes={{ root: classes.containerRadioChild }}>
                  <input type="file" id="upload-file" multiple name="upload" onChange={handleChangeUpload} accept="application/pdf,image/x-png,image/gif,image/jpeg" />
                  <label htmlFor="upload-file" className={classes.labelUpload}>
                    <Text classes={{ root: classes.upload }}>Select file</Text>
                    {/* <Text size="medium">{formData.upload && formData.upload.split('\\')[formData.upload.split('\\').length - 1]}</Text> */}
                  </label>
                </Grid>
                <div className={classes.textError}>{formData.post == 'upload' && errors.upload}</div>
              </> :
              <>
              </>
            }
            <FormControlLabel
              classes={{ root: classes.rootFormControlLabel }}
              value="url"
              control={<Radio classes={{ root: classes.rootRadio, checked: classes.rootRadioChecked }} />}
              label={<Text size="medium">Enter Website or Video URL</Text>}
            />
            {formData.post === 'url' &&
              <Grid container classes={{ root: clsx(classes.containerUrl, classes.containerRadioChild) }} alignItems="center" justify="space-between">
                <input onChange={handleChange} value={formData.url} name="url" className={classes.input} placeholder="Enter website" />
                <Buttons btnType="medium" onClick={handleClickAddPost}><ChevronRightIcon /></Buttons>

                <div className={classes.textError}>{formData.post == 'url' && errors.url}</div>
              </Grid>
            }
            {formData.preview.length > 0 ?
              <Grid container spacing={2} classes={{ root: classes.containerImagePreview }}>
                {formData.preview.map((item, index) =>
                  <Grid key={index} classes={{ root: classes.gridItem }} item>
                    <img src={Images.icClose} alt="" className={classes.close} onClick={() => handleDelete(item.id)} />
                    {item.type !== "Pdf" ?
                      <img src={item.url} alt="" className={classes.imagePreview} />
                      :
                      <Document onLoadSuccess={onDocumentLoadSuccess} onLoadError={handleLoadError} onSourceError={handleLoadError} file={item.url}>
                        <Page onLoadError={handleLoadError} onRenderError={handleLoadError} renderAnnotationLayer={false} height={150} width={150} pageNumber={pageNumber} className={classes.previewPdf} />
                      </Document>
                    }
                  </Grid>
                )}
              </Grid>
              :
              <>
                {formData.post === 'url' && matchVideoUrl(formData.url) ?
                  <div className={classes.containerVideo}>
                    <VideoCustom data={[{ pathUrl: formData.url }]} />
                  </div>
                  :
                  <>
                    <Grid container >
                      <label className={clsx(classes.preview, formData.post === 'upload' && classes.previewUpload, widthSplit <= 600 && classes.previewReponsive)} htmlFor={formData.post === 'upload' ? 'upload-file' : ''}>
                        <Text size="large">{`${formData.post === 'url' ? 'Preview' : 'Upload'}`}</Text>
                        <img src={Images.icImage} alt="" />
                      </label>
                    </Grid>
                    <div className={classes.textError}>{errors.preview}</div>
                  </>
                }
              </>
            }
          </RadioGroup>
          <Text size="medium">Write</Text>
          <Grid container>
            <ReactQuill
              placeholder=" Type something"
              value={description}
              className={clsx(classes.textDescription, widthSplit <= 584.5 && classes.responsiveTextDescription)}
              onChange={handleChangeText}
              modules={modulesReactQuill}
              ref={reactQuillRef}
            // onKeyDown={validationDescription}
            />
            <div className={classes.textError}>{errors.description}</div>
          </Grid>
        </Grid>

        <Grid container alignItems="center" classes={{ root: clsx(classes.containerButtonMobile) }}>
          <Grid item xs={6} container justify="center">
            {matchEditPost && <Text classes={{ root: classes.linkRemove }} handleClick={() => setIsOpenDialogConfirmDelete(true)} size="medium"><span>Remove Post</span></Text>}
            {matchCreatePost && <Text classes={{ root: classes.linkRemove }} handleClick={handleCancelCreate} size="medium"><span>Cancel</span></Text>}
          </Grid>
          <Grid item xs={6} container justify="center">
            <Buttons classes={{ root: classes.btnSave }} btnType="large" disabled={isLoadingPost} onClick={handleSubmit}>
              {matchEditPost && matchEditPost.isExact && `Publish`}
            </Buttons>
          </Grid>
        </Grid>
      </Grid>

      {isOpenDialogAddPost && <DialogAddPost
        openDialogAddPost={isOpenDialogAddPost}
        setFormData={setFormData}
        formData={formData}
        handleClose={handleCloseAddPost}
        initChangeAndSave={initChangeAndSave}
      />
      }
      {isOpenDialogConfirmDelete && <DialogConfirmDeletePost open={isOpenDialogConfirmDelete} onClose={handleCloseDialogDelete} confirm={handleDeletePost} isPostOwner={postOwner} />}
    </Grid >
  );
}

export default connect()(FormPost);