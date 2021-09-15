import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Typography,
  Hidden,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import useStyles, { themeAutosuggest } from './styles';
import CloseIcon from '@material-ui/icons/Close';
import { Buttons, Text, Inputs } from 'components'
import TagsInput from 'react-tagsinput'
import { useForm, Controller } from "react-hook-form"
import Autosuggest from 'react-autosuggest';
import { useDispatch, connect, useSelector } from 'react-redux';
import _ from 'lodash'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';


const Popup = forwardRef(({ handleSubmitCreateNode, handleSubmitEditNode, isEditNode }, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, control } = useForm();
  const dataMindMap = useSelector((state) => state.map.dataMindMap)
  const selectNode = useSelector((state) => state.map.selectNode)
  const searchTags = useSelector((state) => state.map.searchTags)
  const nodeDetail = useSelector((state) => state.node.nodeDetail)
  const tagInput = useRef(null)

  const [mindMap, setMindMap] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const history = useHistory()
  const LEFT = 0
  const RIGHT = 1
  const [isShowError, setIsShowError] = useState({
    tags: false,
  });
  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
  })

  useEffect(() => {
    if (isEditNode) {
      setFormData({
        ...formData,
        title: nodeDetail.title,
        // description: 'aaaa', //nodeDetail.nodeDescription
        // tags: ['123','312'], //nodeDetail.tags
        description: nodeDetail.nodeDescription,
        tags: nodeDetail.tags,
      })
    } else {
      clearFields()
    }
  }, [nodeDetail, isEditNode, dataMindMap])

  useImperativeHandle(ref, () => ({

    showPopup() {
      setShowPopup(true)
    }
  }));

  const clearFields = () => {
    setFormData({
      ...formData,
      title: '',
      tags: [],
      description: ''
    })
  }
  const handleChangeTags = (tags) => {
    tagInput.current.input.input.placeholder = '';
    if (tags && tags.length !== 0) {
      setIsShowError({ ...isShowError, tags: false })
    } else {
      setIsShowError({ ...isShowError, tags: true })
    }
    const position = tags.findIndex(item => !item.includes('#'))
    if (position !== - 1) {
      tags[position] = `#${tags[position]}`
      const duplicate = tags.findIndex((item, index) => item === tags[position] && index !== position)
      if (duplicate !== -1) {
        tags = tags.filter((item, index) => index !== position)
      }
    }
    setFormData({
      ...formData,
      tags
    })
  }

  const searchTagsRequest = (search) => {
    return dispatch({
      type: 'SEARCH_TAGS_REQUEST',
      searchTags: search,
    })
  }


  const handleClickTagsInput = () => {
    document.getElementById("input-create-focus-suggest").focus();
  }

  const handleClose = () => {
    setShowPopup(false)
  }

  const handleCheckSubmit = async () => {
    // if (!validate()) return;
    // await handleSubmitCreateNode(formData);
    // setShowPopup(false);
    // await clearFields();

  }
  // case: check validate that have no element input
  const validate = () => {
    let flag = true;
    if (formData.tags.length === 0) {
      flag = false
    }
    setIsShowError({ ...isShowError, tags: !flag })
    return flag
  }


  const onSubmit = async (values) => {
    if (!validate()) return

    let formDataNode = {
      title: values.title,
      description: values.description,
      tags: formData.tags,
    }
    if (isEditNode) {
      await handleSubmitEditNode(formDataNode);
    } else {
      await handleSubmitCreateNode(formDataNode);
    }
    setShowPopup(false);
    await clearFields();
    // let tag_object = formData.tags.map(item => item.substr(1))
    // const bodyformData = new FormData()
    // bodyformData.append("Title", values.title)
    // bodyformData.append("Description", values.description)
    // bodyformData.append("Tags", tag_object.join(','))
    // bodyformData.append("Privacy", parseInt(formData.privacy))
    // bodyformData.append("Category", formData.subCategory)
    // bodyformData.append("Thumbnail", formData.thumbnail)
    // const onSuccess = () => {
    //   handleClose();
    //   if (matchMyMap && matchMyMap.isExact) {
    //     dispatch({ type: GET_ALL_BY_CUSTOMER_REQUEST })
    //   }
    //   if (matchDashboard && matchDashboard.isExact) {
    //     dispatch({ type: GET_ALL_MAP_REQUEST })
    //   }
    //   if (matchMyProfile && matchMyProfile.isExact) {
    //     const customer = JSON.parse(localStorage.getItem('customer'));
    //     if (!customer || !customer.customerId) {
    //       toast.error('Id not found');
    //     } else {
    //       dispatch({
    //         type: HANDLE_GET_INFO_REQUEST,
    //         profileId: customer.customerId
    //       })
    //     }
    //   }
    // }
    // dispatch({ type: CREATE_MAP_REQUEST, payload: bodyformData, onSuccess })
  }
  const handleOnTextDelayed = _.debounce((search) => searchTagsRequest(search), 1000)


  const AutoSuggestRenderInput = useCallback(({ addTag, ...props }) => {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        // e.persist();
        handleOnTextDelayed(newValue)
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = searchTags.length !== 0 ? searchTags.filter((state) => {
      return state.tagName.toLowerCase().slice(0, inputLength) === inputValue
    }) : []

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.tagName}
        renderSuggestion={(suggestion) => <span>{suggestion.tagName}</span>}
        inputProps={{ ...props, onChange: handleOnChange, id: `input-create-focus-suggest` }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion.tagName)
        }}
        theme={themeAutosuggest}
        onSuggestionsClearRequested={() => { }}
        onSuggestionsFetchRequested={() => { }}
      />
    )
  }, [searchTags])
  return (
    <>
      <Dialog
        open={showPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.container }}
      >
        <Hidden smUp><CloseIcon onClick={handleClose} className={classes.icClose} /></Hidden>
        <DialogContent classes={{ root: classes.containerBody }}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            classes={{ root: classes.layoutLogin }}
          >
            <form
              className={classes.formLogin}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Inputs
                title="Node Title*"
                placeholder="Plant Taxonomy"
                defaultValue={formData.title}
                name="title"
                register={register}
                placeholderDark
                required={true}
                fontBig
                errors={errors}
              />

              <Text size="medium" classes={{ root: classes.label }}>Node Tags</Text>

              <Grid classes={{ root: classes.containerTags }} onClick={handleClickTagsInput}>
                <TagsInput
                  onlyUnique={true}
                  maxTags={5}
                  ref={tagInput}
                  tagProps={{
                    className: classes.reactTagsinputTag,
                  }}
                  inputProps={{
                    className: classes.tags,
                  }}
                  className={classes.tagsinput}
                  value={formData.tags}
                  onChange={handleChangeTags}
                  addKeys={[9, 13, 32, 188, 190]}
                  renderInput={AutoSuggestRenderInput}
                />
                {isShowError.tags && <Typography classes={{ root: classes.textError }}>{'Tags cannot be empty'}</Typography>}
              </Grid>
              <Inputs
                title="Node Description"
                placeholder="Type something"
                name="description"
                defaultValue={formData.description}
                register={register}
                required={true}
                fontBig
                placeholderDark
                errors={errors}
                rows={3}
                multiline={true}
              />
              <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
                <Buttons btnType="large" onClick={handleCheckSubmit}>Submit</Buttons>
              </Grid>
            </form>
          </Grid>

        </DialogContent>
      </Dialog>
    </>
  )
});

export default Popup;
