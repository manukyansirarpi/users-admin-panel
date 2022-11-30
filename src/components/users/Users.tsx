import React, { useEffect, useCallback, useState, useMemo }  from 'react';
import { DataGrid, GridColDef, GridSortModel, GridRenderCellParams, GridActionsCellItem, GridRowId, GridRowParams } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from "@mui/material/Avatar";
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUsers, selectUsersStatus, UserStatus, getUsersAsync, deleteUserAsync } from './UsersSlice';

import classes from './Users.module.css';
import { fetchUsersParams } from './usersAPI';
import UsersPagination from './Pagination';

const Users: React.FC = () => {

    const users = useAppSelector(selectUsers);
    const usersStatus = useAppSelector(selectUsersStatus);

    const [sortModel, setSortModel] = useState<GridSortModel | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const total = 100; // ideally api would have this value returned
    const dispatch = useAppDispatch();

    const deleteUser = useCallback(
      (id: number) => () => dispatch(deleteUserAsync(id)),
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
        { field: 'name', headerName: 'Name',  flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1},
        { field: 'registeredDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'), headerName: 'Registered Date',  flex: 1},
        { field: 'lastActiveDate',  type: 'dateTime', valueGetter: ({ value }) => value && (new Date(value)).toLocaleDateString('en-US'),  headerName: 'Last Active Date',  flex: 1 },
        { field: 'email', headerName: 'Email', renderCell: (params:  GridRenderCellParams) =>  <a href={`mailto:${params.value}`}><MailIcon/></a>, flex: 1 },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          getActions: (params: any) => [
            <GridActionsCellItem  icon={<DeleteIcon />} label="Delete" onClick={deleteUser(params.id)} />
          ]
        }
      ],
      [deleteUser]
    );

    return (
        <div className={classes.usersWrapper}>
           <div className={classes.users}>
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
            />
          </div>
        </div>
    );  
}

export default Users;
