import React from 'react';
import MessageSnackbar from './MessageSnackbar';
import PageBackdrop from './PageBackdrop';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

  const useStyles = makeStyles(theme => ({
    wrapper: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      height: '100%',
      //backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 100,
      color: blue[300],
    }
    
  }));
/**
 * 
 * @param {*} props {loading, error}, 
 */
const Loader = ({loading, error}) => {

  const classes = useStyles(makeStyles);

  const [snackbarOpen, setSnackbarOpen] = React.useState(error !== '');

  const onCloseSnackbar = () => {
    setSnackbarOpen(false);
  }

  const render = () => {
    if(loading) {
      return (
         <div className={classes.wrapper}>
            <PageBackdrop loading={loading}/>
        </div>
      )
    }

    if(error !== '' && !snackbarOpen) {
      return (
          <MessageSnackbar message={error} onClose={onCloseSnackbar}/>
      )
    }

    return null;
  }

  return (
       render()
  )
}


export default Loader;