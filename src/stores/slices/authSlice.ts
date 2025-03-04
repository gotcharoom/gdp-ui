import { createSlice } from '@reduxjs/toolkit';
import AuthState from '@/types/pages/login/AuthState.type.ts';

const initialState: AuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        removeAuth: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
