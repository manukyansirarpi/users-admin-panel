import React from 'react';
import { TextField, TextFieldProps, FormControl} from '@mui/material';

const Input: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <FormControl>
       <TextField {...props}  size="small" sx={{width: '400px', margin: '16px 0'}}/>
    </FormControl>
  );
}

export default Input;
