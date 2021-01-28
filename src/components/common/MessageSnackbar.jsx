import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: red[400],
    },
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    content: {
        alignSelf: 'center',
        paddingRight: '10px',
        paddingTop: '1px',
    },
    icon: {
        alignSelf: 'center',
        paddingTop: '4px',
    }
  }));

export default function MessageSnackbar({message, onClose}) {
  const [open, setOpen] = React.useState((message !== ''));

  const classes = useStyles(makeStyles);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onClose();
  };

  return (
    <div >
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        color="red"
        autoHideDuration={60000}
        onClose={handleClose}
        message={
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <ErrorIcon  className={classes.icon} fontSize="small" />
                </div>
              <div data-test-id="errorMessage" className={classes.content}>{message}</div>
            </div>
          }
        ContentProps={{ className: classes.error}}
        action={
          <div  className={classes.wrapper} >
            <IconButton className={classes.content} size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      >

      </Snackbar>
    </div>
  );
}
