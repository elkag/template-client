import React, { Fragment } from 'react';
// context
import { UserContext } from '../../contexts/userContext';
//components

import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '450px'
    },
    titleTF: {
        width: '400px',
        paddingBottom: '20px'
    },
    descriptioTF: {
        width: '400px',
        paddingBottom: '20px'
    },
    textTF: {
        width: '100%',
        paddingBottom: '20px'
    }
}));

const Preview = (props) => {
  
    const [session] = React.useContext(UserContext);
    const [item, setItem] = React.useState(null);
    const [error, setError] = React.useState('');
    
    const classes = useStyles(makeStyles);

    const handleError = (error) => {
        setError({ error });
    }

    return (
        <div className={classes.wrapper}>
           Preview
        </ div>
    )
}

export default Preview;