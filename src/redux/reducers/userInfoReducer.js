import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        isToken: null,
        userData: {},
    },
    reducers: {
        placeToken: (state, action) => {
            state.isToken = action.payload;
        },
        placeUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { placeToken, placeUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
