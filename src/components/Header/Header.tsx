import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import classes from './Header.module.css';

const Header = () => {
  return (
      <AppBar position='fixed' >
        <Toolbar />
      </AppBar>
  );
}


export default Header;
