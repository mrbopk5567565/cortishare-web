import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Box,
} from '@material-ui/core';
import useStyles, { themeAutosuggest } from './styles';
import { useForm } from "react-hook-form"
import Images from 'config/images'
import { useDispatch, connect, useSelector } from 'react-redux';
// import { IS_HELPERS } from 'redux/reducers/authentication/actionTypes'
import { Buttons, Text, Inputs } from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css';
import CloseIcon from '@material-ui/icons/Close';
import { GET_CATEGORY_REQUEST } from 'redux/reducers/category/actionTypes';
import { CREATE_MAP_REQUEST, SEARCH_TAGS_REQUEST } from 'redux/reducers/map/actionTypes'
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import { Loading } from 'components'
import { isMobile } from 'helpers'
import { mixPanel } from 'services/mixpanel';
import { EventPage } from 'constants/mixpanel';

const mapStateToProps = (state) => {
  return {
    category: state.category.categories,
  };
};

const CreateMap = ({ openCreateMap, handleClose, category, idToAdd }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { handleSubmit, register, errors, control, setError } = useForm();
  const searchTags = useSelector((state) => state.map.searchTags)
  const matchMyMap = useRouteMatch('/board');
  const matchDashboard = useRouteMatch('/');
  const matchMyProfile = useRouteMatch('/profile');
  const isLoading = useSelector((state) => state.global.isLoading)
  const refTag = useRef(null);

  useEffect(() => {
    dispatch({
      type: GET_CATEGORY_REQUEST
    })
  }, [])
  // const [selectcategory, setSelectCategory] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    description: '',
    thumbnail: '',
    privacy: '1',
    preview: '',
    category: "",
    subCategory: "",
    nameFile: "",
  })
  const [subCategory, setSubCategory] = useState([]);
  const [isShowError, setIsShowError] = useState({
    // uploadImg: false,
    tags: false,
    tagsLength: false,
    tag: false,
    tagLength: false,
  });

  useEffect(() => {
    setFormData({ ...formData, subCategory: "" })
    let object = category.filter((item) => { return item.id == formData.category })
    if (!object[0]) return
    if (object[0].subCategories && object[0].subCategories.length !== 0) {
      setSubCategory(object[0].subCategories)
    } else {
      setSubCategory(object)
    }
  }, [formData.category])

  const Primary = {
    'Public': '1',
    'Closed': '2',
    'Private': '3',
  }

  const handleSetError = ({ name, error }) => {
    setError(name, {
      message: error
    });
  }

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
    bodyformData.append("Title", values.title)
    bodyformData.append("Description", values.description)
    bodyformData.append("Tags", tag_object)
    bodyformData.append("Privacy", parseInt(formData.privacy))
    bodyformData.append("Category", formData.subCategory)
    bodyformData.append("Thumbnail", formData.thumbnail)
    const onSuccess = ({ mapId, rootNodeId }) => {
      handleClose();
      history.push(`/board/${mapId}`)

      //mixPanel
      mixPanel.track(EventPage.CreateBoard)

      // if (matchMyMap && matchMyMap.isExact) {
      //   dispatch({ type: GET_ALL_BY_CUSTOMER_REQUEST })
      // }
      // if (matchDashboard && matchDashboard.isExact) {
      //   dispatch({ type: GET_ALL_MAP_REQUEST })
      // }
      // if (matchMyProfile && matchMyProfile.isExact) {
      //   const customer = JSON.parse(localStorage.getItem('customer'));
      //   if (!customer || !customer.customerId) {
      //     toast.error('Id not found');
      //   } else {
      //     dispatch({
      //       type: HANDLE_GET_INFO_REQUEST,
      //       profileId: customer.customerId
      //     })
      //   }
      // }
      // history.push(`/board/${mapId}`)
    }
    const onFailure = () => {
    }
    dispatch({ type: CREATE_MAP_REQUEST, payload: bodyformData, onSuccess, onFailure })
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
    formValidate = { ...formValidate, tag: false, tagsLength: false, tagLength: false }
    setIsShowError(formValidate)
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

  const handleClickTagsInput = () => {
    document.getElementById("input-create-focus-suggest").focus();
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

    const replaceAll = (string, search, replace) => {
      return string.split(search).join(replace);
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
          id: `input-create-focus-suggest`
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
          tagProps={{
            className: classes.reactTagsinputTag,
          }}
          ref={refTag}
          inputProps={{
            className: classes.tags,
            placeholder: 'Tags',
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
            tagProps={{
              className: classes.reactTagsinputTag,
            }}
            ref={refTag}
            inputProps={{
              className: classes.tags,
              placeholder: 'Tags',
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
      open={openCreateMap}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      <DialogContent classes={{ root: classes.containerBody }}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
          classes={{ root: classes.layoutLogin }}
        >
          <Grid container>
            <div className={classes.containerHeader}>
              <span className={classes.HeaderTitle}>Create Board</span>
              <CloseIcon onClick={handleClose} className={classes.icClose} />
            </div>
          </Grid>

          <Grid container alignItems="center" justify="center" direction="column" classes={{ root: classes.layoutContainer }}>
            <form
              className={classes.formLogin}
              onSubmit={handleSubmit(onSubmit)}
            >
              {isLoading && <Loading />}
              <Inputs
                title="Board Title*"
                placeholder="Plant Taxonomy"
                name="title"
                register={register}
                maximum={40}
                handleSetError={handleSetError}
                placeholderDark
                required={true}
                fontBig
                errors={errors}
              />
              <Text size="medium" classes={{ root: classes.label }}>Category</Text>
              <FormControl classes={{ root: classes.rootFormControl }}>
                <select
                  name="category"
                  onChange={handleChange}
                  ref={register({
                    required: 'Please choose category',
                  })}
                  className={classes.rootSelect}
                  defaultValue={""}
                >
                  <option value="" disabled hidden>Select category</option>
                  {category && category.map((item, index) => (
                    <option value={`${item.id}`} key={index}> {item.name} </option>
                  ))}
                </select>
                {/* <Select
                  name="category"
                  onChange={handleChange}
                  // register={register}
                  // value={selectcategory}
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "category",
                        value: ref.value,
                      });
                    },
                  }}
                  disableUnderline
                  IconComponent={() => (
                    <ExpandMoreIcon />
                  )}
                  classes={{ root: classes.rootSelect }}
                  value={formData.category}>
                  {category && category.map((item, index) => (
                    <MenuItem value={item.id} key={index}> {item.name} </MenuItem>
                  ))}
                </Select> */}
                {errors[`category`] && errors[`category`].type === 'required' && <Text classes={{ root: classes.textError }}>{errors[`category`].message}</Text>}
              </FormControl>

              <Text size="medium" classes={{ root: classes.label }}>Sub-Category</Text>
              <FormControl classes={{ root: classes.rootFormControl }}>
                <select
                  name="subCategory"
                  onChange={handleChange}
                  ref={register({
                    required: 'Please choose sub-category',
                  })}
                  className={classes.rootSelect}
                  defaultValue={""}
                >
                  <option value="" disabled hidden>Select sub-category</option>
                  {subCategory && subCategory.map((item, index) => (
                    <option value={`${item.id}`} key={index}> {item.name} </option>
                  ))}
                </select>
                {errors[`subCategory`] && errors[`subCategory`].type === 'required' && <Text classes={{ root: classes.textError }}>{errors[`subCategory`].message}</Text>}
              </FormControl>

              <Text size="medium" classes={{ root: classes.label }}>Tags</Text>

              <Grid classes={{ root: classes.containerTags }} onClick={handleClickTagsInput}>
                {renderTagsInoutByDivide()}
                {/* <TagsInput
                  onlyUnique={true}
                  maxTags={6}
                  tagProps={{
                    className: classes.reactTagsinputTag,
                  }}
                  ref={refTag}
                  inputProps={{
                    className: classes.tags,
                    placeholder: 'Tags',
                  }}
                  className={classes.tagsinput}
                  value={formData.tags}
                  onChange={handleChangeTags}
                  addKeys={[9, 13, 32, 188]}
                  renderInput={AutoSuggestRenderInput}
                /> */}
                {isShowError.tags && <Text classes={{ root: classes.textError }}>{'Your Tags cannot be empty'}</Text>}
                {isShowError.tag && <Text classes={{ root: classes.textError }}>{`Your Tags cannot contain special characters (,./!?"#%+-_=^*|":<>[\]{}()\'\`;@&$)`}</Text>}
                {isShowError.tagsLength && <Text classes={{ root: classes.textError }}>{`Maximum 6 tags`}</Text>}
                {isShowError.tagLength && <Text classes={{ root: classes.textError }}>{`Your Tags field is less than 20 characters long `}</Text>}
              </Grid>
              <Inputs
                title="Description"
                placeholder="Type something"
                name="description"
                register={register}
                required={true}
                handleSetError={handleSetError}
                fontBig
                placeholderDark
                errors={errors}
                rows={3}
                multiline={true}
                maximum={1500}
              />
              <Text size="medium" classes={{ root: classes.label }}>Upload Featured Image</Text>
              <input type="file" id="upload-file" name="Thumbnail" onChange={handleUploadClick} accept=".jpg, .jpeg, .png, .gif" />
              <Grid container direction="row" alignItems="center">
                <label htmlFor="upload-file" className={classes.labelUpload}>
                  <Text classes={{ root: classes.upload }}>Select photo</Text>
                  {/* <Text size="medium">{formData.Thumbnail && formData.Thumbnail.split('\\')[formData.Thumbnail.split('\\').length - 1]}</Text> */}
                </label>
                <Text classes={{ root: classes.nameUpload }}>{formData.nameFile}</Text>
              </Grid>

              {formData.preview !== '' && (<Grid item xs classes={{ root: classes.gridItem }}>
                <img src={formData.preview} alt="" className={classes.imagePreview} width="100%" height="100%" />
              </Grid>)
              }
              {/* {isShowError.uploadImg && <Text classes={{ root: classes.textError }}>{'Image cannot be empty'}</Text>} */}

              <Box mt={4} mb={2}>
                <Text size="medium" classes={{ root: classes.label }}>Privacy
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
              <RadioGroup name="privacy" value={formData.privacy} onChange={handleChange} classes={{ root: classes.radioGroup }}>
                <FormControlLabel value={Primary.Public} control={<Radio />} label="Public" />
                <FormControlLabel value={Primary.Closed} control={<Radio />} label="Closed" />
                <FormControlLabel value={Primary.Private} control={<Radio />} label="Private" />
              </RadioGroup>
              <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
                <Buttons disabled={isLoading} btnType="large" onClick={handleCheckSubmit}>Create</Buttons>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog >
  );
}

export default connect(mapStateToProps)(CreateMap);