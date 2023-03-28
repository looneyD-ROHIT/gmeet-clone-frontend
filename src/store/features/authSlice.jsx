import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    authenticationData: {
        uid: '',
        accessToken: ''
    }
}

const authSlice = createSlice({
    name: 'authdata',
    initialState,
    reducers: {
        changeAuthStatus(state, action) {
            state.isAuthenticated = action.payload
        },
        changeAuthData(state, action) {
            if (action.payload?.uid) {
                state.authenticationData.uid = action.payload.uid
            }
            if (action.payload?.accessToken) {
                state.authenticationData.accessToken = action.payload.accessToken
            }
        }
    }
})


export const authActions = authSlice.actions;

export default authSlice;