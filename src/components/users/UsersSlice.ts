import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers, fetchUsersParams, deleteUser } from './usersAPI';

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

export enum UserStatus {
  LOADING = "loading",
  IDLE = "idle",
  ERROR = "error",
}

export interface UsersState {
  data: UserI[];
  status: UserStatus;
}

const initialState: UsersState = {
  data: [],
  status: UserStatus.IDLE
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (params: fetchUsersParams) => {
    const response = await fetchUsers(params);
    return response;
  }
);

export const deleteUserAsync= createAsyncThunk(
  'users/deleteUser', 
  async(userId: number) => {
    await deleteUser(userId);
    return userId;  
  });

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = UserStatus.LOADING
      })
      .addCase(getUsersAsync.fulfilled, (state, action: PayloadAction<UserI[]>) => {
        state.status = UserStatus.IDLE;
        state.data = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = UserStatus.ERROR;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.data =  state.data.filter(data => data.id !== action.payload)
      })
      .addCase(deleteUserAsync.rejected, (state) => {
       
      });
  },
});

export const selectUsers = (state: RootState) => state.users.data;
export const selectUsersStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
