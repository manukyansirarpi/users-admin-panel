import React from 'react';
import { Link } from "react-router-dom";
import { Drawer, List, ListItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MovingIcon from '@mui/icons-material/Moving';
import { Toolbar } from '@mui/material';

import classes from './NavDrawer.module.css';

const drawerWidth = '240px';

const drawerStyles = {
    drawer: {
        width: drawerWidth,
        "& .MuiBackdrop-root": {
            display: "none"
        },

    },
    drawerPaper: {
        width: drawerWidth,
        background: '#272D3E'
    }
}

const NavDrawer: React.FC = () => {
    return (
        <Drawer variant='temporary' disableEnforceFocus open={true} sx={drawerStyles.drawer} PaperProps={{sx: drawerStyles.drawerPaper}}>
            <Toolbar />
            <List>
                <ListItem className={classes.listItem}>
                    <MovingIcon className={classes.icon}/>
                    <Link to="/">Homepage</Link>
                </ListItem>
                <ListItem className = {[classes.listItem, classes.selected].join(' ')}>
                    <PeopleIcon className={classes.icon}/>
                    <Link to="/">Users</Link>
                </ListItem>
            </List>
        </Drawer>
    );  
}

export default NavDrawer;
