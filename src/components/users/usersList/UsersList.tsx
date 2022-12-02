import React, { useEffect, useCallback, useState, useMemo }  from 'react';
import { Link } from "react-router-dom";

import { DataGrid, GridColDef, GridSortModel, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import { LinearProgress, Avatar, Divider, Box , Paper, Switch} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectUsers, selectUsersStatus, UserStatus, getUsersAsync, deleteUserAsync, toggleAvailabilityAsync } from '../api/UsersSlice';
import { fetchUsersParams } from '../api/usersAPI';

import UsersPagination from './Pagination';

import classes from './UsersList.module.css';
import { UserI } from '../api/UsersI';

const gridStyles = {
  "& .MuiDataGrid-columnHeaders": {
    background: '#F1F3F5'
  }
}

const UsersList: React.FC = () => {

    const users = useAppSelector(selectUsers);
    const usersStatus = useAppSelector(selectUsersStatus);

    const [sortModel, setSortModel] = useState<GridSortModel | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const total = 120; // ideally api would have this value returned
    const dispatch = useAppDispatch();

    const deleteUser = useCallback(
      (id: number) => () => dispatch(deleteUserAsync(id)),
      [dispatch],
    );

    const toggleAvailability = useCallback(
      (params: UserI) => () => { 
        return dispatch(toggleAvailabilityAsync({id: params.id, disable: !params.disabled}))},
      [dispatch],
    );

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
      setSortModel(sortModel);
    }, []);

    useEffect(()=>{
      let params: fetchUsersParams = {
        _page: `${page}`,
        _limit: `${pageSize}`,
      };
      if(sortModel) {
        params._sort = sortModel.map(model => model.field).join(',');
        params._order = sortModel.map(model => model.sort).join(',');
      }
      dispatch(getUsersAsync(params));
    }, [dispatch, sortModel, page, pageSize]);

    const onPageChange = (newPage: number) => {
      setPage(newPage);
    }

    const onPageSizeChange = (newPageSize: number) => {
      setPageSize(newPageSize);
    }
  
    const columns: GridColDef[]  = useMemo(
      () => [
        { field: 'photo', headerName: 'Photo',  flex: 1, renderCell: (params:  GridRenderCellParams) => <Avatar src={params.value} />},
        { field: 'name', 
          headerName: 'Name',
          flex: 1,
          renderCell: (params:  GridRenderCellParams) =>  {
            let link = `/add/${params.row.id}` ;
            return <Link to={link}>{params.row.name}</Link>
          }
        },
        { field: 'location', headerName: 'Location', flex: 1},
        { field: 'registeredDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'), headerName: 'Registered Date',  flex: 1},
        { field: 'lastActiveDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'),  headerName: 'Last Active Date',  flex: 1 },
        { field: 'email', headerName: 'Email', renderCell: (params:  GridRenderCellParams) =>  <a href={`mailto:${params.value}`}><MailIcon/></a>, flex: 1 },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          getActions: (params: any) => [
            <GridActionsCellItem icon={<Switch checked={params.row.disabled}/>} label="Toggle Availability" onClick={toggleAvailability(params.row)} />,
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteUser(params.id)} />
          ],
          flex: 1,
        }
      ],
      [deleteUser, toggleAvailability]
    );

    return (
        <div className={classes.users} >
            <Box role="presentation" className={classes.addUser} >
                all users
                <Divider />
                <Link to="/add">Add user</Link>
            </Box>
          <DataGrid
            components={{
              LoadingOverlay: LinearProgress,
              Pagination: UsersPagination,
            }}
            componentsProps={{
              pagination: {onPageChange: onPageChange, onPageSizeChange: onPageSizeChange, total, pageSize }
            }}
            rows={users}
            columns={columns}
            autoHeight 
            checkboxSelection
            onSortModelChange={handleSortModelChange}
            sortingMode="server"
            pagination
            paginationMode="server"
            rowCount={total}
            loading={usersStatus === UserStatus.LOADING}
            sx={gridStyles}
          />
      </div>
    );  
}

export default UsersList;
