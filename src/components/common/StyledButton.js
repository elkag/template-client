import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors/';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    submitButton: {
      color: "white",
      backgroundColor: deepOrange[400],
      minWidth: 200,
      '&:hover': {
        backgroundColor: deepOrange[600],
      },
    },
  }));

const StyledButton = (props) => {

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

export default StyledButton