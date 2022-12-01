import React, { Fragment } from 'react';
import { Pagination, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface UsersPaginationProps {
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
    total: number;
    pageSize: number;
}

const UsersPagination: React.FC<UsersPaginationProps> = ({onPageChange, onPageSizeChange, total, pageSize}) => {

    const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    }

    const pageSizeHandler = (event: SelectChangeEvent<number>) => {
        onPageChange(1);
        onPageSizeChange(event.target.value as number);
    }
  
    return (
        <Fragment>
            <Pagination 
                count={total/pageSize}
                onChange={paginationHandler}
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