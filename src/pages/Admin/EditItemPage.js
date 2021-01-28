import React from 'react';
// context
import { UserContext } from '../../contexts/userContext';
//components

import { makeStyles, Paper } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { bgColor } from '../../styles/colors';
import HorizontalLinearStepper from '../../components/Admin/Stepper';
import { Redirect } from 'react-router-dom';
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
        textAlign: 'center',
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

const EditItemView = ({item, page}) => {
  
    const [session] = React.useContext(UserContext);
    
    const classes = useStyles(makeStyles);

    const render = () => {
        if(session && session.loading) {
            return null;
        }
        if(session && session.user) {
            return <div className={classes.pageWrapper}>
                        <Paper className={classes.container} elevation={2}>
                            <HorizontalLinearStepper item={item} page={page} />
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