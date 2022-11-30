import React from 'react';
import SideBar from './components/sideBar/SideBar';
import Users from './components/users/Users';
import classes from './App.module.css';

const App = () => {
  return (
    <div className="App">
      <SideBar></SideBar>
      <div className={classes.contentWrapper}>
        <Users />  
      </div>
    </div>
  );
}


export default App;
