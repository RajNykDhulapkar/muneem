import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/authSlice";
import { RootState } from "./store";

export type authReducerState = {
    refreshToken: string;
    error: string | null;
    user: User | null;
    loginSuccess: boolean;
    registerSuccess: boolean;
};

const initialState: authReducerState = {
    refreshToken: "",
    error: null,
    user: null,
    loginSuccess: false,
    registerSuccess: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ refreshToken: string }>) => {
            state.loginSuccess = true;
            state.refreshToken = action.payload.refreshToken;
        },
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        setRegisterSuccess: (state, action) => {
            state.registerSuccess = true;
        },
    },
});

// export type authReducerState = ReturnType<typeof authSlice.reducer>;

// Action creators are generated for each case reducer function
export const { setCredentials, setUser, setRegisterSuccess } = authSlice.actions;

// selectors
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginSuccess = (state: RootState) => state.auth.loginSuccess;

export default authSlice.reducer;
