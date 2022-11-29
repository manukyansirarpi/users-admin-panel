import React, { useEffect, useCallback, useState }  from 'react';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface UsersPaginationProps {
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
    pageSize: 10 | 50 | 100;
    count: number;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({onPageChange, onPageSizeChange, count, pageSize}) => {
    
    const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    }

    const pageSizeHandler = (event: SelectChangeEvent<10 | 20 | 50 | 100>, value: React.ReactNode) => {
        //  onPageSizeChange(value);
    }
  
    return (
        <>
            <Pagination 
                count={count} 
                onChange={paginationHandler}
                variant="outlined" 
                shape="rounded" />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageSize}
                    onChange={(e, v) => {}}
                >
                    <MenuItem value={10}>10 / page</MenuItem>
                    <MenuItem value={50}>50 / page</MenuItem>
                    <MenuItem value={100}>100 / page</MenuItem>
                </Select>
            </FormControl>
        </>
        
    );
  }

  export default UsersPagination;