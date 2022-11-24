import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers } from './usersAPI';

export interface UserI {
   id: number;
   name: string;
   email: string;
   photo: string;
   location: string;
   registeredDate: string;
   lastActiveDate: string;
   disabled: boolean;
}

export interface UsersState {
  data: UserI[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  data: [],
  status: 'idle'
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.data;

export default usersSlice.reducer;
