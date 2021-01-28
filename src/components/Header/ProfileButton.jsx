import React from 'react';
import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
//import { UserContext } from '../../contexts/userContext';
import { deepOrange, blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    wrapper: {
        mainIconsWrapper: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'flex-start',
        textAlign: 'center',
        paddingLeft: '2%'
        }
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        fontSize: '11pt',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'white',
            color: blue[800],
          }

    },
    menu: {
        //marginTop:'100px'
    },
}
));

const ProfileButton = ({logOutHandler}) => {

    //const [context, ] = React.useContext(UserContext);
    
    const classes = useStyles(makeStyles);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(document.getElementById('menu_container'));
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const logOut = (event) => {
        logOutHandler();
        handleClose();
    }

    return (
        <div className={classes.wrapper}>
            <IconButton className={classes.avatar} onClick={ handleClick }>
               
                <div id="menu_container" className={classes.menu} />
            </IconButton>
            <div id="menu_container" className={classes.menu} />
                
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileButton;