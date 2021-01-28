import React, { Fragment } from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// Components
import ListIcon from '@material-ui/icons/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useHistory } from 'react-router-dom';
import { deleteSessionCookie } from '../../config/session';
import LeftMenu from '../LeftMenu/LeftMenu';
import HeaderIcon from './HeaderIcon';
import LoginButton from './LoginButton';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

// Config
import { UserContext } from '../../contexts/userContext';
import { LOGIN_PAGE, ADMIN_PAGE, ABOUT_PAGE, VIEW_ITEMS_PAGE, VIEW_AUTHORS_PAGE, VIEW_ADMINS_PAGE, CHANGE_PASSWORD_PAGE } from '../../config/routes';

// Styles
import { makeStyles, Tooltip } from '@material-ui/core';
import { mainGreen } from '../../styles/colors';
import { ItemsListContext } from '../../contexts/itemsListContext';

const useStyles = makeStyles(theme => ({
        header: {
            backgroundColor: mainGreen,
            width: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            height: '90px',
            alignItems: 'center'
        },
        menuIconsWrapper: {
            paddingLeft: '16px',
            display: 'flex',
            width: '100%',
            alignItems: 'left',
            justifyContent: 'flex-start',
            textAlign: 'center',
        },
        mainIconsWrapper: {
            display: 'flex',
            width: '100%',
            alignItems: 'right',
            justifyContent: 'flex-end',
            textAlign: 'center',
        },
        userInfo: {
            position: 'relative',
            top: '10px',
            bottom: '20px',
            width: '100%',
            textAlign: 'left',
        }
    }
  ));
  
const Header = () => {

    const history = useHistory();

    const classes = useStyles();
    const [session, setSession] = React.useContext(UserContext);
    const [, setRows] = React.useContext(ItemsListContext);

    const logOut = () => {
        deleteSessionCookie();
        setSession({user: null});
        setRows([]);
    }

    const onAboutThisApp = () => {
        history.push(ABOUT_PAGE);
    }
    const onAdminView = () => {
        history.push(ADMIN_PAGE);
    }
    
    const onItemsListView = () => {
        history.push(VIEW_ITEMS_PAGE);
    }
    
    const onAuthorsListView = () => {
        history.push(VIEW_AUTHORS_PAGE);
    }

    const onAdminsListView = () => {
        history.push(VIEW_ADMINS_PAGE);
    }

    const onChangePasswordView = () => {
        history.push(CHANGE_PASSWORD_PAGE);
    }
    const menuList = [
        {
            key: 'Items',
            icon: <ListIcon />,
            onClick: onItemsListView,
            position: 'top'
        },{
            key: 'New Item',
            icon: <AddIcon />,
            onClick: onAdminView,
            position: 'top'
        },{
            key: 'Authors',
            icon: <PersonIcon />,
            onClick: onAuthorsListView,
            position: 'top'
        },{
            key: 'Administrators',
            icon: <SupervisorAccountIcon />,
            onClick: onAdminsListView,
            position: 'top'
        },{
            key: 'About this app',
            icon: <InsertEmoticonIcon />,
            onClick: onAboutThisApp,
            position: 'middle'
        },{
            key: 'Logout',
            icon: <InboxIcon />,
            onClick: logOut,
            position: 'bottom'
        },{
            key: session.user && <div className={classes.userInfo}>
                    <div>{session.user.firstName}&nbsp;{session.user.lastName}</div>
                    <div>{session.user.email}</div>
                </div>,
            position: 'user-info'
        }
    ];

    return (
        <div className={classes.header}>
                {
                   session && session.user ? ( 
                    <Fragment> 
                        <div className={classes.menuIconsWrapper}>
                            <LeftMenu menuList={menuList} />
                        </div>
                        <div className={classes.mainIconsWrapper}>
                            <HeaderIcon label="Items" onClick={onItemsListView}>
                                <Tooltip title={session.user.roles.some(role => role === "SUPER_ADMIN") ? "View all items" : "View your items"} aria-label="view" >
                                    <ListIcon aria-label="view"/>
                                </Tooltip>
                            </HeaderIcon>
                            <HeaderIcon label="New" onClick={onAdminView}>
                                <Tooltip title="Add item" aria-label="add" >
                                    <AddRoundedIcon aria-label="add"/>
                                </Tooltip>
                            </HeaderIcon>
                            <HeaderIcon label="New"  onClick={onChangePasswordView}>
                                <Tooltip title="Change your password" aria-label="password" >
                                    <LockRoundedIcon  aria-label="password"/>
                                </Tooltip>
                            </HeaderIcon>
                        </div>
                    </Fragment>
                    ) : (
                        <Fragment>
                            <LoginButton onClick={() => history.push(LOGIN_PAGE)} />
                        </Fragment>
                    )  
                }
            </div>
    );
}

export default Header;