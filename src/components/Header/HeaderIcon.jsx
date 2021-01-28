import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { mainGreen } from '../../styles/colors'

const useStyles = makeStyles(theme => ({
    iconWrapper: {
        paddingRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        color: mainGreen, 
        backgroundColor: '#fff',
        spaceBetween: '16px',
        '&:hover': {
            backgroundColor: '#fff'
          }
    },
    label: {
        marginTop: '10px',
        color: "#fff",
        fontSize: '9pt',
        fontWeight: 'bold',

    },
}
));

const HeaderIcon = (props) => {

    const classes = useStyles(makeStyles);

    return (
        <div className={classes.iconWrapper}>
            <IconButton className={classes.icon} onClick={props.onClick}>
                {props.children}
            </IconButton>
        </div>
    )
}

export default HeaderIcon;