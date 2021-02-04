import React from 'react';
//components

import { makeStyles, Paper, Typography } from '@material-ui/core';
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
    header: {
        marginLeft: 20,
        marginTop: 20,
    },
    error: {
        width: '100%',
        textAlign: 'center',
        color: red[600],
        fontSize: "small" 
    }
}));

const ReviewItemView = ({item, page}) => {
  
    const classes = useStyles(makeStyles);
    
    return (
      <div className={classes.pageWrapper}>
                <Paper className={classes.container} elevation={2}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
                        Item preview
                    </Typography>
                    <ItemViewer item={item} page={page} />
                </Paper>
        </div>
    )
}

export default ReviewItemView;