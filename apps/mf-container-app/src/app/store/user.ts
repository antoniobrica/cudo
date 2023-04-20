import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import Cookies from 'js-cookie';
import { CookieNames } from '../../constants';

interface IUser {
  id: number;
  userId: string;
  userName: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
}

interface UserState {
  loggedIn: boolean;
  information?: IUser;
  isSigningIn: boolean;
  isLoggingOut: boolean;
}

// Defined the initial state
const initialState: UserState = {
  loggedIn: !!Cookies.get(CookieNames.TOKEN),
  isSigningIn: false,
  isLoggingOut: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInformation: (state, action: PayloadAction<IUser>) => {
      state.information = action.payload;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.information = undefined;
      state.isLoggingOut = false;
    },
    loginUser: (state, action: PayloadAction<IUser>) => {
      state.information = action.payload;
      state.loggedIn = true;
    },
  },
});

export const { loginUser, logoutUser, updateUserInformation } = userSlice.actions;

// user selector
export const userInfo = (state: RootState) => state.user.information;

export default userSlice.reducer;
