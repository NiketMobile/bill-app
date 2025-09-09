import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../components/showMessage";
import { createWatchAction } from "../actions/createWatchAction";


const createWatchSlice = createSlice({
    name: 'createWatchSlice',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Synchronous reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWatchAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWatchAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload
            })
            .addCase(createWatchAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                showToast({ type: 'error', title: action.payload });
            })
    },
});

export default createWatchSlice.reducer;
