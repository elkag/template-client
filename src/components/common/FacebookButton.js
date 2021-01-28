import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    submitButton: {
      color: "white",
      textTransform: 'none',
      backgroundColor: '#4267b2',
      minWidth: 200,
      padding: 0,
      '&:hover': {
        backgroundColor: '#5776b6',
      },
    },
  }));

const FacebookButton = (props) => {

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

export default FacebookButton