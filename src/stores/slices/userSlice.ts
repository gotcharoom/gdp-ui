import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserState from '@/types/pages/login/UserState.type.ts';

const initialState: UserState = {
    id: '',
    email: '',
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },
        resetUser: (state) => {
            state.id = '';
            state.email = '';
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
