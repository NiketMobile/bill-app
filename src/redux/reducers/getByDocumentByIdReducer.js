import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../components/showMessage";
import { getByDocumentByIdAction } from "../actions/getByDocumentByIdAction";


const getByDocumentByIdSlice = createSlice({
    name: "getByDocumentById",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getByDocumentByIdAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByDocumentByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getByDocumentByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
                showToast({
                    type: "error",
                    title: state.error,
                });
            });
    },
});

export default getByDocumentByIdSlice.reducer;
