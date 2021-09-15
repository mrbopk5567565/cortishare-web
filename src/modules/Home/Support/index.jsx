import React from 'react';
import { Dialog } from '@material-ui/core';
import useStyles from './styles';
import DialogContent from '@material-ui/core/DialogContent';
import { Text } from 'components'

const Support = ({ openDialog, offDropdown, isClickAwayListener }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(openDialog);

  const handleClickOpen = (e) => {
    e.stopPropagation()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    offDropdown()
  };

  const handleClickDialog = (e) => {
    if (!isClickAwayListener) {
      e.stopPropagation()
    }
  }

  return (
    <>
      <Text medium="small" handleClick={handleClickOpen}>Support</Text>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.container}}
        onClick={handleClickDialog}
      >
        <DialogContent classes={{root: classes.containerText}}>
          <Text size="large">Something made you unsure?</Text>
            <Text size="medium">Don’t hesitate to drop us an email by</Text>
            <Text size="large"><span>team@neuronal.co</span></Text>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Support;