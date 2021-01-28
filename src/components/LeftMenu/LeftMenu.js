import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  icon: {
    color: 'white',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const LeftMenu = ({menuList}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, menuList) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.list}>
        { menuList.filter(item => item.position === 'top').map(item => 
          <ListItem button key={item.key}  onClick={item.onClick}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.key} />
        </ListItem>
        )}
      </List>
      <Divider />
     
      <List>
      { menuList.filter(item => item.position === 'middle').map(item => 
          <ListItem button key={item.key}  onClick={item.onClick}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.key} />
        </ListItem>
        )}
      </List> 
      <Divider />
      <List>
      { menuList.filter(item => item.position === 'bottom').map(item => 
          <ListItem button key={item.key}  onClick={item.onClick}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.key} />
        </ListItem>
        )}
      </List> 
      <List>
        <ListItem >
        { menuList.filter(item => item.position === 'user-info').map(item => 
            <div key="info">{item.key}</div>
          )
        }
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton className={classes.icon} onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
          { menuList && list(anchor, menuList)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default LeftMenu;
