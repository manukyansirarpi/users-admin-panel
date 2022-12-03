import React, { useEffect, useState, memo } from 'react';
import { FormControl,Button, LinearProgress } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

import { uploadPhotoAsync } from '../api/UsersSlice';
import classes from './AddUser.module.css';

interface PhotoUploadProps {
    userPhoto: string;
    onPhotoAdded: (photo : string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = memo(({onPhotoAdded, userPhoto}) => {

    const [photo, setPhoto] = useState<File>();
    const [photoLoading, setPphotoLoading] = useState<boolean>(false);
     
    useEffect(()=>{
      if(photo) {
        const formData = new FormData();
        formData.append( "file", photo, photo.name );
        setPphotoLoading(true);
        uploadPhotoAsync(formData).then(data => {
            setPphotoLoading(false);
            onPhotoAdded(data.url);
        });
      }
    }, [photo, onPhotoAdded]);

    const onPhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files[0]){
        setPhoto(e.target.files[0]);
      }
    }

    const onPhotoInputClick = ( e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const element = e.target as HTMLInputElement
      element.value = ''
    }

    return (
        <FormControl>
            {photoLoading && <LinearProgress className={classes.avatar}  />}
            {userPhoto && !photoLoading && <img className={classes.avatar} alt='User Avatar' src ={userPhoto} />}
            <Button variant="outlined" component="label" sx={{ width: '160px'}}>
                <PhotoIcon /> Photo
                <input hidden type="file" 
                    onClick={onPhotoInputClick} 
                    onChange={onPhotoInputChange}
                    accept="image/png, image/gif, image/jpeg"/>
             </Button>
        </FormControl>

    );
});

export default PhotoUpload;
