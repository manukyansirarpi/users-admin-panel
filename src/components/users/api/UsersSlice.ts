import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { UserI, DummyUserI } from './UsersI';
import { fetchUsers, fetchUsersParams, deleteUser, addUser } from './usersAPI';

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

  export const addUserAsync = createAsyncThunk(
    'users/addUser',
    async (params: DummyUserI) => {
      const response = await addUser(params);
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
        state.status = UserStatus.LOADING
      })
      .addCase(getUsersAsync.fulfilled, (state, action: PayloadAction<UserI[]>) => {
        state.status = UserStatus.IDLE;
        state.data = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = UserStatus.ERROR;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.data =  state.data.filter(data => data.id !== action.payload)
      })
      .addCase(addUserAsync.pending, (state) => {
      })
      .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<UserI>) => {
        debugger;
        state.data.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state) => {

      });
  },
});

export const selectUsers = (state: RootState) => state.users.data;
export const selectUsersStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
