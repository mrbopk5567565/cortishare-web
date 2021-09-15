import React from 'react';
import {
  Grid,
  Dialog,
  DialogContent
} from '@material-ui/core';
import useStyles from './styles';
import { Text, Buttons } from 'components';
import clsx from 'clsx';
import { useSelector } from 'react-redux';


export default function DialogConfirmDeleteNode({ open, onClose, isDeleteNodeBelongOtherMap, handleDeleteNode, handleCloseConfirmDeleteNode }) {
  const classes = useStyles()
  const isLoading = useSelector((state) => state.global.isLoading)
  console.log('isDeleteNodeBelongOtherMap:', isDeleteNodeBelongOtherMap);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paperDialog }}
    >
      <DialogContent classes={{ root: classes.containerText }}>
        <Text size="large">Are you sure?</Text>
        <Grid container justify="center" direction="column" alignItems="center" classes={{ root: classes.containerText }}>
        {/* <Text classes={{ root: classes.title }}>Are you sure you want to delete this node?</Text> */}
        {isDeleteNodeBelongOtherMap ?
          'This cannot be undone. You will remove this added node from your Board.'
          :
          'This cannot be undone. Associated posts will be transferred to a higher node.'
        }
      </Grid>
      </DialogContent> 
      
      <Grid container justify="center" classes={{ root: classes.containerButton }}>
        <Buttons onClick={handleCloseConfirmDeleteNode} btnType='medium' classes={{ root: classes.buttons }} >
          No
        </Buttons>
        <Buttons onClick={handleDeleteNode} disabled={isLoading} btnType='medium' classes={{ root: clsx(classes.buttons, classes.buttonDelete) }}>
          Yes
        </Buttons>
      </Grid>
    </Dialog>
  );
}