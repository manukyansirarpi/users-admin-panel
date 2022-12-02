import React, { useReducer,useEffect, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { FormControl, FormGroup, Paper, OutlinedInput, Button, Container, Stack } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

import { useAppDispatch } from '../../../app/hooks';
import { addUserAsync, updateUserAsync , getUserData} from '../api/UsersSlice';
import { UserI } from '../api/UsersI';

import Input from '../../../ui/Input';

const AddUser: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    let userId = params.userId;
    
    useEffect(()=>{
      if(userId) {
        getUserData(parseInt(userId)).then((user) => {
          setUserData(user);
        });
      }
    }, [userId]);

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
      if(userId) {
        dispatch(updateUserAsync(userData));
      } else {
        dispatch(addUserAsync(userData));
      }
      navigate('/');
    };
  
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const newValue = e.target.value;
      setUserData({ [name]: newValue });
    };

    return (
      <Paper sx={{ width: '1100px', height: '600px', margin: '20px 40px'}}>
        <Container maxWidth="sm">
          <form>
            <FormGroup>
              <Input name="name" value={userData.name}  placeholder="User Name" onChange={handleInput}></Input>
              <FormControl>
                  <Button variant="outlined" component="label" sx={{ width: '160px'}}> <PhotoIcon /> Photo
                  <input  type="file"  hidden  />
                </Button>
              </FormControl>
              <Input name="email" value={userData.email}  placeholder="Email" onChange={handleInput}></Input>
              <Input name="location" value={userData.location}  placeholder="Location" onChange={handleInput}></Input>
            </FormGroup>
            <Stack direction="row" justifyContent="flex-start">
              <Button variant="contained" onClick={handleSubmit}>Save</Button>
              <Button variant="contained"  sx={{marginLeft: '20px',  "& a": {  color: '#fff', textDecoration: 'none'  }}}><Link to="/">Cancel</Link></Button>
            </Stack>
          </form>
        </Container>
      </Paper>
    );
}

export default AddUser;
