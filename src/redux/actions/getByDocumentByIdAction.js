import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from '../../services/apiService';


export const getByDocumentByIdAction = createAsyncThunk(
    "getByDocumentByIdAction",
    async ({ collectionName, docId }, { rejectWithValue }) => {
        try {
            if (!collectionName || !docId) throw new Error("Collection name is required");
            const response = await apiServices.getDataByDocumentById(collectionName, docId);

            return response;
        } catch (error) {
            console.error("getAllStatesAction error:", error);
            return rejectWithValue(error.message);
        }
    }
);
