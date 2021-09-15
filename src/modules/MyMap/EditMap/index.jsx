import React, { useState, memo, useEffect, useCallback, useRef } from 'react';
import { Dialog, DialogContent, Grid, Hidden, Box, FormControl, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Tooltip } from '@material-ui/core';
import useStyles, { themeAutosuggest } from './styles';
import { useForm, Controller } from "react-hook-form"
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
import { Buttons, Text, Inputs } from 'components'
import CloseIcon from '@material-ui/icons/Close';
import { PanoramaVertical } from '@material-ui/icons';
import TagsInput from 'react-tagsinput'
import { UPDATE_MAP_REQUEST, GET_ALL_BY_CUSTOMER_REQUEST, GET_POSTS_BY_MAP_ID_REQUEST, SEARCH_TAGS_REQUEST } from 'redux/reducers/map/actionTypes'
import { GET_ALL_MAP_REQUEST } from 'redux/reducers/home/actionTypes'
import { HANDLE_GET_INFO_REQUEST } from 'redux/reducers/profile/actionTypes';
import { toast } from 'react-toastify';
import { useRouteMatch } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import { isMobile } from 'helpers'

const mapStateToProps = (state) => {
  return {
    category: state.category.categories,
    mapUpdate: state.map.mapUpdate
  };
};

