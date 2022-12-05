import React, { useEffect, useCallback, useState, useMemo }  from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid, GridColDef, GridSortModel, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import { LinearProgress, Avatar, Divider, Typography, Switch, Button } from '@mui/material';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectUsers, selectUsersStatus, UserStatus, getUsersAsync, deleteUserAsync, toggleAvailabilityAsync } from '../api/UsersSlice';
import { fetchUsersParams } from '../api/usersAPI';
import { UserI } from '../api/UsersI';

import UsersPagination from './Pagination';
import classes from './UsersList.module.css';

const gridStyles = {
  border: 'none',
  color: '#878787',
  height: '14px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '14px',
  "& .MuiDataGrid-columnHeaders": {
    background: '#F1F3F5',
  }
}

const switchStyle = {
  borderRadius: 2,
  "& .MuiSwitch-track ": {
    backgroundColor: '#72B59B',
    opacity: 1
  },
  "& .MuiSwitch-switchBase": {
    padding: "7px"
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#fff",
    opacity: 1
  },
  "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
    opacity: 1,
    backgroundColor: '#F54745',
  },
  "& .MuiSwitch-thumb": {
    width: '10px',
    height: '10px',
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

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
      setSortModel(sortModel);
    }, []);

    const onPageSizeChange = (newPageSize: number) => {
      setPageSize(newPageSize);
    }

    const onPageChange = (newPage: number) => {
      setPage(newPage);
    }

    const addUserRoute = useCallback((url: string) => 
      navigate(url, {state: {urlParams : location.search}}), 
      [location.search, navigate]);

    const deleteUser = useCallback(
      (id: number) => () => dispatch(deleteUserAsync(id)),
      [dispatch],
    );

    const toggleAvailability = useCallback(
      (params: UserI) => () => { 
        return dispatch(toggleAvailabilityAsync({id: params.id, disable: !params.disabled}))},
      [dispatch],
    );

    const editUser =  useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.preventDefault();
      addUserRoute(`/add/${id}`);
    }, [addUserRoute]);

    const renderAvatar = useCallback((params:  GridRenderCellParams) => <Avatar src={params.value} />, []);

    const renderNameCol= useCallback((params:  GridRenderCellParams) => {
      return  <button className={classes.userName} onClick={(e) => editUser(e, params.row.id)}>{params.row.name}</button>
    }, [editUser]);

    const renderEmail = useCallback((params:  GridRenderCellParams) => <a href={`mailto:${params.value}`} className = {classes.emailIcon}><MailIcon/></a>, []);

    const renderActions = useCallback((params: any) => [
      <GridActionsCellItem icon={
        <Switch sx={switchStyle}  size="small" checked={params.row.disabled}/>
      } label="Toggle Availability" onClick={toggleAvailability(params.row)} />,
      <GridActionsCellItem icon={<DeleteIcon sx={{color: '#F54745'}}/>} label="Delete" onClick={deleteUser(params.id)} />
    ], [deleteUser, toggleAvailability]);

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

    const columns: GridColDef[]  = useMemo(
      () => [
        { field: 'photo', headerName: 'Photo', flex: 1, renderCell: renderAvatar },
        { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCol },
        { field: 'location', headerName: 'Location', flex: 1},
        { field: 'registeredDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'), headerName: 'Registered Date',  flex: 1},
        { field: 'lastActiveDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'),  headerName: 'Last Active Date',  flex: 1 },
        { field: 'email', headerName: 'Email', renderCell: renderEmail, flex: 1 },
        { field: 'actions', type: 'actions', headerName: 'Actions',  getActions: renderActions, flex: 1 }
      ],
      [renderActions, renderNameCol, renderAvatar, renderEmail]
    );

    return (
        <div className={classes.users} >
          <Stack direction="row" className={classes.bar}>
            <Typography className={classes.title}> All users</Typography>
            <Divider className={classes.divider}/>
            <Button className={classes.button}  onClick={() => {addUserRoute('/add')}}>Add user</Button> 
          </Stack>
          <DataGrid
            autoHeight 
            checkboxSelection
            pagination
            rowHeight={62}
            rows={users}
            rowCount={total}
            columns={columns}
            showColumnRightBorder={false}
            sortingMode="server"
            paginationMode="server"
            loading={usersStatus === UserStatus.LOADING}
            onSortModelChange={handleSortModelChange}
            sx={gridStyles}
            components={{ LoadingOverlay: LinearProgress,  Pagination: UsersPagination }}
            componentsProps={{
              pagination: {onPageChange: onPageChange, onPageSizeChange: onPageSizeChange, total, pageSize }
            }}
          />
      </div>
    );  
}

export default UsersList;
