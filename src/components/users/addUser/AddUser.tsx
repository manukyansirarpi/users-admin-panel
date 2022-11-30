import React, { useReducer } from 'react';
import { Link } from "react-router-dom";

import { useAppDispatch } from '../../../app/hooks';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import PhotoIcon from '@mui/icons-material/Photo';

import classes from './AddUser.module.css';
import { addUserAsync } from '../api/UsersSlice';
import { DummyUserI } from '../api/UsersI';

const AddUser: React.FC = () => {

    const dispatch = useAppDispatch();

    const [formInput, setFormInput] = useReducer(
     (state: DummyUserI, newState: {}) => ({...state, ...newState}) ,
     { name: "", email: "", photo: "", location: "" }
    );

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(addUserAsync(formInput));
    };
  
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const newValue = e.target.value;
      setFormInput({ [name]: newValue });
    };

    return (
      <Box component="form" noValidate  autoComplete="off" className={classes.addUserWrapper}>
            <OutlinedInput name="name" size="small" placeholder="User Name" className={classes.input} onChange={handleInput}/>
            <div className={classes.input}>
              <Button  variant="outlined" component="label">  <PhotoIcon /> Photo
                <input  type="file"  hidden  />
                </Button>
            </div>
            <OutlinedInput name="email"  size="small" placeholder="Email" className={classes.input} onChange={handleInput}/>
            <OutlinedInput name="location"  size="small" placeholder="Location" className={classes.input} onChange={handleInput}/>
            <div className={classes.actionsContainer}>
              <Button className={classes.button} variant="contained" onClick={handleSubmit}>Save</Button>
              <Button className={classes.button} variant="contained"> <Link to="/">Cancel</Link></Button>
            </div>
    </Box>);
}

export default AddUser;
