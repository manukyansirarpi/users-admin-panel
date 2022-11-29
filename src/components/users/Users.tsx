import React, { useEffect, useCallback, useState }  from 'react';
import { DataGrid, GridColDef, GridSortModel, GridRenderCellParams } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from "@mui/material/Avatar";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUsers, selectUsersStatus, getUsersAsync, UserStatus } from './UsersSlice';

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

    const columns: GridColDef[] = [
        { field: 'photo', headerName: 'Photo',  flex: 1, renderCell: (params:  GridRenderCellParams) => <Avatar src={params.value} />},
        { field: 'name', headerName: 'Name',  flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1},
        { field: 'registeredDate',  type: 'dateTime',  headerName: 'Registered Date',  flex: 1},
        { field: 'lastActiveDate',  type: 'dateTime', headerName: 'Last Active Date',  flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 }
      ];
  
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
