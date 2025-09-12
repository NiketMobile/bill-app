import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./usersThunks";
import { getAllStatesAction } from "../actions/getStatesAction";
import showToast from "../../components/showMessage";

const statesSlice = createSlice({
    name: "states",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStatesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStatesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllStatesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
                showToast({
                    type: "error",
                    title: state.error,
                });
            });
    },
});

export default statesSlice.reducer;
