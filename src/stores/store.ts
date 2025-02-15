import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSlice from '@stores/slices/userSlice.ts';

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

// Type - 훅에서 사용하기 위한 Type 지정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