const EditMap = memo(({ category, mapUpdate, showPopupEdit, handleClosePopup }) => {
  const matchMyMap = useRouteMatch('/board');
  const matchDashboard = useRouteMatch('/');
  const matchMindMapDetail = useRouteMatch('/board/:mapId');
  const matchMyProfile = useRouteMatch('/profile');
  const matchLinkingMinds = useRouteMatch('/search/linking-minds');
  const { handleSubmit, register, errors, setError } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const refTag = useRef(null);
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: "",
    createdBy: "",
    creationTime: "",
    customerId: "",
    description: "",
    followerCount: "",
    id: "",
    lastModificationTime: "",
    mapCollaboratorCount: "",
    mapUUId: "",
    privacy: "",
    privacyName: "",
    spaceUsage: "",
    tags: [],
    thumbnail: "",
    title: "",
    subCategoryId: "",
    nameFile: null,
    thumbnailFileName: "",
  });
  const [isShowError, setIsShowError] = useState({
    uploadImg: false,
    tags: false,
    tagsLength: false,
    tag: false,
    tagLength: false,
  });
  const searchTags = useSelector((state) => state.map.searchTags)
  const [subCategory, setSubCategory] = useState([]);
  const isLoading = useSelector((state) => state.global.isLoading)
  const { page, size } = useSelector((state) => state.profile)

  const Primary = {
    'Public': '1',
    'Closed': '2',
    'Private': '3',
  }

  useEffect(() => {
    dispatch({ type: 'GET_CATEGORY_REQUEST' });
  }, [])

  useEffect(() => {
    if (!category || !formData.categoryId) return;
    let object = category.filter((item) => { return item.id == formData.categoryId })
    if (!object[0]) return;
    if (object[0].subCategories && object[0].subCategories.length !== 0) {
      setSubCategory(object[0].subCategories)
    } else {
      setSubCategory(object)
    }
  }, [category, formData.categoryId])

  useEffect(() => {
    if (mapUpdate != null && Object.keys(mapUpdate).length !== 0) {
      console.log('mapUpdate', mapUpdate)
      mapUpdate.privacy = mapUpdate.privacy.toString()
      setFormData(mapUpdate)
    }
  }, [mapUpdate])

  const onSubmit = values => {
    if (!validate()) return
    let tag_object
    if (formData.tags.length === 0) {
      tag_object = null
    } else {
      tag_object = formData.tags.map(item => item.substr(1))
      tag_object.join(',')
    }
    const bodyformData = new FormData()
    bodyformData.append("MapId", formData.id)
    bodyformData.append("Title", values.title)
    bodyformData.append("Description", values.description)
    bodyformData.append("Tags", tag_object)
    bodyformData.append("Privacy", parseInt(formData.privacy))
    bodyformData.append("Category", formData.subCategoryId || formData.categoryId)
    bodyformData.append("Thumbnail", formData.thumbnail)
    // bodyformData.append("Preview", formData.preview)
    const onSuccess = () => {
      handleClosePopup();
      if (matchMyMap && matchMyMap.isExact) {
        dispatch({ type: GET_ALL_BY_CUSTOMER_REQUEST })
      }
      if (matchDashboard && matchDashboard.isExact) {
        dispatch({ type: GET_ALL_MAP_REQUEST })
      }
      if (matchMindMapDetail && matchMindMapDetail.isExact) {
        dispatch({
          type: GET_POSTS_BY_MAP_ID_REQUEST,
          payload: { mapId: matchMindMapDetail.params.mapId },
          isAllowLoadMindmap: true,
        })
      }
      if (matchMyProfile && matchMyProfile.isExact) {
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (!customer || !customer.customerId) {
          toast.error('Id not found');
        } else {
          dispatch({
            type: HANDLE_GET_INFO_REQUEST,
            payload: {
              customerId: customer.customerId,
              page: 1,
              size: page * size,
            },
          })
        }
      }
      if (matchLinkingMinds?.isExact) {
        const object = {
          title: bodyformData.get('Title'),
          privacy: bodyformData.get('Privacy'),
          thumbnail: bodyformData.get('Thumbnail'),
          preview: bodyformData.get('Preview'),
          mapId: bodyformData.get('MapId'),
        }
        dispatch({
          type: 'UPDATE_MAP_LINKINGMIND',
          payload: object
        })
      }
    }
    dispatch({ type: UPDATE_MAP_REQUEST, payload: bodyformData, onSuccess })
  }

  const handleChangeTags = (tags) => {
    let formValidate = { ...isShowError }
    if (tags && tags.length !== 0) {
      formValidate = { ...formValidate, tags: false }
      refTag.current.input.input.placeholder = ''
    } else {
      formValidate = { ...formValidate, tags: true }
      refTag.current.input.input.placeholder = 'Tags'
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
    formValidate = { ...formValidate, tag: false, tagsLength: false, tagLength: false, }
    setIsShowError(formValidate)
  }

  const handleUploadClick = event => {
    var arrPreview = URL.createObjectURL(event.target.files[0]);
    var arrUpload = event.target.files[0];
    setFormData({
      ...formData,
      thumbnail: arrUpload,
      preview: arrPreview,
      nameFile: arrUpload.name
    })
    // setIsShowError({ ...isShowError, uploadImg: false })
  }
  const handleSelectCategory = (id) => {
    let id_category;
    let object = category.filter((item) => { return item.id == id })
    if (object.length === 0) return;
    if (object?.[0]?.subCategories.length > 0) {
      id_category = object?.[0]?.subCategories?.[0]?.id;
    }
    else {
      id_category = id
    }
    setFormData({
      ...formData,
      subCategoryId: id_category
    })
  }
  const handleChange = e => {
    if (e.target.name === 'categoryId') {
      handleSelectCategory(e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // case: show validate that not use component inputs
  const handleCheckSubmit = () => {
    // let formValidate = { ...isShowError }
    // if (formData.tags.length === 0) {
    //   formValidate = { ...formValidate, tags: true }
    // } else {
    //   formValidate = { ...formValidate, tags: false }
    // }
    // if (formData.thumbnail === '') {
    //   formValidate = { ...formValidate, uploadImg: true }
    // } else {
    //   formValidate = { ...formValidate, uploadImg: false }
    // }
    // setIsShowError(formValidate)
  }

  // case: check validate that not use component inputs
  const validate = () => {
    let flag = true;
    // if (formData.tags.length === 0) {
    //   return flag = false
    // }
    // if (formData.thumbnail === '') {
    //   return flag = false
    // }
    return flag
  }


  const handleSetError = ({ name, error }) => {
    setError(name, {
      message: error
    });
  }

  const handleClickTagsInput = () => {
    document.getElementById("input-edit-focus-suggest").focus();
  }

  const searchTagsRequest = (search) => {
    return dispatch({
      type: SEARCH_TAGS_REQUEST,
      searchTags: search,
    })
  }

  const handleOnTextDelayed = _.debounce((search) => searchTagsRequest(search), 1000)
  // const handleOnTextDelayed = useRef(_.debounce((search) => searchTagsRequest(search), 1000)).current

  const AutoSuggestRenderInput = useCallback(({ addTag, ...props }) => {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        if (formData.tags.length >= 6) {
          setIsShowError({ ...isShowError, tagsLength: true, tagLength: false, tag: false, tags: false })
          return
        }

        // check tag limit 20 characters
        if (newValue.length > 20 || e.target.value.length > 20) {
          setIsShowError({ ...isShowError, tagLength: true, tag: false, tags: false, tagsLength: false })
          return
        } else {
          setIsShowError({ ...isShowError, tagLength: false })
        }

        // case: copy
        // e.target.value = e.target.value.replaceAll(" ", "")

        // case: check specials character
        // e.target.value = e.target.value.replace(/[^\p{L}\d\w]+/g, "")
        e.target.value = e.target.value.replace(/[ ^`\t!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, "")

        // e.persist();
        handleOnTextDelayed(newValue)
        props.onChange(e)
      }
    }

    const onKeyPress = (event) => {
      if (formData.tags.length >= 6) return
      var regex = new RegExp("^[a-zA-Z0-9]*$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        setIsShowError({ ...isShowError, tag: true, tagLength: false, tags: false, tagsLength: false })
        return false;
      } else {
        setIsShowError({ ...isShowError, tag: false })
      }
    }

    const onBlur = (e) => {
      setIsShowError({
        ...isShowError,
        tag: false,
        tagsLength: false,
        tagLength: false,
      })
      addTag(e.target.value)
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
        inputProps={{
          ...props,
          onChange: handleOnChange,
          onKeyPress: onKeyPress,
          onBlur: onBlur,
          id: `input-edit-focus-suggest`,
        }}
        onSuggestionSelected={(e, { suggestion }) => {
          if (suggestion.tagName.length <= 20) {
            addTag(suggestion.tagName)
          }
        }}
        theme={themeAutosuggest}
        onSuggestionsClearRequested={() => { }}
        onSuggestionsFetchRequested={() => { }}
      />
    )
  }, [searchTags, formData.tags])

  const renderTagsInoutByDivide = () => {
    if (!isMobile()) {
      return (
        <TagsInput
          onlyUnique={true}
          maxTags={6}
          ref={refTag}
          tagProps={{
            className: classes.reactTagsinputTag,
          }}
          name="tags"
          inputProps={{
            className: classes.tags,
            placeholder: '',
          }}
          className={classes.tagsinput}
          value={formData.tags}
          onChange={handleChangeTags}
          addKeys={[9, 13, 32, 188]}
          renderInput={AutoSuggestRenderInput}
        />
      )
    } else {
      return (
        <form>
          <TagsInput
            onlyUnique={true}
            maxTags={6}
            ref={refTag}
            tagProps={{
              className: classes.reactTagsinputTag,
            }}
            name="tags"
            inputProps={{
              className: classes.tags,
              placeholder: '',
            }}
            className={classes.tagsinput}
            value={formData.tags}
            onChange={handleChangeTags}
            addKeys={[9, 13, 32, 188]}
            renderInput={AutoSuggestRenderInput}
          />
        </form>
      )
    }
  }

  return (
    <Dialog
      open={showPopupEdit}
      onClose={handleClosePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      <DialogContent classes={{ root: classes.containerBody }}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="center"
          classes={{ root: classes.layoutLogin }}
        >
          <Grid container>
            <div className={classes.containerHeader}>
              <span className={classes.HeaderTitle}>Edit Board</span>
              <CloseIcon onClick={handleClosePopup} className={classes.icClose} />
            </div>
          </Grid>

          <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
            <form
              className={classes.formLogin}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Inputs
                title="Board Title*"
                placeholder="Plant Taxonomy"
                name="title"
                maximum={40}
                handleSetError={handleSetError}
                defaultValue={formData.title}
                placeholderDark
                register={register}
                fontBig
                required={true}
                errors={errors}
                multiline={true}
              />
              <Text size="medium" classes={{ root: classes.label }}>Category</Text>
              <FormControl classes={{ root: classes.rootFormControl }}>
                <select
                  name="categoryId"
                  onChange={handleChange}
                  ref={register({
                    required: 'Please choose category',
                  })}
                  value={formData.categoryId}
                  className={classes.rootSelect}
                >
                  <option value="" disabled hidden>Select category</option>
                  {category && category.map((item, index) => (
                    <option value={`${item.id}`} key={index}> {item.name} </option>
                  ))}
                </select>
                {errors[`categoryId`] && errors[`categoryId`].type === 'required' && <Text classes={{ root: classes.textError }}>{errors[`categoryId`].message}</Text>}
              </FormControl>

              <Text size="medium" classes={{ root: classes.label }}>Sub-Category</Text>
              <FormControl classes={{ root: classes.rootFormControl }}>
                <select
                  name="subCategoryId"
                  onChange={handleChange}
                  value={formData.subCategoryId || formData.categoryId}
                  ref={register({
                    required: 'Please choose sub-category',
                  })}
                  className={classes.rootSelect}
                >
                  <option value="" disabled hidden>Select sub-category</option>
                  {subCategory && subCategory.map((item, index) => (
                    <option value={`${item.id}`} key={index}> {item.name} </option>
                  ))}
                </select>
                {errors[`subCategoryId`] && errors[`subCategoryId`].type === 'required' && <Text classes={{ root: classes.textError }}>{errors[`subCategoryId`].message}</Text>}
              </FormControl>
              <Text size="medium" classes={{ root: classes.label }}>Tags</Text>
              <Grid classes={{ root: classes.containerTags }} onClick={handleClickTagsInput}>
                {formData.tags && renderTagsInoutByDivide()
                  // <TagsInput
                  //   onlyUnique={true}
                  //   maxTags={6}
                  //   ref={refTag}
                  //   tagProps={{
                  //     className: classes.reactTagsinputTag,
                  //   }}
                  //   name="tags"
                  //   inputProps={{
                  //     className: classes.tags,
                  //     placeholder: '',
                  //   }}
                  //   className={classes.tagsinput}
                  //   value={formData.tags}
                  //   onChange={handleChangeTags}
                  //   addKeys={[9, 13, 32, 188]}
                  //   renderInput={AutoSuggestRenderInput}
                  // />
                }
                {isShowError.tags && <Text classes={{ root: classes.textError }}>{'Tags cannot be empty'}</Text>}
                {isShowError.tag && <Text classes={{ root: classes.textError }}>{`Tag cannot contain special characters (,./!?"#%+-_=^*|":<>[\]{}()\'\`;@&$)`}</Text>}
                {isShowError.tagsLength && <Text classes={{ root: classes.textError }}>{`Maximum 6 tags`}</Text>}
                {isShowError.tagLength && <Text classes={{ root: classes.textError }}>{`Your Tags field is less than 20 characters long`}</Text>}
              </Grid>
              <Inputs
                title="Description"
                placeholder="Type something"
                name="description"
                placeholderDark
                register={register}
                required={true}
                defaultValue={formData.description}
                errors={errors}
                fontBig
                rows={3}
                multiline={true}
                maximum={1500}
                handleSetError={handleSetError}
              />
              <Text size="medium">Upload Featured Image</Text>
              <input type="file" id="upload-file" value={formData.photo} name="photo" onChange={handleUploadClick} accept=".jpg, .jpeg, .png, .gif" />
              <Grid container direction="row" alignItems="center">
                <label htmlFor="upload-file" className={classes.labelUpload}>
                  <Text classes={{ root: classes.upload }}>Select photo</Text>
                </label>
                <Text classes={{ root: classes.nameUpload }}>{formData.nameFile ? formData.nameFile : formData.thumbnailFileName}</Text>
              </Grid>

              {formData.thumbnail &&
                <img className={classes.imagePreview} src={formData.preview ? formData.preview : formData.thumbnail} alt="img-upload" />
              }
              {/* {isShowError.uploadImg && <Text classes={{ root: classes.textError }}>{'Image cannot be empty'}</Text>} */}
              <Box mt={4} mb={2}>
                <Text size="medium">Privacy
                  <Tooltip enterDelay={100} enterTouchDelay={100} classes={{ tooltip: classes.rootTooltip }} title={
                    <Grid classes={{ root: classes.containerTooltip }}>
                      <Text size="mini">Private: Unlisted and not searchable. Only added collaborators can view. Use this for personal notes and content.</Text>
                      <Text size="mini">Closed: Listed and searchable. Only approved subscribers and collaborators can view. Use this for exclusive content.</Text>
                      <Text size="mini">Public: Listed and searchable. Anyone can view. Use this for maps with open content.</Text>
                    </Grid>
                  }>
                    <img src={Images.icInformationCircle} alt="" />
                  </Tooltip>
                </Text>
              </Box>

              <RadioGroup aria-label="gender" name="privacy" value={formData.privacy} onChange={handleChange} classes={{ root: classes.radioGroup }}>
                <FormControlLabel value={Primary.Public} control={<Radio />} label="Public" />
                <FormControlLabel value={Primary.Closed} control={<Radio />} label="Closed" />
                <FormControlLabel value={Primary.Private} control={<Radio />} label="Private" />
              </RadioGroup>

              <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
                <Buttons btnType="large" disabled={isLoading} onClick={handleCheckSubmit}>Save</Buttons>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});

export default connect(mapStateToProps)(EditMap);