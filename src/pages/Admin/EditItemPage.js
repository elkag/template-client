import React from 'react';
// context
import { UserContext } from '../../contexts/userContext';
//components

import { makeStyles, Paper, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { bgColor } from '../../styles/colors';
import HorizontalLinearStepper from '../../components/Admin/Stepper';
import { Redirect, useParams } from 'react-router-dom';
import { LOGIN_PAGE } from '../../config/routes';

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
        textAlign: 'left',
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

const EditItemView = () => {
  
    const [session] = React.useContext(UserContext);
    const classes = useStyles(makeStyles);
    const params = useParams();
    const [, setItemName] = React.useState("");

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user) {
            return <div className={classes.pageWrapper}>
                        <Paper className={classes.container} elevation={2}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
                                {params.item && params.page ? "Edit item" : "New item"} 
                            </Typography>
                            <HorizontalLinearStepper onLoad={setItemName} />
                        </Paper>
                    </div>
        } 
        return <Redirect to={LOGIN_PAGE} />
    }

    return (
        render()
    )
}

export default EditItemView;