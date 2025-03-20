import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserState from '@/types/pages/auth/UserState.type.ts';

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    nickname: '',
    imageUrl: undefined,
    imageCropArea: undefined,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        resetUser: (state) => {
            state.id = '';
            state.email = '';
            state.name = '';
            state.nickname = '';
            state.imageUrl = undefined;
            state.imageCropArea = undefined;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
