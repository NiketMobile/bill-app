import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../components/showMessage";
import { getCollectionAction } from "../actions/getCollectionsAction";

const getCollectionSlice = createSlice({
    name: "getCollection",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCollectionAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCollectionAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCollectionAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
                showToast({
                    type: "error",
                    title: state.error,
                });
            });
    },
});

export default getCollectionSlice.reducer;
