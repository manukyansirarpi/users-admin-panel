import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UsersSlice from '../components/Users/api/UsersSlice';

export const store = configureStore({
  reducer: {
    users: UsersSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
