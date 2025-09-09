import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '@env';
import showToast from '../../components/showMessage';

export const getWatchAction = createAsyncThunk(
    'gets/getWatchAction',
    async ({ form_id, idToken, accesstoken }, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${BASE_API_URL}/form/${form_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accesstoken,
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            const data = response?.data;
            return response?.data

            if (data?.status) {
                return data;
            } else {
                const message = data?.message || 'Failed to get watch data';
                showToast({ type: 'error', title: message });
                return rejectWithValue(message);
            }
        } catch (error) {
            console.log("getWatchAction error:", error);
            showToast({ type: 'error', title: error.message || 'Something went wrong' });
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);
