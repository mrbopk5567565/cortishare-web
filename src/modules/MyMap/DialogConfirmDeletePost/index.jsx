import React from 'react';
import {
  Grid,
  Dialog
} from '@material-ui/core';
import useStyles from './styles';
import { Text, Buttons } from 'components';
import clsx from 'clsx';
import { useSelector } from 'react-redux';


export default function DialogConfirmDeletePost({ open, onClose, confirm, isPostOwner }) {
  const classes = useStyles()
  const isLoading = useSelector((state) => state.global.isLoading)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.paperDialog }}
      onClick={(e) => e.stopPropagation()}
    >
      <Grid container justify="center" direction="column" alignItems="center" classes={{ root: classes.containerText }}>
        {isPostOwner ? 
          <>
            <Text classes={{ root: classes.title }}>Are you sure you want to delete this post?</Text>
            <Text classes={{ root: classes.description }}>This cannot be undone.</Text>
          </>
        : <>
            <Text classes={{ root: classes.title }}>Are you sure you want to unlink this post?</Text>
            <Text classes={{ root: classes.description }}>The original post will not be deleted.</Text>
          </>
        }
      </Grid>
      <Grid container justify="center" classes={{ root: classes.containerButton }}>
        <Buttons onClick={onClose} btnType='medium' classes={{ root: classes.buttons }} >
          No
          </Buttons>
        <Buttons onClick={confirm} disabled={isLoading} btnType='medium' classes={{ root: clsx(classes.buttons, classes.buttonDelete) }}>
          Yes
          </Buttons>
      </Grid>
    </Dialog>
  );
}
