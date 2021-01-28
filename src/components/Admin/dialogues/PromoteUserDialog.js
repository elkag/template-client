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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
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

export default function PromoteUserDialog({data, onConfirm, disabled}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleConfirm = async () => {
    const dataSent = await onConfirm(data);
    handleClose();
  };
  return (
    <div>
      <Tooltip title={data.isAdmin ? "Demote" : "Promote"} aria-label="promote">
        <IconButton disabled={open || disabled} onClick={handleClickOpen} aria-label="promote">
          { data.isAdmin ?
            <ArrowDownward color={open || disabled ? "disabled" : "primary"} style={{ fontSize: 28 }} />
            :
            <ArrowUpward color={open || disabled ? "disabled" : "secondary"} style={{ fontSize: 28 }} />
          }
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Please confirm:
        </DialogTitle>
        <DialogContent dividers>
          {
            data.isAdmin ? `Do you really want to demote user ${data.username} "Author".` : `Do you really want to promote user ${data.username} to "Administrator".`
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
