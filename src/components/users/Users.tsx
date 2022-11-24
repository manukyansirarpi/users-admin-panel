import React, { useEffect }  from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUsers, getUsersAsync } from './UsersSlice';

import classes from './Users.module.css';

const Users: React.FC = () => {

    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    const columns: GridColDef[] = [
        { field: 'photp', headerName: 'Photo', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'location', headerName: 'Location', width: 130 },
        { field: 'registeredDate',  headerName: 'Registered Date',  width: 130 },
        { field: 'lastActiveDate', headerName: 'Last Active Date',  width: 130 },
        { field: 'email',  headerName: 'Email',  width: 130 }
      ];
  
    useEffect(()=>{
      dispatch(getUsersAsync());
    }, [dispatch]);

    return (
        <div className={classes.usersWrapper}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            paginationMode={'server'}
          />
        </div>
    );  
}

export default Users;
