import React, { useReducer } from 'react';
import { Link } from "react-router-dom";

import { FormControl, FormGroup, Paper, OutlinedInput, Button, Container } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

import { useAppDispatch } from '../../../app/hooks';
import { addUserAsync } from '../api/UsersSlice';
import { UserI } from '../api/UsersI';

import classes from './AddUser.module.css';

const AddUser: React.FC = () => {

    const dispatch = useAppDispatch();

    const [userData, setUserData] = useReducer(
     (state: UserI, newState: {}) => ({...state, ...newState}) ,
     {  id: 0,
      name: "", 
      email: "",
      photo: "",
      location: "",
      registeredDate: "",
      lastActiveDate: "",
      disabled: false
    }
    );

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(addUserAsync(userData));
    };
  
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const newValue = e.target.value;
      setUserData({ [name]: newValue });
    };

    return (
      <Paper className={classes.addUserWrapper}>
        <Container maxWidth="sm">
          <form>
            <FormGroup>
              <FormControl>
                <OutlinedInput name="name" size="small" placeholder="User Name" className={classes.input} onChange={handleInput}/>
              </FormControl>
              <FormControl>
                <Button  variant="outlined" component="label">  <PhotoIcon /> Photo
                  <input  type="file"  hidden  />
                </Button>
              </FormControl>
              <FormControl>
                <OutlinedInput name="email"  size="small" placeholder="Email" className={classes.input} onChange={handleInput}/>
              </FormControl>
              <FormControl>
                <OutlinedInput name="location"  size="small" placeholder="Location" className={classes.input} onChange={handleInput}/>
              </FormControl>
            </FormGroup>
            <FormGroup row>
              <Button className={classes.button} variant="contained" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button} variant="contained"> <Link to="/">Cancel</Link></Button>
            </FormGroup>
          </form>
        </Container>
      </Paper>
    );
}

export default AddUser;
