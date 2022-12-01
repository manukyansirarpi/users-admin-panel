import React from 'react';
import { Routes, Route } from "react-router-dom";

import UsersList from './usersList/UsersList';
import AddUser from './addUser/AddUser';

import classes from './Users.module.css';

const Users: React.FC = () => {

    return (
        <main className={classes.contentWrapper}>
            <div className={classes.usersWrapper}>
                <Routes>
                    <Route path="/" element={<UsersList />} />
                    <Route path="/add" element={<AddUser />} />
                </Routes>    
            </div>
        </main>
    );  
}

export default Users;
