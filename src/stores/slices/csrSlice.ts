import CsrState from '@/types/pages/csr/CsrState.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CsrState = {
    faqClickItem: '',
};

const csrSlice = createSlice({
    name: 'csr',
    initialState,
    reducers: {
        setCsr: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        resetCsr: (state) => {
            state.faqClickItem = '';
        },
    },
});

export const { setCsr, resetCsr } = csrSlice.actions;
export default csrSlice.reducer;
