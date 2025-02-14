import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState from "@types/routes/slices/userSlice.type.ts";



const initialState: UserState = {
    name: "Guest",
    age: 0,
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.email = action.payload.email;
        },
        resetUser: (state) => {
            state.name = "Guest";
            state.age = 0;
            state.email = "";
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;