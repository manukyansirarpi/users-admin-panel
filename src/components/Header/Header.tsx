import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

import classes from './Header.module.css';

const Header: React.FC = () => {
  return (
      <AppBar position='fixed' sx={{backgroundColor: '#fff', boxShadow: 'none', height: '70px'}}>
        <Toolbar sx={{borderBottom: '1px solid #E9E9E9', height: '70px', justifyContent: 'flex-end'}}>
              <IconButton>
                <SearchIcon />
                <NotificationsIcon />
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
        </Toolbar>
      </AppBar>
  );
}


export default Header;
