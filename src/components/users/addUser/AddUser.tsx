import React, { useReducer,useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { FormControl, FormGroup, Paper, Button, Container, Stack, LinearProgress } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

import { useAppDispatch } from '../../../app/hooks';
import { addUserAsync, updateUserAsync , getUserData, uploadPhotoAsync} from '../api/UsersSlice';
import { UserI } from '../api/UsersI';

import Input from '../../../ui/Input';
import classes from './AddUser.module.css';

type Validatable = {
    value: string;
    error: boolean;
    errorMessage: string;
}

interface UserFormDataI extends Omit<UserI, 'name' | 'email'> {
  name: Validatable, 
  email:Validatable,
}

const userInitialState: UserFormDataI = {
  id: 0,
  name: {
   value:'',
   error:false,
   errorMessage:'Invalid name'
 }, 
  email: {
   value:'',
   error:false,
   errorMessage:'Invalid email'
 },
  photo: "",
  location: "",
  registeredDate: "",
  lastActiveDate: "",
  disabled: false
};

const AddUser: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    let userId = params.userId;

    const [photo, setPhoto] = useState<File>();
    const [photoLoading, setPphotoLoading] = useState<boolean>(false);
    const [userData, setUserData] = useReducer((state: UserFormDataI, newState: {}) => ({...state, ...newState}), userInitialState );
    
    useEffect(()=>{
      if(userId) {
        getUserData(parseInt(userId)).then((user) => {
          setUserData({...user, name: {value: user.name }, email: {value: user.email}});
        });
      }
    }, [userId]);

    useEffect(()=>{
      if(photo) {
        const formData = new FormData();
        formData.append( "file", photo, photo.name );
        setPphotoLoading(true);
        uploadPhotoAsync(formData).then( data=> {
          setUserData({'photo': data.url});
          setPphotoLoading(false);
        });
      }
    }, [photo, dispatch]);

    const onPhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files[0]){
        setPhoto(e.target.files[0]);
      }
    }

    const onPhotoInputClick = ( e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const element = e.target as HTMLInputElement
      element.value = ''
    }

    const cancelHandler = () => {
      navigate(location.state?.urlParams? `/${location.state?.urlParams}` : '/');
    }

    const isFormValid = () => {
      let valid = true;
      if (!userData.name.value) {
        setUserData({'name': {...userData.name, ...{error: true}} });
        valid = false;
      }  
      if (!userData.email.value) {
        setUserData({ 'email': {...userData.email, ...{error: true}} });
        valid = false;
      }
      return valid;
    }
  
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const newValue = e.target.value;
      if(name === 'name' || name === 'email') {
        setUserData({[name]: {...userData.name, value: newValue, error: !newValue.trim().length} });
      } else {
        setUserData({ [name]: newValue });
      }
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isFormValid()) {
        const newData =  {...userData,  name: userData.name.value, email: userData.email.value};
        if(userId) {
          dispatch(updateUserAsync(newData));
        } else {
          dispatch(addUserAsync(newData));
        }
        cancelHandler();
      }
    };

    return (
      <Paper className ={classes.addUserWrapper}>
        <Container maxWidth="sm">
          <form>
            <FormGroup>
              <Input name="name" value={userData.name.value} error={userData.name.error} helperText={userData.name.error && userData.name.errorMessage} placeholder="User Name" onChange={handleInput}></Input>
              <FormControl>
                  {photoLoading && <LinearProgress className={classes.avatar}  />}
                  {userData && userData.photo && !photoLoading && <img className={classes.avatar} alt='User Avatar' src ={userData.photo} />}
                  <Button variant="outlined" component="label" sx={{ width: '160px'}}> <PhotoIcon /> Photo
                  <input hidden type="file" onClick={onPhotoInputClick} onChange={onPhotoInputChange} accept="image/png, image/gif, image/jpeg"/>
                </Button>
              </FormControl>
              <Input name="email" value={userData.email.value} error={userData.email.error}  helperText={userData.email.error && userData.email.errorMessage} placeholder="Email" onChange={handleInput}></Input>
              <Input name="location" value={userData.location}  placeholder="Location" onChange={handleInput}></Input>
            </FormGroup>
            <Stack direction="row" justifyContent="flex-start">
              <Button variant="contained" onClick={handleSubmit}>Save</Button>
              <Button variant="contained"  onClick={cancelHandler}>Cancel</Button>
            </Stack>
          </form>
        </Container>
      </Paper>
    );
}

export default AddUser;
