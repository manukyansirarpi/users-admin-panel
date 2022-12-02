import React, { Fragment } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Pagination, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import PaginationItem from '@mui/material/PaginationItem';

interface UsersPaginationProps {
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
    total: number;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({onPageChange, onPageSizeChange, total}) => {

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    const pageSize = parseInt(query.get('limit') || '10', 10);

    const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    }

    const pageSizeHandler = (event: SelectChangeEvent<number>) => {
        onPageChange(1);
        onPageSizeChange(event.target.value as number);
        setSearchParams({limit: `${event.target.value}`, page: `${page}`});
    }

    return (
        <Fragment>
            <Pagination 
                page={page}
                count={Math.ceil(total/pageSize)}
                onChange={paginationHandler}
                renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/${item.page === 1 ? '' : `?page=${item.page}&limit=${pageSize}`}`}
                      {...item}
                    />
                  )}
                variant="outlined" 
                shape="rounded" />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageSize}
                    onChange={pageSizeHandler}
                >
                    <MenuItem value={10}>10 / page</MenuItem>
                    <MenuItem value={20}>20 / page</MenuItem>
                    <MenuItem value={50}>50 / page</MenuItem>
                    <MenuItem value={100}>100 / page</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    );
  }

  export default UsersPagination;





