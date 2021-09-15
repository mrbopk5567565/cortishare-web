import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { useSelector } from 'react-redux';
import { Buttons, Text } from 'components'
import { SizeMe } from 'react-sizeme'
import { toast } from 'react-toastify';
import clsx from 'clsx'

const DialogAddPost = ({ formData, setFormData, openDialogAddPost, handleClose, initChangeAndSave }) => {
  const classes = useStyles();
  const [images, setImages] = useState({})
  const [numberOfImage, setNumberOfImage] = useState(0)
  const collectImages = useSelector((state) => state.node.collectImages)
  useEffect(() => {
    const imageList = collectImages && collectImages.map((element, index) => {
      let item = {}
      item.id = index
      item.checked = false
      item.url = element
      item.type = 'clientFile'
      return item
    });
    setImages(imageList)
  }, [])

  useEffect(() => {
    if(Object.keys(images).length === 0) return
    setNumberOfImage(checkMaximum())
  }, [images])

  const checkMaximum = () => {
    const count = collectImages && collectImages.reduce((sum, item, index) => {
      if(images[index].checked) return (sum + 1) 
      else return sum
    }, 0)
    return count
  }
  
  const handleChange = (event, index) => {
    if(numberOfImage < 8 || !event.target.checked) {
      setImages({ 
        ...images, 
        [event.target.name]: {
          ...images[index],
          checked: event.target.checked 
        }
      });
    } else{
      toast.success("Only up to 8 images can be selected!");
    }
  };

  const handleAdd = () => {
    const arr = []
    collectImages && collectImages.forEach((element, index) => {
      if (images[index].checked) {
        arr.push(images[index])
      }
    })
    setFormData({
      ...formData,
      upload: [...formData.upload, ...arr],
      preview: [...formData.preview, ...arr],
    })
    initChangeAndSave()
    handleClose()
  }

  //resize
  const handleResize = (width) => {
    let widthPercent = `${Math.floor(100 / 5)}%`
    let column = 5
    if (width <= 400) {
      widthPercent = '100%'
    } else if (width <= 600) {
      widthPercent = `${Math.floor(100 / 1)}%`
      column = 2
    } else if (width <= 800) {
      widthPercent = `${Math.floor(100 / (2))}%`
      column = 2
    } else if (width <= 970) {
      widthPercent = `${Math.floor(100 / (3))}%`
      column = 3
    } else if (width <= 1300) {
      widthPercent = `${Math.floor(100 / (4))}%`
      column = 3
    } else if (width <= 1500) {
      widthPercent = `${Math.floor(100 / (4))}%`
      column = 4
    }
    return {
      widthPercent,
      column
    }
  }

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  const getColumn = () => {
    return handleResize(getWidth())
  }

  return (
    <Dialog
      open={openDialogAddPost}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.container }}
    >
      <DialogContent classes={{ root: classes.containerBody }}>
        <Grid container alignItems="center" direction="column" justify="flex-start" classes={{ root: classes.layoutLogin }}>
          <Grid container alignItems="center" direction="column" justify="flex-start" classes={{ root: classes.containerBodyFile }}>
            <img src={Images.icCloseBig} alt="" className={classes.iconClose} onClick={handleClose} />
            <Text size="big">Select Featured Image</Text>
            <p className={classes.description}>Please select image(s)</p>
            <SizeMe>{({ size }) =>
              <Grid container>
                <div style={{ columnCount: getColumn().column, columnGap: '20px' }}>
                  {collectImages && collectImages.map((item, index) =>
                    <div key={index} className={classes.containerImage}>
                      <FormControlLabel
                        classes={{ root: classes.rootLabelRadio }}
                        control={<Checkbox
                          checked={images[index].checked}
                          name={index.toString()}
                          color="primary"
                          onChange={(e) => handleChange(e, index)}
                          icon={<img src={Images.icRadioButtonUnchecked} alt="" />}
                          checkedIcon={<img src={Images.icRadioButtonChecked} alt="" className={classes.imageCheck} />}
                        />}
                        label={<img src={item} alt="" className={clsx(classes.image, images[index].checked && classes.selected)} />}
                      />
                    </div>
                  )}
                </div>
              </Grid>
            }
            </SizeMe>
          </Grid>
          <Grid container item justify="flex-end" alignItems="center" classes={{ root: classes.containerButton }}>
            <Buttons btnType="large" onClick={handleAdd}>Add</Buttons>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddPost;