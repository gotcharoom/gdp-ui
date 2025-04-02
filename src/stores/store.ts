import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from '@stores/slices/userSlice.ts';
import authSlice from '@stores/slices/authSlice.ts';
import csrSlice from '@stores/slices/csrSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        csr: csrSlice,
    },
});

// Type - 훅에서 사용하기 위한 Type 지정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
