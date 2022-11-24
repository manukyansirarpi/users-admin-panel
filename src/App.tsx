import React from 'react';
import { Routes, Route } from "react-router-dom";
import SideBar from './components/sideBar/SideBar';
import Users from './components/users/Users';
import classes from './App.module.css';

const App = () => {
  return (
    <div className="App">
      <SideBar></SideBar>
      <div className={classes.contentWrapper}>
        <Routes>
            <Route path="/" element={<Users />} />
        </Routes>    
      </div>
    </div>
  );
}

export default App;
