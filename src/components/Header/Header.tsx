import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position='fixed' sx={{backgroundColor: '#fff', boxShadow: 'none', height: '80px'}}>
      <Toolbar sx={{borderBottom: '1px solid #E9E9E9', height: '70px', justifyContent: 'flex-end'}}>
        <IconButton >
          <Avatar sx={{width: '40px',  height: '40px'}} alt="Remy Sharp" src="" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
