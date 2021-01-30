import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Tooltip } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function BanUserDialog({data, onConfirm, disabled}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleConfirm = async () => {
    await onConfirm(data);
    handleClose();
  };
  return (
    <div>
      <Tooltip title={data.banned ? "Unban" : "Ban"} aria-label="ban">
        <IconButton disabled={open || disabled} onClick={handleClickOpen} aria-label="ban">
          { !data.banned ?
            <RemoveCircleIcon color={open || disabled ? "disabled" : "primary"} style={{ fontSize: 28 }} />
            :
            <CheckCircleIcon color={open || disabled ? "disabled" : "secondary"} style={{ fontSize: 28 }} />
          }
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Please confirm:
        </DialogTitle>
        <DialogContent dividers>
          {
            data.banned ? `Do you really want to unban user ${data.username}.` : `Do you really want to ban user ${data.username}.`
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirm}
          color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
