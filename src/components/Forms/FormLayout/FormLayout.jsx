import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loginPageWrapper: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
    container: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        borderRadius: '5px',
        flexDirection: 'column',
        maxWidth: '400px',
        width: '80%',
        padding: 20
    }
}))

const FormLayout = (props) => {

    const classes = useStyles(makeStyles);
    
    return (
        <div className={classes.loginPageWrapper}>
            <Paper className={classes.container} elevation={2}>
                {props.children}
            </Paper>
        </div>
    )
}

export default FormLayout;