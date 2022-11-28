import React from 'react';
import { Link } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import MovingIcon from '@mui/icons-material/Moving';
import classes from './SideBar.module.css';

const SideBar: React.FC = () => {
    return (
        <div className={classes.sideBarWrapper}>
            <ul className = {classes.sideBar} >
                <li className = {classes.sideBarItem}>
                    <MovingIcon className={classes.icon}/>
                    <Link to="/">Homepage</Link>
                </li>
                <li className = {[classes.sideBarItem, classes.selected].join(' ')}>
                    <PeopleIcon className={classes.icon}/>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </div>
    );  
}

export default SideBar;
