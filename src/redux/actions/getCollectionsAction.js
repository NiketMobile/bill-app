import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from '../../services/apiService';


export const getCollectionAction = createAsyncThunk(
    "getCollectionAction",
    async ({ collectionName }, { rejectWithValue }) => {
        try {
            if (!collectionName) throw new Error("Collection name is required");
            const response = await apiServices.getCollectionDocs(collectionName);

            return response;
        } catch (error) {
            console.error("getAllStatesAction error:", error);
            return rejectWithValue(error.message);
        }
    }
);

// dispatch(getAllStatesAction({ collectionName: "States" }));