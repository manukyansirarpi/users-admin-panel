import React, { useEffect, useCallback, useState, useMemo }  from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid, GridColDef, GridSortModel, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import { LinearProgress, Avatar, Divider, Typography, Switch, Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectUsers, selectUsersStatus, UserStatus, getUsersAsync, deleteUserAsync, toggleAvailabilityAsync } from '../api/UsersSlice';
import { fetchUsersParams } from '../api/usersAPI';
import { UserI } from '../api/UsersI';

import UsersPagination from './Pagination';
import classes from './UsersList.module.css';
import { Stack } from '@mui/system';

const gridStyles = {
  "& .MuiDataGrid-columnHeaders": {
    background: '#F1F3F5'
  }
}

const UsersList: React.FC = () => {

    const users = useAppSelector(selectUsers);
    const usersStatus = useAppSelector(selectUsersStatus);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageNum = parseInt(query.get('page') || '1', 10);
    const limit = parseInt(query.get('limit') || '10', 10);

    const [sortModel, setSortModel] = useState<GridSortModel | undefined>(undefined);
    const [page, setPage] = useState<number>(pageNum);
    const [pageSize, setPageSize] = useState<number>(limit);

    const total = 120; // ideally api would have this value returned
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addUserRoute = (url: string) => {
      navigate(url, {state: {urlParams : location.search} });
    }

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
    }, [dispatch, sortModel, page, pageSize, pageNum]);

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
            let link = `/add/${params.row.id}`;
            return  <a href="" onClick={(e) => { 
              e.preventDefault();
              addUserRoute(link);
            }}>{params.row.name}</a>
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
      [deleteUser, toggleAvailability, addUserRoute]
    );

    return (
        <div className={classes.users} >
          <Stack direction="row" className={classes.bar}>
            <Typography className={classes.title}> All users</Typography>
            <Divider className={classes.divider}/>
            <Button className={classes.button}  onClick={() => {addUserRoute('/add')}}>Add user</Button> 
          </Stack>
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
