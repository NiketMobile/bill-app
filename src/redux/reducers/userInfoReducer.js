import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        isToken: null,
        userData: {},
        serverAuthCode: null
    },
    reducers: {
        placeToken: (state, action) => {
            state.isToken = action.payload;
        },
        placeUserData: (state, action) => {
            state.userData = action.payload;
        },
        placeAuthCode: (state, action) => {
            state.serverAuthCode = action.payload;
        },
    },
});

export const { placeToken, placeUserData, placeAuthCode } = userInfoSlice.actions;

export default userInfoSlice.reducer;
