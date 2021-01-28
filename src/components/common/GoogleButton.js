import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    submitButton: {
      color: "grey",
      textTransform: 'none',
      backgroundColor: 'white',
      border: 1,
      borderColor: 'grey',
      padding:0,
      minWidth: 200,
      '&:hover': {
        backgroundColor: '#f8f8f8',
      },
    },
  }));

const GoogleButton = (props) => {

    const classes = useStyles(makeStyles);
    
    return (
      <div className={classes.wrapper}>
        <Button 
                variant="contained"  
                type="submit"
                onClick={props.onClick} 
                disabled={props.disabled || props.disabled === "true"}
                data-testid='submit'
                className={classes.submitButton} >
                    {props.children}
        </Button>
      </div>
    )

}

export default GoogleButton