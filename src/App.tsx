import React, { Fragment } from 'react';
import NavDrawer from './components/NavDrawer/NavDrawer';
import Users from './components/Users/Users';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <NavDrawer />
      <Users />  
    </Fragment>
  );
}

export default App;
