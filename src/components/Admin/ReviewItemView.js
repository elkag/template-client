import React from 'react';
// context
import { UserContext } from '../../contexts/userContext';
//components

import { makeStyles, Paper } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { bgColor } from '../../styles/colors';
import ItemViewer from './ItemViewer';

const useStyles = makeStyles(theme => ({
    
    container: {
        minWidth: 800,
        maxWidth: 1200,
        width: '80%',
        paddingBottom: 20
    },
    pageWrapper: {
        height: 'calc(100vh - 90px)',
        paddingTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: bgColor
    },

    error: {
        width: '100%',
        textAlign: 'center',
        color: red[600],
        fontSize: "small" 
    }
}));

const ReviewItemView = ({item, page}) => {
  
    const [session] = React.useContext(UserContext);
    const [error, setError] = React.useState('');
    
    const classes = useStyles(makeStyles);

    const handleError = (error) => {
        setError({ error });
    }

    return (
      <div className={classes.pageWrapper}>
                <Paper className={classes.container} elevation={2}>
                    <ItemViewer item={item} page={page} />
                </Paper>
        </div>
    )
}

export default ReviewItemView;